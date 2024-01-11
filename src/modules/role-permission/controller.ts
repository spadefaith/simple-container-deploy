import Models from "../../../db/models";
import { rolePermissionModelSchema } from "../../interfaces";



type InputType = {
    payload: rolePermissionModelSchema;
    pk: string;
  };
export const create = async (data: InputType)=>{
    return Models.RolePermissionModel.create(data.payload);
}

export const update = (data:InputType) => {
    const { payload, pk } = data;
    if(payload[pk] == undefined){
        throw new Error(`${pk} is undefined`);
    }
  
    return Models.RolePermissionModel.update(payload,{
        where:{
            [pk]:payload[pk]
        }
    });
}



export const remove = (data: InputType) => {
    const { payload, pk } = data;
  
    if(payload[pk] == undefined){
        throw new Error(`${pk} is undefined`);
    }
  
    return Models.RolePermissionModel.destroy({
        where:{
            [pk]:payload[pk]
        }
    });
}


export const getOne = (data) => {
    console.log(data);
    const { payload, pk } = data;
    return Models.RolePermissionModel.findOne({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  
  export const getMany = (data) => {
    const { payload, pk } = data;
    return Models.RolePermissionModel.findAll({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  