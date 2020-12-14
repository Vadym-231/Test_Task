var express = require('express');
var router = express.Router();
const {Mongo} =  require('../src/Mongo/MongoClass')
const db_model = require('../src/Mongo/mongo_model/note_model')
const db_config = require('../src/Mongo/database.json')
const error_loger = require('../src/logger')
const mongo = new Mongo(db_config.ConnectUrl,'')
/* GET users listing. */

const addData=(name,content,img)=>{
  try {
    if(name.length>10&&content.length>25&&content.length<150){
      if(img!==null) {
        return mongo.insertData(db_model, {
          name: name,
          imgData: '/img/' + img,
          content: content
        })
      }else {
        return mongo.insertData(db_model, {
          name: name,
          imgData: '/img/' + img,
        })
      }
    }
  }catch (e) {
    error_loger.error(e)
  }
}


const multer  = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

router.post("/add", upload.single('file'),async function (req, res, next) {
  try {
    let filedata = req.file;////name imgData content
    let result;
   // console.log(filedata);
    if (!filedata) {
      result = await addData(req.body.title, req.body.content)
    } else {
      result = await addData(req.body.title, req.body.content, filedata.filename)
    }
    if (result) {
      res.status(200).send()
    } else {
      res.status(401).send()
    }
  }catch (e) {
    res.status(401).send()
    error_loger.error(e)

  }
  next()
});
router.get('/remove/:ID',async (req,res)=>{
  try {
    if(typeof req.params.ID==='string'&&req.params.ID.length>0){
      let result = mongo.deleteById(db_model,req.params.ID)
      console.log(result)
      if(result){
        res.status(200).send()
      }
      else {
        res.status(401).send()
      }
    }
  }catch (e) {
    console.log(e)
    error_loger.error(e)
  }

})
router.get('/getNotes', async function(req, res) {
  try {
    let data = await mongo.getDataByInform(db_model,null,null)
   // console.log(data)

      res.status(200);
      res.send(JSON.stringify(data))

  }catch (e) {
    res.status(404).send()
    error_loger.error(e)
  }
});

module.exports = router;
