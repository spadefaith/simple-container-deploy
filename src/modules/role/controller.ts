import Models from "../../../db/models";
import { roleModelSchema } from "../../interfaces";



type InputType = {
    payload: roleModelSchema;
    pk: string;
  };
export const create = async (data: InputType)=>{
    return Models.RoleModel.create(data.payload);
}

export const update = (data:InputType) => {
    const { payload, pk } = data;
    if(payload[pk] == undefined){
        throw new Error(`${pk} is undefined`);
    }
  
    return Models.RoleModel.update(payload,{
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
  
    return Models.RoleModel.destroy({
        where:{
            [pk]:payload[pk]
        }
    });
}


export const getOne = (data) => {
    console.log(data);
    const { payload, pk } = data;
    return Models.RoleModel.findOne({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  
  export const getMany = (data) => {
    const { payload, pk } = data;
    return Models.RoleModel.findAll({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  