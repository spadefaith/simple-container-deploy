import { create, getMany, getOne, remove, update } from "./controller";
import OpenApiService from "../../services/OpenApiService";
import ValidateMutationMiddleware from "../../middlewares/ValidateMutationMiddleware";

import { AppModelSchema } from "../../schemas";
import { joi } from "../../utils";
import ValidateApiKey from "../../middlewares/ValidateApiKey";
const { convert } = require("joi-openapi");
const express = require("express");
const AppModule = express.Router();

const tags = ["user"];
const moduleRefName = "user";

AppModule.post("/create", [
  ValidateMutationMiddleware.body(AppModelSchema({ filter: ["*", "-pk"] })),

  async (req, res, next) => {
    try {
      console.log(63, req.params.name);
      console.log(64, req.body);
      const created = await create(res.locals.input);

      console.log(11, created);

      res.json({ status: 1, data: created });
    } catch (err) {
      next(err);
    }
  },
]);

AppModule.delete(
  "/delete",
  ValidateApiKey,
  ValidateMutationMiddleware.body({
    pk: "app_id",
    generatedSchema: joi.object({
      app_id: joi.number().required(),
      name: joi.string().required(),
    }),
  }),
  OpenApiService.path({
    summary: `delete ${moduleRefName}`,
    tags,
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "number" },
                data: { type: "object" },
              },
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        "application/json": {
          schema: convert(
            joi.object({
              app_id: joi.number().required(),
              name: joi.string().required(),
            })
          ),
        },
      },
    },
    parameters: [
      {
        in: "header",
        name: "x-api-key",
        required: true,
        schema: {
          type: "string",
        },
        description: "api key",
      },
    ],
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

AppModule.get(
  "/get/:id",
  ValidateApiKey,
  ValidateMutationMiddleware.params(AppModelSchema({ filter: [["pk", "id"]] })),
  OpenApiService.path({
    summary: `get one ${moduleRefName} by pk`,
    tags,
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "number" },
                data: { type: "object" },
              },
            },
          },
        },
      },
    },
    parameters: [
      {
        in: "path",
        name: "app_id",
        required: true,
        schema: convert(
          AppModelSchema({ filter: [["pk", "id"]] }).generatedSchema
        ),
        description: "entity primary key",
      },
      {
        in: "header",
        name: "x-api-key",
        required: true,
        schema: {
          type: "string",
        },
        description: "api key",
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
AppModule.get(
  "/get",
  ValidateApiKey,
  OpenApiService.path({
    summary: `get one ${moduleRefName} by pk`,
    tags,
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "number" },
                data: { type: "object" },
              },
            },
          },
        },
      },
    },
    parameters: [
      {
        in: "query",
        name: "app_id",
        required: false,
        schema: {
          type: "string",
        },
        description: "app id",
      },
      {
        in: "query",
        name: "name",
        required: false,
        schema: {
          type: "string",
        },
        description: "app name",
      },
      {
        in: "header",
        name: "x-api-key",
        required: true,
        schema: {
          type: "string",
        },
        description: "api key",
      },
    ],
  }),
  async (req, res, next) => {
    try {
      const many = await getMany(req.query);

      res.json({ status: 1, data: many });
    } catch (err) {
      next(err);
    }
  }
);

export default AppModule;
