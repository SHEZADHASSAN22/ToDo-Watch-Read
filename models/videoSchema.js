const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    videoTitle: {
        type: String,
        required: true
    },
    videoEmbed: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Video = mongoose.model('video', videoSchema);
module.exports = Video;