const mongoose = require('mongoose');
const primaryUser = require('./user-model');

const commentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        createdBy: { type: primaryUser.userPrimarySchema, required: true },
        createdAt: { type: Date, default: Date.now },
    },
);

const postSchema = new mongoose.Schema(
    {
        postId: { type: String, required: true },
        title: { type: String, required: true },
        caption: { type: String, required: false },
        thumbnail: { type: String, required: true },
        links: { type: [String], required: false },
        likes: { type: Number, default: 0 },
        createdBy: { type: primaryUser.userPrimarySchema, required: true },
        comments: { type: [commentSchema], required: false },
        medias: { type: [String], required: false },
        tags: { type: [String], required: false},
        createdAt: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model('Post', postSchema);