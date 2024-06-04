import Models from "../../../db/models";
import { appModelSchema } from "../../interfaces";

type InputType = {
  payload: appModelSchema;
  pk: string;
};
export const create = async (data: InputType) => {
  return Models.AppModel.create(data.payload);
};

export const update = (data: InputType) => {
  const { payload, pk } = data;
  if (payload[pk] == undefined) {
    throw new Error(`${pk} is undefined`);
  }

  return Models.AppModel.update(payload, {
    where: {
      [pk]: payload[pk],
    },
  });
};

export const remove = (data: InputType) => {
  const { payload, pk } = data;

  if (payload[pk] == undefined) {
    throw new Error(`${pk} is undefined`);
  }

  return Models.AppModel.destroy({
    where: {
      [pk]: payload[pk],
    },
  });
};

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

export const getMany = async () => {
  const apps = await Models.AppModel.findAll({
    raw: true,
  });

  return Promise.all(
    apps.map(async (item) => {
      let env = await Models.EnvModel.findAll({
        raw: true,
        where: {
          app_id: item.app_id,
        },
      });

      env = env.reduce((accu, iter) => {
        accu[iter.prop_key] = iter.prop_value;

        return accu;
      }, {});

      item.env = env;

      return item;
    })
  );
};
