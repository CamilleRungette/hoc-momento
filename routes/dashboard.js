var express = require('express');
var router = express.Router();
var AdminModel = require ('../models/admin')
var ActionModel = require('../models/cultural_actions')
var ShowModel = require('../models/shows')
var MessageModel = require('../models/message')
var EventModel = require('../models/event')
var PersonModel = require('../models/persons')
var PartnerModel = require('../models/partners')
var ArticleModel = require('../models/articles')
var SupportModel = require('../models/support')
var multer  = require('multer')
var cloudinary = require('cloudinary')
var cloudinaryStorage = require('multer-storage-cloudinary');

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
  
	// newAdmin.save(function(error, admin){
  //   if (error){
  //       console.log("ADMIN NOT SAVED:", error)
  //       res.json({error})
  //   } else if (admin){
  //       console.log("ADMIN SAVED", admin)
  //       res.json({admin})
  //   }
  // })
})

router.get('/login', function(req, res, next){
	res.render('login')
})

router.post('/login', async function(req, res, next){
		console.log(req.body)

		searchAdmin = await AdminModel.findOne({email: req.body.email, password: req.body.password})

	if (searchAdmin){
    console.log("OK")
    req.session.admin = searchAdmin
    console.log(req.session.admin)
		res.redirect('/dashboard/actions')
	} else {
		console.log("NOT OK")
		res.redirect('/dashboard/login')
	}

})

router.get('/logout', function(req,res){
  req.session.admin = null
  console.log("cocou");
  
  res.redirect('/dashboard/login')
})

/* ACTIONS PART: DISPLAY, CREATION, DELETING AND UPDATING */

router.get('/actions', async function(req, res, next) {
  console.log("session:", req.session.admin)
  // if(!req.session.admin){
  //   res.redirect('/dashboard/login')
  // } else {
    console.log(req.session.admin);

    allActions = await ActionModel.find();
    allPartners = await PartnerModel.find();
    allSupports = await SupportModel.find();

    res.render('./dashboard/actions', {allActions, allPartners, allSupports});
  // }
});

router.post('/create-action', parser.array('images'), async function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    
try{
  // Creating photo gallery
    let backGallery = []    
    for (i=0; i< req.files.length; i++){
        backGallery.push(req.files[i].secure_url)
    }    

    // Creating array to deal the case of one entry (string and not table)
    let partnersArray = [];
    if (typeof req.body.partners_id == "string"){
      partnersArray.push(req.body.partners_id)
    } else {
      partnersArray = req.body.partners_id
    }

    let supportArray = [];
    if (typeof req.body.support == "string"){
      supportArray.push(req.body.support_id)
    } else {
      supportArray = req.body.support_id
    }

  //Creating the action    
    newAction = new ActionModel({
      place: req.body.place.toUpperCase(), 
      title: req.body.title, 
      period: req.body.period.toUpperCase(), 
      partners_id: partnersArray, 
      support_id: supportArray,
      photo: req.files[0].secure_url, 
      gallery: backGallery,
      description: req.body.description,
      city: req.body.city,
    })
   
  //Creaing array for the links
    let linkArray = [];
    if (typeof req.body.link == "string"){
      linkArray.push({link: req.body.link, name: req.body.nameLink})
    } else {
      for (let i=0; i< req.body.link.length; i++){
        linkArray.push({link: req.body.link[i], name: req.body.nameLink[i]})
      }
    }  
    for (let i=0; i< linkArray.length; i++){      
      newArticle = new ArticleModel({
        action_id: newAction._id,
        url: linkArray[i].link,
        name: linkArray[i].name
      })  
        
      newArticle.save(function(error, article){
        console.log("ARTICLE SAVED", error);    
      })
    }  
    // Save the action ad redirect
    newAction.save(function(error, action){
      if (error){
          console.log("ACTION NOT SAVED:", error)
          res.render('./dashboard/actions', {problem: error})
      } else if (action){
          console.log("ACTION SAVED", action);   
          res.redirect('/dashboard/actions')
      }
    })
  }catch(error){
    console.log(error);
  }
    }
});

router.post('/delete-action', async function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    action = await ActionModel.deleteOne({_id: req.body.id})
    console.log(`${action.title} DELETED ============`)

    res.redirect('/dashboard/actions')
  }
});

router.get('/update-action', async function(req, res, next){
  // if(!req.session.admin){
  //   res.redirect('/dashboard/login')
  // } else {
    action = await ActionModel.findById(req.query.id)
    console.log("L'ACTION =============>", action)

    res.render('./dashboard/actions-update', {action})
  // }
})

router.post('/update-action', parser.array('images'), async function(req, res, next){
  // if(!req.session.admin){
  //   res.redirect('/dashboard/login')
  // } else {
    try {
    if (req.body.description === " ") {
      console.log("hello =====>")
      update = await ActionModel.updateOne(
        {_id: req.body.id},
        {place: req.body.place,
        title: req.body.title,
        city: req.body.city,
        period: req.body.period}
      );
    } else {
      update = await ActionModel.updateOne(
        {_id: req.body.id},
        {place: req.body.place,
        title: req.body.title,
        city: req.body.city,
        period: req.body.period,
        description: req.body.description}
      ) ; 
    }
    res.redirect('/dashboard/actions');
    }catch(error){
    console.log(error);
    };
  // }
});

router.get('/update-action-gallery', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    action = await ActionModel.findById(req.query.id)
    gallery = action.gallery

    res.render('./dashboard/update-action-gallery', {action, gallery})
  }
})

router.get('/delete-photo-action', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
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
  }
})

router.post('/add-photo-action',  parser.array('images'), async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
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
  }
})




/* SHOWS PART: DISPLAY, CREATION, DELETING AND UPDATING */

router.get('/shows', async function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    allShows = await ShowModel.find(function(err, shows){
      console.log("VOILA========+++>")
    })
    res.render('./dashboard/shows', {allShows})
  }
});

router.post('/create-show', parser.array('images'), function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
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
  }
});

router.post('/delete-show', async function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    show = await ShowModel.deleteOne({_id: req.body.id})
    console.log(`SHOW DELETED ============`)

    res.redirect('/dashboard/shows')
  }
});

router.get('/update-show', async function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {  
    show = await ShowModel.findById(req.query.id)
    console.log("LE SHOW =============>", show)

    res.render('./dashboard/show-update', {show})
  }
})

router.post('/update-show', async function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
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
  }
});

router.get('/update-show-gallery', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    show = await ShowModel.findById(req.query.id)
    gallery = show.gallery

    res.render('./dashboard/update-show-gallery', {show, gallery})
  }
  })

router.get('/delete-photo-show', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    showGallery = []
    show = await ShowModel.findById(req.query.show)
    showGallery = show.gallery
    showGallery.splice(req.query.index, 1)
    update = await ShowModel.updateOne(
      {_id: req.query.show},
      {gallery: showGallery})

    show = await ShowModel.findById(req.query.show)
    gallery = show.gallery

    res.render('./dashboard/update-show-gallery', {show, gallery})
  }
})

router.post('/add-photo-show',  parser.array('images'), async function(req, res,next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
  let showGallery = []
    console.log(req.files, req.files.length)

      show = await ShowModel.findById(req.body.show)
      showGallery = show.gallery
      
    for (i=0; i< req.files.length; i++){
      console.log(req.files[i].secure_url)
      showGallery.push(req.files[i].secure_url)
    }
    console.log(showGallery)

        update = await ShowModel.updateOne(
          {_id: req.body.show},
          {gallery: showGallery}
        )
        show = await ShowModel.findById(req.body.show)
        gallery = show.gallery
      console.log(show)

      res.render('./dashboard/update-show-gallery', {show, gallery})
  }
})




/* MESSAGES PART */
router.get('/messages', async function (req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {

    allMessages = await MessageModel.find(function(err, messages){
      console.log(messages)
    })
    res.render('./dashboard/messages', {allMessages})

  }
})

router.get('/read-message', async function(req, res){
  
  update = await MessageModel.updateOne(
    {_id: req.query.id},
    {read: true}
    )
  res.redirect('/dashboard/messages')
})

router.get('/unread-message', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {

    update = await MessageModel.updateOne(
      {_id: req.query.id},
      {read: false}
      )
    res.redirect('/dashboard/messages')
  }
})



/* AGENDA PART */
router.get('/agenda', async function(req,res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
  allEvents = await EventModel.find(function(error, events){
    console.log("ok");
  })

  let futurEvents = [];
  let pastEvents = [];
  let currentDate = new Date

  for (i=0; i< allEvents.length; i++){
    if(allEvents[i].date >= currentDate){
      futurEvents.push(allEvents[i])
    }else{
      pastEvents.push(allEvents[i])
    }
  }
  res.render('dashboard/agenda', {allEvents, futurEvents, pastEvents})
}
})

router.post('/create-event', parser.single('image'), async function(req,res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {

    newEvent = new EventModel({
      title: req.body.title,
      place: req.body.place,
      photo: req.file.secure_url,
      period: req.body.period,
      description: req.body.description,
      city: req.body.city, 
      type: req.body.type,
      date: req.body.date
    })

    newEvent.save(function(error, event){
      console.log("EVENT SAVED:", event);
    })

    console.log(newEvent);  
  res.redirect('/dashboard/agenda')
  }
})

router.post('/delete-event', async function(req, res){
  console.log(req.body);
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    event = await EventModel.deleteOne({_id: req.body.id})
    console.log(`Event DELETED ============`)
    res.redirect('/dashboard/agenda')
  }
  
})

router.get('/update-event', async function(req,res){
  console.log(req.query);
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {  
    event = await EventModel.findById(req.query.id)
    console.log("L'EVENT =============>", event)

    res.render('./dashboard/event-update', {event})
  }

})

router.post('/update-event', async function (req, res){
  console.log(req.body);
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    try {
    if (req.body.description === " ") {
      console.log("hello =====>")
      update = await EventModel.updateOne(
        {_id: req.body.id},
        {place: req.body.place,
        title: req.body.title,
        period: req.body.period,
        type: req.body.type,}
      );
    } else {
      update = await EventModel.updateOne(
        {_id: req.body.id},
        {place: req.body.place,
        title: req.body.title,
        period: req.body.period,
        type: req.body.type,
        description: req.body.description}
      ) ; 
    }
    res.redirect('/dashboard/agenda');
    }catch(error){
      console.log(error);
    };
  }

})

router.post('/update-event-photo',  parser.single('image'), async function(req, res){
  console.log(req.body.event);
  console.log(req.file);
  
  update = await EventModel.updateOne(
    { _id: req.body.event},
    {photo: req.file.secure_url})

  res.redirect('/dashboard/agenda')
})




/* PERSON PART */
router.get('/team', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
  allPersons = await PersonModel.find();
  res.render('./dashboard/team', {allPersons})
  }
})

router.post('/create-person', parser.single('image'), function(req, res, next){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    console.log(req.body)
    console.log(req.file);
    
    newPerson = new PersonModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      title: req.body.title,
      description: req.body.description,
      email: req.body.email,
      telephone: req.body.telephone,
      photo: req.file.secure_url,
    })

    newPerson.save(function(error, person){
      if (error){
          console.log("PERSON NOT SAVED:", error)
          res.render('./dashboard/team')
      } else if (person){
          console.log("PERSON SAVED", person)
          res.redirect('/dashboard/team')
      }
    })
  }
})

router.post('/delete-person', async function(req, res){
  console.log(req.body);
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    event = await PersonModel.deleteOne({_id: req.body.id})
    console.log(`Event DELETED ============`)
    res.redirect('/dashboard/team')
  }  
})

router.get('/update-person', async function(req, res){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {  
    person = await PersonModel.findById(req.query.id)
    console.log("LA PERSONNE =============>", person)

    res.render('./dashboard/person-update', {person})
  }

})

router.post('/update-person', async function(req, res){
  console.log(req.body);
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    try {
    if (req.body.description === " ") {
      console.log("hello =====>")
      update = await PersonModel.updateOne(
        {_id: req.body.id},
        {first_name: req.body.first_name,
        last_name: req.body.last_name,
        title: req.body.title,
        email: req.body.email,}
      );
    } else {
      update = await EventModel.updateOne(
        {_id: req.body.id},
        {first_name: req.body.first_name,
          last_name: req.body.last_name,
          title: req.body.title,
          email: req.body.email,
          description: req.body.description}
      ) ; 
    }
    res.redirect('/dashboard/team');
    }catch(error){
      console.log(error);
    }; 
}
})

router.post('/update-person-photo', parser.single('image'), async function(req, res){
  console.log(req.body.event);
  console.log(req.file);
  
  update = await PersonModel.updateOne(
    { _id: req.body.person},
    {photo: req.file.secure_url})

  res.redirect('/dashboard/team')
})



/* PARTNERS PART */
router.get('/partners', async function(req, res ){
  if(!req.session.admin){
    res.redirect('/dashboard/login')
  } else {
    allPartners = await PartnerModel.find();
    allSupports = await SupportModel.find()
    res.render('./dashboard/partners', {allPartners, allSupports})
  }
})

router.post('/create-partner', parser.single('image'), function (req, res){
  newPartner = new PartnerModel({
    name: req.body.name,
    link: req.body.link,
    photo: req.file.secure_url
  })

  newPartner.save(function(error, partner){
    console.log("PARTNER SAVED", partner);  
  })

  res.redirect('/dashboard/partners')
})

router.post('/delete-partner', async function(req,res){
  PartnerModel.deleteOne({_id: req.body.partner}, function(error, partner){
    console.log("OK");
  })

  res.redirect('/dashboard/partners')
})

router.post('/update-partner', parser.single('image'), async function(req, res){
  console.log(req.body);
  

  res.redirect('/dashboard/partners')
})

router.post('/create-support', parser.single('image'), function (req, res){
  newSupport = new SupportModel({
    name: req.body.name,
    link: req.body.link,
    photo: req.file.secure_url
  })

  newSupport.save(function(error, support){
    console.log("PARTNER SAVED", support); 
  })

  res.redirect('/dashboard/partners')
})

router.post('/delete-support', async function(req,res){
  SupportModel.deleteOne({_id: req.body.support}, function(error, support){
    console.log("OK");
  })

  res.redirect('/dashboard/partners')
})


module.exports = router;
