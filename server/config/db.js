import mongoose from 'mongoose';
import Post from '../models/post.js';

const indexCheck = async () => {
    try {
        const definition = {
            analyzer: "lucene.english",
            mappings: {
                dynamic: false,
                fields: {
                    title: { type: 'autocomplete' },
                    subtitle: { type: 'string' },
                    content: { type: 'string' },
                    tags: {type: 'string'},
                    recipeCards: {
                        type: 'document',
                        fields: {
                            label: { type: 'string' },
                            procedure: { type: 'string' },
                            ingredients: {
                                type: 'document',
                                fields: {
                                    sectionName: { type: 'string' },
                                    ings: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            },
            synonyms: [
                {
                    analyzer: "lucene.english",
                    name: "syn",
                    "source": {
                        collection: "synonyms"
                    }
                }
            ]
        }
        const index = {
            name: "searchv1",
            definition: definition,
        }
        const existingIndexes = await Post.collection.listSearchIndexes().toArray()
        if (existingIndexes.some((index) => index.name === "searchv1")){
            await Post.collection.updateSearchIndex("searchv1", definition)
            console.log("searchv1 already exists; index updated")
            return;
        } else {
            const result = await Post.collection.createSearchIndex(index);
            console.log(result, 'index created')
        }
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