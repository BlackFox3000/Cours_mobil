import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    title: String,
    date: Date,
    text: String,
    food_code: String,
})

export const commentModel = mongoose.model('comment', commentSchema, 'comments')