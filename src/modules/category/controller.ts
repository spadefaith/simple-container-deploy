import Models from "../../../db/models";
import { categoryModelSchema } from "../../interfaces";



type InputType = {
    payload: categoryModelSchema;
    pk: string;
  };
export const create = async (data: InputType)=>{
    return Models.CategoryModel.create(data.payload);
}

export const update = (data:InputType) => {
    const { payload, pk } = data;
    if(payload[pk] == undefined){
        throw new Error(`${pk} is undefined`);
    }
  
    return Models.CategoryModel.update(payload,{
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
  
    return Models.CategoryModel.destroy({
        where:{
            [pk]:payload[pk]
        }
    });
}


export const getOne = (data) => {
    console.log(data);
    const { payload, pk } = data;
    return Models.CategoryModel.findOne({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  
  export const getMany = (data) => {
    const { payload, pk } = data;
    return Models.CategoryModel.findAll({
      raw: true,
      where: {
        [pk]: payload[pk],
      },
    });
  };
  