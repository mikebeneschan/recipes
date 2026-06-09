import mongoose from 'mongoose';
import Post from '../models/post.js';

const indexCheck = async () => {
    try {
        const existingIndexes = await Post.collection.listSearchIndexes().toArray()
        if (existingIndexes.some((index) => index.name === "searchv1")){
            console.log("searchv1 already exists; no new index created")
            return;
        }    
        const index = {
            name: "searchv1",
            definition: {
                mappings: {
                    dynamic: false,
                    fields: {
                        title: { type: 'string' },
                        subtitle: { type: 'string' },
                        content: { type: 'string' },
                        tags: {type: 'string'}
                    }
                }
            }
        }
        const result = await Post.collection.createSearchIndex(index);
        console.log(result, 'index created')
    } catch (error) {
        console.error('Something went wrong creating the search index:', error.message);
    }        
}


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected: ${conn.connection.host}`)
        await indexCheck();
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;