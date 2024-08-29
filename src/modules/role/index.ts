import OpenApiMiddleware from "../../middlewares/OpenApiMiddleware";
import ValidateMiddleware from "../../middlewares/ValidateMiddleware";
import { create, getOne, remove, update } from "./controller";
import OpenApiService from "../../services/OpenApiService";
import ValidateMutationMiddleware from "../../middlewares/ValidateMutationMiddleware";

import { generateSchema, parseEntity } from "../../utils";
import Models from "../../../db/models";
import { RoleModelSchema } from "../../schemas";
const { convert } = require("joi-openapi");
const express = require("express");
const RoleModule = express.Router();
const joi = require("joi");
const validate = require("express-joi-validate");

const tags = ["role"];
const moduleRefName = "role";

RoleModule.post("/create", [
  ValidateMutationMiddleware.body(RoleModelSchema({ filter: ["*", "-pk"] })),
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

RoleModule.delete(
  "/delete",
  ValidateMutationMiddleware.body(
    RoleModelSchema({
      filter: ["pk"],
    })
  ),
  async (req, res, next) => {
    try {
      const removed = await remove(res.locals.input);
      res.json({ status: 1, data: removed });
    } catch (err) {
      next(err);
    }
  }
);
RoleModule.put(
  "/update",
  ValidateMutationMiddleware.body(RoleModelSchema()),
  async (req, res, next) => {
    try {
      const updated = await update(res.locals.input);

      res.json({ status: 1, data: updated });
    } catch (err) {
      next(err);
    }
  }
);

RoleModule.get(
  "/get/:id",
  ValidateMutationMiddleware.params(
    RoleModelSchema({ filter: [["pk", "id"]] })
  ),
  async (req, res, next) => {
    try {
      const get = await getOne(res.locals.input);
      res.json({ status: 1, data: get });
    } catch (err) {
      next(err);
    }
  }
);
RoleModule.get("/get", (req, res, next) => {
  res.json({ status: 1 });
});

export default RoleModule;
