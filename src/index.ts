require('dotenv').config()
import RoleModule from "./modules/role";
import OpenApiMiddleware from "./middlewares/OpenApiMiddleware";
import DeployModule from "./modules/deploy";
import RolePermissionModule from "./modules/role-permission";
import PermissionModule from "./modules/permission";
import UserModule from "./modules/user";
import CategoryModule from "./modules/category";
import HookModule from "./modules/hook";
import AppModule from "./modules/app";
const PORT = process.env.PORT || 9000;
const express = require('express');
const app = express();



app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));


app.use(OpenApiMiddleware)
app.use('/redoc',OpenApiMiddleware.redoc)
app.use('/swagger',OpenApiMiddleware.swaggerui)


app.use('/api/deploy',DeployModule);
app.use('/api/role',RoleModule);
app.use('/api/role-permission',RolePermissionModule);
app.use('/api/permission',PermissionModule);
app.use('/api/user',UserModule);
app.use('/api/category',CategoryModule);
app.use('/api/app',AppModule);
app.use('/api/client/hook',HookModule);



app.listen(PORT,(err)=>{
    console.log(err || `listening to port ${PORT}`)
})

app.use("*",(req,res,next)=>{

    res.json({status:1, message:'not found'})
})

app.use((error, req,res,next)=>{
    res.status(400);
    res.json({status:0, message:error.message})
})

