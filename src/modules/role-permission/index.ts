import { create, getOne, remove, update } from "./controller";
import OpenApiService from "../../services/OpenApiService";
import ValidateMutationMiddleware from "../../middlewares/ValidateMutationMiddleware";

import { RolePermissionModelSchema } from "../../schemas";
const { convert } = require("joi-openapi");
const express = require("express");
const RolePermissionModule = express.Router();

const tags = ["role-permission"];
const moduleRefName = "role-permission";

RolePermissionModule.post("/create", [
  ValidateMutationMiddleware.body(
    RolePermissionModelSchema({ filter: ["*", "-pk"] })
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

RolePermissionModule.delete(
  "/delete",
  ValidateMutationMiddleware.body(
    RolePermissionModelSchema({
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
RolePermissionModule.put(
  "/update",
  ValidateMutationMiddleware.body(RolePermissionModelSchema()),
  async (req, res, next) => {
    try {
      const updated = await update(res.locals.input);

      res.json({ status: 1, data: updated });
    } catch (err) {
      next(err);
    }
  }
);

RolePermissionModule.get(
  "/get/:id",
  ValidateMutationMiddleware.params(
    RolePermissionModelSchema({ filter: [["pk", "id"]] })
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
RolePermissionModule.get("/get", (req, res, next) => {
  res.json({ status: 1 });
});

export default RolePermissionModule;
