import  { productModel } from '../db/food'

export default (app) => {
    //on définis nos routes
    app.get('/', async ()=>{
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

    app.get('/product/:bar_code', async (req, res)=>{
        const barCode = req.params.bar_code;
        try{
            const product = await productModel.findOne()
            res.status(200).json(product)
        }catch (err) {
            console.log(err.message)
            return res.status(500).json({
                'error':true,
                'message':'Error resquesting produc ${barCode}'
            })
        }
    })

}