import joi from "joi";
import express from "express";
import OpenApiService from "../services/OpenApiService";
import { extractAndDelete } from "../utils";
const { convert } = require("joi-openapi");

export function checkerMiddleware({ generatedSchema, pk }, loc) {
  const schema: any = generatedSchema;
  const describe = schema.describe();

  return async function checkerMiddlewareFn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      let s = req[loc];

      await schema.validateAsync(s);

      if (loc == "params") {
        const id = extractAndDelete(s, "id", {});
        if (id != undefined) {
          s[pk] = id;
        }
      }

      res.locals.input = {
        payload: s,
        pk,
      };

      next();
    } catch (err) {
      if (joi.isError(err)) {
        next(
          new Error(
            err.details.reduce((accu, iter) => {
              accu += `${iter.message}, `;
              return accu;
            }, ""),
            { cause: describe }
          )
        );
      }
      next(err);
    }
  };
}

const ValidateMutationMiddleware = {
  query: ({ generatedSchema, pk }) => {
    return checkerMiddleware({ generatedSchema, pk }, "query");
  },
  body: (data) => {
    const { generatedSchema, pk } = data;

    if (!generatedSchema) {
      data = {
        generatedSchema: data,
        pk: undefined,
      };
    }

    return checkerMiddleware(data, "body");
  },
  params: ({ generatedSchema, pk }) => {
    return checkerMiddleware({ generatedSchema, pk }, "params");
  },
};

export default ValidateMutationMiddleware;
