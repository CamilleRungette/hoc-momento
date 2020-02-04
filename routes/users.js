var express = require('express');
var router = express.Router();
var AdminModel = require ('../models/admin')


/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

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


module.exports = router;
