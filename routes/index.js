require('dotenv/config')

var express = require('express');
var router = express.Router();
var ActionModel = require('../models/cultural_actions')
var ShowModel = require('../models/shows')
var MessageModel = require('../models/message')
var NewsModel = require('../models/newsletter') 
var EventModel = require('../models/event')
var PersonModel = require('../models/persons')
var PartnerModel = require('../models/partners')
var ArticleModel = require('../models/articles')
var SupportModel = require('../models/support')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/accueil');
});

router.get('/accueil', async function(req, res, next){
  allEvents = await EventModel.find(function(error, events){
    console.log("OK");
  })
  let futurEvents = [];
  let currentDate = new Date

  for (i=0; i< allEvents.length; i++){
    if(allEvents[i].date >= currentDate){
      futurEvents.push(allEvents[i])
    }
  }
  res.render('home', {events: futurEvents})
})
 
router.get('/compagnie', function(req, res, next){
  res.render('company')
})

router.get('/actions-culturelles', async function(req, res, next){
  actions = await ActionModel.find(function(err, actions){
    console.log("action")
  })
  actions.reverse();
  res.render('cultural_actions', {actions})
})

router.get('/action-culturelle', async function(req, res, next){
  action = await ActionModel.findOne({_id: req.query.id})
  articles = await ArticleModel.find({action_id: req.query.id})
  console.log("articles", action);
  res.render('cultural_action', {action, articles})
})

router.get('/gallerie-action-culturelle', async function(req, res){
  action = await ActionModel.findById(req.query.id)
  res.render('cultural_action_gallery', {action})
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

router.get('/gallerie-spectacle', async function (req, res){
  show = await ShowModel.findById(req.query.id)
  res.render('show_gallery', {show})  
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

  try{
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
}catch(error){
  console.log(error);
  
}

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

router.get('/agenda', async function(req, res ){
  allEvents = await EventModel.find(function(error, events){
    console.log("OK");
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

  console.log("FUTUR:", futurEvents);
  console.log("PAST:", pastEvents);
  
  res.render('agenda', {futurEvents})
})

router.get('/equipe', async function(req, res){
  allPersons = await PersonModel.find(function(error, persons){
    console.log(persons);
  })
  
  res.render('team', {allPersons})
})

router.get('/partenaires', async function(req, res){
  allPartners = await PartnerModel.find(function(error, partners){
    console.log(partners);
  })
  allSupports = await SupportModel.find(function(error, supports){
    console.log(supports);
  })

  res.render('partners', {allPartners, allSupports})
})


module.exports = router;

