import mongoose from 'mongoose'
const {Schema, model} = mongoose;

const postSchema = new Schema({
    title:{type:String, required:true},
    subtitle:{type:String},
    content:{type:String, required:true},
    section:{type:String},
    slug:{type:String, unique:true, required:false},
    ingredients:{type:[String], required:false},
    procedure:{type:[String], required:false},
    tags:{type:[String], required:false},
    publishDate:{type:Date, default:Date.now},
    image:{type:String}
})

const Post = model('Post', postSchema)

export default Post