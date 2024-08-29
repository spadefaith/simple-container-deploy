import { create, getOne, remove, update } from "./controller";
import OpenApiService from "../../services/OpenApiService";
import ValidateMutationMiddleware from "../../middlewares/ValidateMutationMiddleware";

import { PermissionModelSchema } from "../../schemas";
const { convert } = require("joi-openapi");
const express = require("express");
const PermissionModule = express.Router();

const tags = ["permission"];
const moduleRefName = "permission";

PermissionModule.post("/create", [
  ValidateMutationMiddleware.body(
    PermissionModelSchema({ filter: ["*", "-pk"] })
  ),
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

PermissionModule.delete(
  "/delete",
  ValidateMutationMiddleware.body(
    PermissionModelSchema({
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
PermissionModule.put(
  "/update",
  ValidateMutationMiddleware.body(PermissionModelSchema()),
  async (req, res, next) => {
    try {
      const updated = await update(res.locals.input);

      res.json({ status: 1, data: updated });
    } catch (err) {
      next(err);
    }
  }
);

PermissionModule.get(
  "/get/:id",
  ValidateMutationMiddleware.params(
    PermissionModelSchema({ filter: [["pk", "id"]] })
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
PermissionModule.get("/get", (req, res, next) => {
  res.json({ status: 1 });
});

export default PermissionModule;
