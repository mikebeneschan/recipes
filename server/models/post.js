import mongoose from 'mongoose'
const {Schema, model} = mongoose;

const postSchema = new Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    slug:{type:String, unique:true, required:false},
    ingredients:{type:String, required:false},
    procedure:{type:[String], required:false},
    tags:{type:[String], required:false},
    publishDate:{type:Date, default:Date.now}
})

const Post = model('Post', postSchema)

export default Post