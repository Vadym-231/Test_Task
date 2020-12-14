const mongoose = require('mongoose')

//mongodb+srv://Admin:akijpo12lkspkpkKKHG23@cluster0.px065.mongodb.net/AnyData?retryWrites=true&w=majority
//mongodb+srv://Admin:@cluster0.px065.mongodb.net/<dbname>?retryWrites=true&w=majority
const note = mongoose.Schema({
    name: {
        type: String,
        default:'Untitled'
    },
    imgData:{
      type:Array,
      default:[]
    },
    content:{
        type:String,
        default:'Nothing here!'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Note_model = mongoose.model('Notes', note)

module.exports = Note_model