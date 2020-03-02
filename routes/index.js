var express = require('express');
var router = express.Router();
var ActionModel = require('../models/cultural_actions')
var ShowModel = require('../models/shows')
var MessageModel = require('../models/message')
var NewsModel = require('../models/newsletter') 

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
  console.log(action);
  

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

router.get('/contact', function(req, res){

  res.render('contact')
})

router.post('/contact', function(req, res){
  console.log(req.body)
  newMessage = new MessageModel({
    date: new Date,
    name: req.body.name,
    email: req.body.email,
    organisation: req.body.organisation,
    content: req.body.content,
    read: false,
  })

  newMessage.save(function(err, message){
    if (err){
      console.log("MESSAGE NOT SAVED", error);
    } else if (message){
      console.log("MESSAGE SAVED", message); 

      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SECRET_SENGRID_KEY);
      const msg = {
        to: 'c.rungette@gmail.com',
        from: req.body.email,
        subject: 'Nouveau messages depuis le site Hoc Momento',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg);
    }
  })

  res.redirect('/contact')
})

router.post('/newsletter', function(req, res){
  console.log(req.body);
  email = new NewsModel({
    email: req.body.email,
  })

  email.save(function(err, email){
    console.log("EMAIL SAVED", email)
  })
  
  res.redirect('contact')
})

module.exports = router;

