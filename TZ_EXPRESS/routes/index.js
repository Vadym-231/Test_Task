var express = require('express');
var router = express.Router();
const path = require('path')
const {fileGetter} = require('../src/File Getter/file_geter')
const error_logger = require('../src/logger')

/* GET home page. */

//__dirname,'../src/bundle.js'path.join('C:\\Users\\Вадим\\WebstormProjects\\portfolio_react\\dist\\bundle.js'
router.get('/img/:imgId',(req, res) => {

    try {

      fileGetter(res,path.join(__dirname,'../uploads/'+req.params.imgId),'img')

      return;

    }catch (err) {

      console.log(err)
      res.status(404).end();
    }

})
router.get('/bundle', function(req, res) {
  fileGetter(res,path.join(__dirname,'../src/bundle.js'),'text/javascript').pipe(res)
  return;
});

router.get(RegExp(/^\/.*/),((req, res) => {
  fileGetter(res,path.join(__dirname,'../public/index.html'),'text/html').pipe(res)
}))

module.exports = router;