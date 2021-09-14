const mongoose =require('mongoose')

const chatCollection = 'mensajes'

const ChatSchema = new mongoose.Schema({
    fecha:{type:String, require :true  ,max:100},
    mensaje:{type: String, require :true,max:100},
    email:{type:String ,  require:true,max:1000}

})

 module.exports  =mongoose.model(chatCollection,ChatSchema)