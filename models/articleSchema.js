const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    articleTitle : {
        type: String,
        required: true
    },

    articleURL : {
        type: String,
        required: true
    }
}, {timestamps: true})

const Article = mongoose.model('article', articleSchema);
module.exports = Article;