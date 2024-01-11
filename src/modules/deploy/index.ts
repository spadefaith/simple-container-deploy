import OpenApiMiddleware from "../../middlewares/OpenApiMiddleware";
import ValidateMiddleware from "../../middlewares/ValidateMiddleware";
import { create } from "./controller";
import OpenApiService from "../../services/OpenApiService";
import ValidateMutationMiddleware from "../../middlewares/ValidateMutationMiddleware";

import { generateSchema, parseEntity } from "../../utils";
const { convert } = require('joi-openapi');
const express = require('express');
const DeployModule = express.Router();
const joi = require('joi');
const validate = require('express-joi-validate');


const tags = ['apps'];
const moduleRefName = 'bank';


DeployModule.post('/create/:name',
    [
        OpenApiMiddleware.path({
            summary:"create an application",
            tags:['deploy'],
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
                        properties: {
                            env: { 
                                type:'object',
                                properties:{
                                    NODE_ENV:{type: 'string'},
                                    PORT:{type: 'number'},
                                }
                            },
                            branch: {type : 'string'},
                            repo: {type : 'string'}
                        }
                      }
                  }
                }, 
              }
        }),
        ValidateMiddleware.params(joi.object({
            name:joi.string(),
        })),
        ValidateMiddleware.body(joi.object({
            env:joi.any(),
            branch:joi.string(),
            repo:joi.string(),
            persist:joi.boolean(),
        })),
        async (req,res,next)=>{
            try {
              console.log(63,req.params.name);
              console.log(64,req.body);
                const created = await create(req.params.name, req.body);
            
                console.log(11,created);

                res.json({status:1,data:created})
            } catch(err){
              console.log(err);
                next(err);
            }
        }
    ]
)


export default DeployModule;