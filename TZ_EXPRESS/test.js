const {Mongo} = require('./src/Mongo/MongoClass')
const model = require('./src/Mongo/mongo_model/note_model')
const db_config = require('./src/Mongo/database.json')


const mongo = new Mongo(db_config.ConnectUrl,'')


const res =async ()=> {
 //   mongo.connection(db_config.ConnectUrl)
    let res = await mongo.insertData(model, {
        name: "Azzsfasdfpoajkskfpokasdfpkaspdfokae swoke ksdfjlskdjfa",
        imgData: ['https://static8.depositphotos.com/1368414/989/i/600/depositphotos_9893798-stock-photo-writing-with-a-pencil.jpg',

        ],
        content: 'hdgfosuidhgfslifhpiweufhpiwhjfopasdjkf[opewijfpqoweihfpojfdaspokfjwpoeifhwipeu hi hhpoiwqeujpofihwefpoih wepihfpiwehfpiw epoihpio'
    })
    console.log(res)
}
res()