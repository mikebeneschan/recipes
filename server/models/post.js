import mongoose from 'mongoose'
const {Schema, model} = mongoose;

const ingredientSchema = new Schema({
    sectionName:{type: String},
    ings:{type:[String]}

}, {_id: false})

const recipeCardSchema = new Schema({
    label:{type:String},
    servingSize:{type:String},
    procedure:{type:[String]},
    ingredients:{type:[ingredientSchema]}
}, {_id: false})

const postSchema = new Schema({
    title:{type:String, required:true},
    subtitle:{type:String},
    content:{type:String, required:true},
    slug:{type:String, unique:true, required:false},
    tags:{type:[String], required:false},
    publishDate:{type:Date, default:Date.now},
    image:{type:String},
    recipeCards:{type:[recipeCardSchema]}
}, { collection: 'posts'})

const Post = model('Post', postSchema)

export default Post