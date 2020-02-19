var express = require('express');
var router = express.Router();
var AdminModel = require ('../models/admin')
var ActionModel = require('../models/cultural_actions')
var ShowModel = require('../models/shows')
var multer  = require('multer')
var cloudinary = require('cloudinary')
var cloudinaryStorage = require('multer-storage-cloudinary');
const upload = multer({dest: './public/images/uploads/'})

// var upload = multer({ dest: './public/images/uploads/' })
cloudinary.config({
  cloud_name:'dduugb9jy',
  api_key: '163237792357483',
  api_secret:'-kKI2ELa5qrQWcoqKv5A1kn5asw'
});

var parser = multer({ 
  storage: cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'hocmomento',
    filename: function (req, file, cb) {
      cb(undefined, file.originalname);
    }
  })
});






/* CREATION AND CONNECTION ADMIN */
router.post('/create-admin', function(req, res, next){
	newAdmin = new AdminModel({
		email: req.body.email,
		password: req.body.password
  })
  
	newAdmin.save(function(error, admin){
							if (error){
									console.log("ADMIN NOT SAVED:", error)
									res.json({error})
							} else if (admin){
									console.log("ADMIN SAVED", admin)
									res.json({admin})
							}
						})
})

router.get('/login', function(req, res, next){
	res.render('login')
})

router.post('/login', async function(req, res, next){
				console.log(req.body)

				admin = AdminModel.find({email: req.body.email, password: req.body.password})

				if (admin){
		console.log("OK")
		res.redirect('/users/dashboard')
	} else {
		console.log("NOT OK")
		res.redirect('/users/login')
	}

})






/* ACTIONS PART: DISPLAY, CREATION, DELETING AND UPDATING */

router.get('/actions', async function(req, res, next) {
	allActions = await ActionModel.find(function(err, actions){
		console.log("")
	})
	res.render('./dashboard/actions', {allActions});
});

router.post('/create-action', parser.array('images'), function(req, res, next){
  console.log("======================", req.files.length)
  let backGallery = []
  for (i=0; i< req.files.length; i++){
      backGallery.push(req.files[i].secure_url)
  }
console.log("BACK GALLERY =============>", backGallery)

	newAction = new ActionModel({
		photo: req.files[0].secure_url, 
		place: req.body.place.toUpperCase(), 
		title: req.body.title, 
		period: req.body.period.toUpperCase(), 
		partners: req.body.partners, 
		gallery: backGallery,
		description: req.body.description,
		city: req.body.city
	})

	newAction.save(function(error, action){
		if (error){
				console.log("ACTION NOT SAVED:", error)
				res.render('./dashboard/actions', {problem: error})
		} else if (action){
				console.log("ACTION SAVED", action)
			res.redirect('/dashboard/actions')
		}
	})
});

router.post('/delete-action', async function(req, res, next){
	action = await ActionModel.deleteOne({_id: req.body.id})
	console.log(`${action.title} DELETED ============`)

	res.redirect('/dashboard/actions')
});

router.get('/update-action', async function(req, res, next){
	action = await ActionModel.findById(req.query.id)
	console.log("L'ACTION =============>", action)

	res.render('./dashboard/actions-update', {action})
})

router.post('/update-action', parser.array('images'), async function(req, res, next){
	try {
	if (req.body.description === " ") {
		console.log("hello =====>")
		update = await ActionModel.updateOne(
			{_id: req.body.id},
			{place: req.body.place,
			title: req.body.title,
			period: req.body.period}
		);
	} else {
		update = await ActionModel.updateOne(
			{_id: req.body.id},
			{place: req.body.place,
			title: req.body.title,
			period: req.body.period,
			description: req.body.description}
		) ; 
	}
	res.redirect('/dashboard/actions');
}catch(error){
	console.log(error);
};

});

router.get('/update-action-gallery', async function(req, res){
  action = await ActionModel.findById(req.query.id)
  gallery = action.gallery

  res.render('./dashboard/update-action-gallery', {action, gallery})
})

router.get('/delete-photo-action', async function(req, res){
    actionGallery = []
    action = await ActionModel.findById(req.query.action)
    actionGallery = action.gallery
    actionGallery.splice(req.query.index, 1)
    update = await ActionModel.updateOne(
      {_id: req.query.action},
      {gallery: actionGallery})

    action = await ActionModel.findById(req.query.action)
    gallery = action.gallery
  
    res.render('./dashboard/update-action-gallery', {action, gallery})
})

router.post('/add-photo-action',  parser.array('images'), async function(req, res){
    let actionGallery = []
  console.log(req.files, req.files.length)

    action = await ActionModel.findById(req.body.action)
    actionGallery = action.gallery
    
  for (i=0; i< req.files.length; i++){
    console.log(req.files[i].secure_url)
    actionGallery.push(req.files[i].secure_url)
  }
  console.log(actionGallery)

      update = await ActionModel.updateOne(
        {_id: req.body.action},
        {gallery: actionGallery}
      )
      action = await ActionModel.findById(req.body.action)
      gallery = action.gallery
    console.log(action)
  
    res.render('./dashboard/update-action-gallery', {action, gallery})

})




/* SHOWS PART: DISPLAY, CREATION, DELETING AND UPDATING */

router.get('/shows', async function(req, res, next){
	allShows = await ShowModel.find(function(err, shows){
		console.log("VOILA========+++>")
	})
	res.render('./dashboard/shows', {allShows})
});

router.post('/create-show', parser.array('images'), function(req, res, next){
  console.log("REQ.BODY", req.files)
  let backGallery = []
  for (i=0; i< req.files.length; i++){
      backGallery.push(req.files[i].secure_url)
  }
  console.log(backGallery)

	newShow = new ShowModel({
		photo: req.files[0].secure_url,
		place: req.body.place.toUpperCase(),
		city: req.body.city,
		title: req.body.title,
		period: req.body.period,
		partners: req.body.partners,
		gallery: backGallery,
		description: req.body.description,
	})

	newShow.save(function(error, show){
		if (error){
			console.log("SHOW NOT SAVED:", error)
			res.render('./dashboard/shows')
		} else if (show){
			console.log("SHOW SAVED", show)  
			res.redirect('/dashboard/shows')
		}
	})
});

router.post('/delete-show', async function(req, res, next){
	show = await ShowModel.deleteOne({_id: req.body.id})
	console.log(`SHOW DELETED ============`)

	res.redirect('/dashboard/shows')
});

router.get('/update-show', async function(req, res, next){
	show = await ShowModel.findById(req.query.id)
	console.log("LE SHOW =============>", show)

	res.render('./dashboard/show-update', {show})
})

router.post('/update-show', async function(req, res, next){
	console.log(req.body);
	try {
	if (req.body.description === " ") {
		console.log("hello =====>")
		update = await ShowModel.updateOne(
			{_id: req.body.id},
			{place: req.body.place,
			title: req.body.title,
			period: req.body.period}
		);
	} else {
		update = await ShowModel.updateOne(
			{_id: req.body.id},
			{place: req.body.place,
			title: req.body.title,
			period: req.body.period,
			description: req.body.description}
		) ; 
	}
	res.redirect('/dashboard/shows');
}catch(error){
	console.log(error);
};

});





router.post('/create-person', function(req, res, next){
	console.log(req.body)

	newPerson = new PersonModel({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		title: req.body.title,
		desc: req.body.description,
		email: req.body.email,
		telephone: req.body.telephone
	})

	newPerson.save(function(error, person){
		if (error){
				console.log("PERSON NOT SAVED:", error)
				res.json({error})
		} else if (person){
				console.log("PERSON SAVED", person)
				res.json({person})
		}
	})

})

module.exports = router;
