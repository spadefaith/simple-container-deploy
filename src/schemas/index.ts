import Models from "../../db/models";
import { generateSchema, parseEntity } from "../utils";




export const RoleModelSchema = generateSchema(parseEntity(Models.RoleModel));
export const PermissionModelSchema = generateSchema(parseEntity(Models.PermissionModel));
export const RolePermissionModelSchema = generateSchema(parseEntity(Models.RolePermissionModel));
export const UserModelSchema = generateSchema(parseEntity(Models.UserModel));
export const CategoryModelSchema = generateSchema(parseEntity(Models.CategoryModel));
export const AppModelSchema = generateSchema(parseEntity(Models.AppModel));
export const EnvModelSchema = generateSchema(parseEntity(Models.EnvModel));




export const categoryModelSchema = CategoryModelSchema().generatedSchema;
export const appModelSchema = AppModelSchema().generatedSchema;
export const userModelSchema = UserModelSchema().generatedSchema;
export const roleModelSchema = RoleModelSchema().generatedSchema;


export const permissionModelSchema = PermissionModelSchema().generatedSchema;


export const rolePermissionModelSchema = PermissionModelSchema().generatedSchema;
export const envModelSchema = EnvModelSchema().generatedSchema;