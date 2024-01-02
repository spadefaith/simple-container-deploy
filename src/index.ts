require('dotenv').config()
import OpenApiMiddleware from "./middlewares/OpenApiMiddleware";
import DeployModule from "./modules/deploy";
const PORT = process.env.PORT || 9000;
const express = require('express');
const app = express();



app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));


app.use(OpenApiMiddleware)
app.use('/redoc',OpenApiMiddleware.redoc)
app.use('/swagger',OpenApiMiddleware.swaggerui)


app.use('/api/deploy',DeployModule);



app.listen(PORT,(err)=>{
    console.log(err || `listening to port ${PORT}`)
})

app.use("*",(req,res,next)=>{

    res.json({status:1, message:'not found'})
})

app.use((error, req,res,next)=>{

    res.json({status:1, message:error.message})
})