var express = require('express');
var router = express.Router();
var ActionModel = require('../models/cultural_actions')
var ShowModel = require('../models/shows')
var PersonModel = require('../models/persons')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hoc Momento' });
});

router.get('/accueil', function(req, res, next){
  res.render('home')
})
 
router.get('/compagnie', function(req, res, next){
  res.render('company')
})

router.get('/actions-culturelles', async function(req, res, next){
  actions = await ActionModel.find(function(err, actions){
    console.log("action")
  })

  res.render('cultural_actions', {actions})
})

router.get('/action-culturelle', async function(req, res, next){
  
  action = await ActionModel.findOne({_id: req.query.id})

  res.render('cultural_action', {action})
})

router.get('/spectacles', async function(req, res, next){
  shows = await ShowModel.find(function(err, shows){
    console.log(shows)
  })
  res.render('shows', {shows})
})

router.get('/spectacle', async function(req, res, next){
  show = await ShowModel.findOne({_id: req.query.id})

  res.render('show', {show})
})


module.exports = router;
