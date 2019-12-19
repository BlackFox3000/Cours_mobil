import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    bar_code: Number,
    grade: String,
    pictures: [String],
    quantity: String,
    ingredients: [Object],
})

export const productModel = mongoose.model('food', productSchema, 'products')