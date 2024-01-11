import { create, getMany, getOne, remove, update } from "./controller";
import OpenApiService from "../../services/OpenApiService";
import ValidateMutationMiddleware from "../../middlewares/ValidateMutationMiddleware";


import { AppModelSchema } from "../../schemas";
const { convert } = require('joi-openapi');
const express = require('express');
const AppModule = express.Router();


const tags = ['user'];
const moduleRefName = 'user';

AppModule.post('/create',
    [
      ValidateMutationMiddleware.body(AppModelSchema({ filter: ['*', '-pk'] })),
      OpenApiService.path({
        summary: `create ${moduleRefName}`,
        tags,
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number' },
                    data: { type: 'object' },
                  },
                },
              },
            },
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: convert(
                AppModelSchema({ filter: ['*', '-pk'] }).generatedSchema
              ),
            },
          },
        },
      }),
        async (req,res,next)=>{
            try {
              console.log(63,req.params.name);
              console.log(64,req.body);
                const created = await create(res.locals.input);
            
                console.log(11,created);

                res.json({status:1,data:created})
            } catch(err){
                next(err);
            }
        }
    ]
)


AppModule.delete(
  '/delete',
  ValidateMutationMiddleware.body(
    AppModelSchema({
      filter: ['pk'],
    })
  ),
  OpenApiService.path({
    summary: `delete ${moduleRefName}`,
    tags,
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'number' },
                data: { type: 'object' },
              },
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: convert(AppModelSchema({ filter: ['pk'] }).generatedSchema),
        },
      },
    },
  }),
  async (req, res, next) => {
    try {
      const removed = await remove(res.locals.input);
      res.json({ status: 1, data: removed });
    } catch (err) {
      next(err);
    }
  }
);
AppModule.put(
  '/update',
  ValidateMutationMiddleware.body(AppModelSchema()),
  OpenApiService.path({
    summary: `update ${moduleRefName}`,
    tags,
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'number' },
                data: { type: 'object' },
              },
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: convert(AppModelSchema().generatedSchema),
        },
      },
    },
  }),
  async (req, res, next) => {
    try {
      const updated = await update(res.locals.input);

      res.json({ status: 1, data: updated });
    } catch (err) {
      next(err);
    }
  }
);

AppModule.get(
  '/get/:id',
  ValidateMutationMiddleware.params(
    AppModelSchema({ filter: [['pk', 'id']] })
  ),
  OpenApiService.path({
    summary: `get one ${moduleRefName} by pk`,
    tags,
    responses: {
      200: {
        description: 'Successful response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'number' },
                data: { type: 'object' },
              },
            },
          },
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'inventory_id',
        required: true,
        schema: convert(
          AppModelSchema({ filter: [['pk', 'id']] }).generatedSchema
        ),
        description: 'entity primary key',
      },
    ],
  }),
  async (req, res, next) => {
    try {
      const get = await getOne(res.locals.input);
      res.json({ status: 1, data: get });
    } catch (err) {
      next(err);
    }
  }
);
AppModule.get('/get', async (req, res, next) => {
  try {
    const many = await getMany();

    res.json({ status: 1, data: many });
  } catch (err) {
    next(err);
  }
});


export default AppModule;