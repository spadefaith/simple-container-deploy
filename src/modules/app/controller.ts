import Models from "../../../db/models";
import {appModelSchema } from "../../interfaces";



type InputType = {
    payload: appModelSchema;
    pk: string;
  };
export const create = async (data: InputType)=>{
    return Models.AppModel.create(data.payload);
}

export const update = (data:InputType) => {
    const { payload, pk } = data;
    if(payload[pk] == undefined){
        throw new Error(`${pk} is undefined`);
    }
  
    return Models.AppModel.update(payload,{
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
  
    return Models.AppModel.destroy({
        where:{
            [pk]:payload[pk]
        }
    });
}


export const getOne = (data) => {
    console.log(data);
    const { payload, pk } = data;
    return Models.AppModel.findOne({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  
  export const getMany = (data) => {
    const { payload, pk } = data;
    return Models.AppModel.findAll({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  