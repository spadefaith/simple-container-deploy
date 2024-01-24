import OpenApiMiddleware from "../../middlewares/OpenApiMiddleware";
import ValidateMiddleware from "../../middlewares/ValidateMiddleware";
import { receiveHook } from "./controller";

const store = {};

const express = require('express');
const HookModule = express.Router();
const joi = require('joi');


HookModule.post('/receive/:type/:repo/:current_branch',
    [
        OpenApiMiddleware.path({
            summary:"hook",
            tags:['hook'],
            responses: {
                200: {
                  description: 'Successful response',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          status: { type: 'number' },
                          data: {type : 'boolean'}
                        }
                      }
                    }
                  }
                }
            },
            requestBody:{
                content:{
                  'application/json':{
                    schema: {
                        type: 'object',
                        properties: {}
                      }
                  }
                }, 
              }
        }),
        ValidateMiddleware.params(joi.object({
            repo:joi.string(),
            current_branch:joi.string(),
            type:joi.string(),
        })),
        async (req,res,next)=>{
            try {

              /**
               * trigger after 5mins
               */
              const time = 300000;
              const name = `${req.params.type}-${req.params.repo}-${req.params.current_branch}`;
              if(store[name]){
                clearInterval(store[name]);
              }
              store[name] = setInterval(()=>{
                console.log(`start execute ${name}`);
                receiveHook(req.params, req.body, req.query)
                .then(res=>{
                  console.log(11,res);
                  console.log(`stop execute ${name}`);
                }).catch(err=>{
                  console.log(err)
                  console.log(`failed execute ${name}`);
                });
              }, time);

              console.log(store[name]);

              res.json({status:1})
            } catch(err){
                next(err);
            }
        }
    ]
)


export default HookModule;