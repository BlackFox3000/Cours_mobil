import express from 'express'
import routes from './routes'
import InitDb from './db'
import bodyParser from 'body-parser'

export default() =>{
    try {
        const app = express();
        InitDb();
        app.use(bodyParser.urlencoded({ extend: true}))
        routes(app)
        app.listen(process.env.PORT, ()=>{
            console.log(process.env.PORT, process.env.NODE_ENV)
        })
    }catch (e) {
        console.error(e);
    }
}