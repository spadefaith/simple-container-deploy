import Models from "../../../db/models";
import { permissionModelSchema } from "../../interfaces";



type InputType = {
    payload: permissionModelSchema;
    pk: string;
  };
export const create = async (data: InputType)=>{
    return Models.PermissionModel.create(data.payload);
}

export const update = (data:InputType) => {
    const { payload, pk } = data;
    if(payload[pk] == undefined){
        throw new Error(`${pk} is undefined`);
    }
  
    return Models.PermissionModel.update(payload,{
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
  
    return Models.PermissionModel.destroy({
        where:{
            [pk]:payload[pk]
        }
    });
}


export const getOne = (data) => {
    console.log(data);
    const { payload, pk } = data;
    return Models.PermissionModel.findOne({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  
  export const getMany = (data) => {
    const { payload, pk } = data;
    return Models.PermissionModel.findAll({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  