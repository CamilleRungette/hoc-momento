var express = require('express');
var router = express.Router();
var AdminModel = require ('../models/admin')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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



module.exports = router;
