import OpenApiMiddleware from "../../middlewares/OpenApiMiddleware";
import ValidateMiddleware from "../../middlewares/ValidateMiddleware";
import { receiveHook } from "./controller";


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

                const received = await receiveHook(req.params, req.body);
            
                console.log(11,received);

                res.json({status:1})
            } catch(err){
                next(err);
            }
        }
    ]
)


export default HookModule;