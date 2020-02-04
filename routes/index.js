var express = require('express');
var router = express.Router();
var ActionModel = require('../models/cultural_actions')
var ShowModel = require('../models/shows')
var PersonModel = require('../models/persons')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hoc Momento' });
});


router.get('/home', function(req, res, next){
  res.render('home')
})

router.get('/company', function(req, res, next){
  res.render('company')
})


router.post('/create-action', function(req, res, next){
  console.log(req.body)

  newAction = new ActionModel({
    photo: req.body.photo, 
    place: req.body.place, 
    title: req.body.title, 
    period: req.body.period, 
    partners: req.body.partners, 
    gallery: req.body.gallery,
    description: req.body.description,
  })

  newAction.save(function(error, action){
    if (error){
        console.log("ADMIN NOT SAVED:", error)
        res.json({error})
    } else if (action){
        console.log("ADMIN SAVED", action)
        res.json({action})
    }
})
})

router.post('/create-show', function(req, res, next){
  console.log(req.body)

  newShow = new ShowModel({
    photo: req.body.photo, 
    place: req.body.place, 
    title: req.body.title, 
    period: req.body.period, 
    partners: req.body.partners, 
    gallery: req.body.gallery,
    description: req.body.description,
  })

  newShow.save(function(error, show){
    if (error){
        console.log("SHOW NOT SAVED:", error)
        res.json({error})
    } else if (show){
        console.log("SHOW SAVED", show)
        res.json({show})
    }
  })
})

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
