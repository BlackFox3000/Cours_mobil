import  { productModel } from '../db/food'
import  { commentModel } from '../db/comment'
// Ici on défini la fonction appliqué en fonction de l'url donnée
export default (app) => {
    //on définis nos routes
    app.get('/', async (req, res)=>{
        try{
            const products = await productModel.find()
            res.status(200).json(products)
        }catch (err) {
            return res.status(500).json({
                'error':true,
                'message':'Error resquesting products'
            })
        }
    })

    app.get('/product/:bar_code', async (req,res) => {
        const barCode = req.params.bar_code;
        try {
            const product = await productModel.findOne({bar_code: barCode});
            if (product)
                res.status(200).json(product);
            else {
                res.status(404).json({
                    'error': true,
                    'message': `No product with barcode ${barCode} found ..`
                })
            }
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting product ${barCode} !`
            })
        }
    })

    app.post('/product', async(req, res)=>{
        try{
            const{
                name,
                brand,
                bar_code,
                grade,
                quantity,
                pictures,
                ingredients
            } = req.body
            const request = new productModel({
                name,
                brand,
                bar_code,
                grade,
                quantity,
                pictures,
                ingredients
            })
            const inserted = await request.save()

            if(inserted && inserted._id){
                // insertion OK
                return res.json(inserted)
            }else {
                // insertion pas OK
                return res.status(500).json({
                    status: 'fail',
                    message: 'le produit n a pas pu être insérer'
                })
            }
        }catch (err) {
            console.log(err.message)

            return res.status(500).json({
                error: true,
                message: 'Error inserting new product'
            })
        }
    })

    app.get('/comments/:food_code', async (req,res) => {
        const foodcode = req.params.food_code;
        try {
            const comment = await commentModel.find({food_code: foodcode});
            if (comment)
                res.status(200).json(comment);
            else {
                res.status(404).json({
                    'error': true,
                    'message': `No comment with foodcode ${foodcode} found ..`
                })
            }
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting comment ${foodcode} !`
            })
        }
    })

    app.get('/comment/:comment_id', async (req,res) => {
        const commentId = req.params.comment_id;
        try {
            const comment = await commentModel.findOne({_id: commentId});
            if (comment)
                res.status(200).json(comment);
            else {
                res.status(404).json({
                    'error': true,
                    'message': `No product with barcode ${commentId} found ..`
                })
            }
        } catch (err){
            console.log(err.message);
            return res.status(500).json({
                'error': true,
                'message': `Error resquesting product ${commentId} !`
            })
        }
    })

    app.post('/comment/:food_code', async(req, res)=>{
        try{
            const food_code = req.params.food_code;
            const{
                title,
                date,
                text
            } = req.body
            const request = new commentModel({
                title,
                date,
                text,
                food_code
            })
            const inserted = await request.save()

            if(inserted && inserted._id){
                // insertion OK
                return res.json(inserted)
            }else {
                // insertion pas OK
                return res.status(500).json({
                    status: 'fail',
                    message: 'le commentaire n a pas pu être insérer'
                })
            }
        }catch (err) {
            console.log(err.message)

            return res.status(500).json({
                error: true,
                message: 'Error inserting new comment'
            })
        }
    })
}


