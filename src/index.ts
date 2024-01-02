import OpenApiMiddleware from "./middlewares/OpenApiMiddleware";
import DeployModule from "./modules/deploy";

const express = require('express');
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));


app.use(OpenApiMiddleware)
app.use('/redoc',OpenApiMiddleware.redoc)
app.use('/swagger',OpenApiMiddleware.swaggerui)


app.use('/api/deploy',DeployModule);



app.listen(8887,(err)=>{
    console.log(err || `listening to port 8887`)
})

app.use("*",(req,res,next)=>{

    res.json({status:1, message:'not found'})
})

app.use((error, req,res,next)=>{

    res.json({status:1, message:error.message})
})