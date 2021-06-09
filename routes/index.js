require('dotenv').config();

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
var SupportModel = require('../models/support');
const request = require('request');


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
  let articles = [];
  let videos = []; 
  let pdf = [];
  for (let i=0; i< action.links.length; i++){
    if (action.links[i].type === 'article'){
      articles.push(action.links[i]);
    } else if (action.links[i].type === 'video'){
      videos.push(action.links[i]);
    }else if (action.links[i].type === 'pdf'){
      pdf.push(action.links[i]);
    }
  }
  res.render('cultural_action', {action, articles, videos, pdf})
})

router.get('/gallerie-action-culturelle', async function(req, res){
  action = await ActionModel.findById(req.query.id)
  res.render('cultural_action_gallery', {action})
})

router.get('/spectacles', async function(req, res, next){
  shows = await ShowModel.find(function(err, shows){
    console.log(shows)
  })
  shows.reverse();
  res.render('shows', {shows})
})

router.get('/spectacle', async function(req, res, next){
  show = await ShowModel.findOne({_id: req.query.id})
  let articles = [];
  let videos = []; 
  let pdf = [];
  for (let i=0; i< show.links.length; i++){
    if (show.links[i].type === 'article'){
      articles.push(show.links[i]);
    } else if (show.links[i].type === 'video'){
      videos.push(show.links[i]);
    }else if (show.links[i].type === 'pdf'){
      pdf.push(show.links[i]);
    }
  }
  res.render('show', {show, articles, videos, pdf})
})

router.get('/gallerie-spectacle', async function (req, res){
  show = await ShowModel.findById(req.query.id)
  res.render('show_gallery', {show})  
})

router.get('/contact', function(req, res){
  res.render('contact')
});

router.post('/verify', async function(req, res){
  if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
    let response = {success: false, msg: "Please select captcha"};
    return res.send(response);
  };

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${req.body.captcha}`;

  try {

  request(verifyUrl, async (err, response, body) => {
    body = JSON.parse(body);

    if (body.success){

      newMessage = new MessageModel({
        date: new Date,
        name: req.body.name,
        email: req.body.email,
        organisation: req.body.organisation,
        content: req.body.content,
        read: false,
      })
       await newMessage.save((err, msg) => {
         if (err) {
           console.log(err);
         } else if (msg) {
           console.log("message saved");

           const sgMail = require('@sendgrid/mail');
           sgMail.setApiKey(process.env.SECRET_SENGRID_KEY);
           
           const message = {
             to: 'hocmomentotheatre@gmail.com',
             from: req.body.email,
             subject: 'Nouveau messages depuis le site Hoc Momento',
             text: `Organisation: ${req.body.organisation}
             ${req.body.content}`,
             html: `<strong> Nouveau message de la part de: ${req.body.name} </strong> <br/>
             <strong>Organisation: ${req.body.organisation}</strong> <br/>
               <p> ${req.body.content} </p>
             `,
           };
           sgMail.send(message);
         }
       })    
      };
      res.redirect('contact');
  });
}catch(err){
  console.log(err);
}
  // res.redirect('contact ');
});

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
    console.log(events);
  })
  let futurEvents = [];
  let currentDate = new Date

  for (i=0; i< allEvents.length; i++){
    if(allEvents[i].show[allEvents[i].show.length-1].endDate >= currentDate){
      futurEvents.push(allEvents[i])
    }
  }
  
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
  console.log(allPartners, allSupports);
  res.render('partners', {allPartners, allSupports})
})


module.exports = router;

