import Models from "../../../db/models";
import { appModelSchema } from "../../interfaces";
import shell from "shelljs";
import path from "path";
import fs from "fs";
import { restructEnv } from "../../utils";
import { Op } from "sequelize";

type InputType = {
  payload: appModelSchema & { env: string };
  pk: string;
};

const PWD = process.env.PWD;

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

export const remove = async (data: InputType) => {
  try {
    const { payload, pk } = data;

    if (payload[pk] == undefined) {
      throw new Error(`${pk} is undefined`);
    }

    const app = await Models.AppModel.findOne({
      raw: true,
      where: {
        app_id: payload.app_id,
        name: payload.name,
        branch: payload.branch,
      },
    });
    if (!app) {
      throw new Error("app not found");
    }

    const e = await Models.EnvModel.findOne({
      raw: true,
      where: {
        prop_key: "NODE_ENV",
        prop_value: payload.env,
        app_id: app.app_id,
      },
    });

    if (!e) {
      throw new Error("ENV not found");
    }

    /**
     * 1. down container
     * 2. delete record
     * 3. remove dir
     */

    /**
     * 1. down container
     */

    const envs = await restructEnv(app);

    const { root_path: root, app_id } = app;

    shell.cd(root);
    shell.exec("pwd");
    shell.exec("ls -alt");
    const deploy = await shell.exec(`docker compose down `, {
      cwd: root,
      env: envs,
    });

    if (deploy.code !== 0) {
      throw new Error(deploy.stderr);
    }

    await shell.exec("docker system prune -f");

    /**
     * 2. delete record
     */

    await Models.EnvModel.destroy({
      where: {
        app_id: app_id,
      },
    });

    await Models.AppModel.destroy({
      where: {
        app_id: app_id,
      },
    });

    /**
     * remove dir
     */

    fs.existsSync(root) && fs.rmSync(root, { recursive: true, force: true });

    process.chdir(PWD);

    return true;
  } catch (err) {
    process.chdir(PWD);

    throw err;
  }
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

export const getMany = async (query) => {
  if (query.name) {
    query.name = {
      [Op.like]: `%${query.name}%`,
    };
  }
  const apps = await Models.AppModel.findAll({
    raw: true,
    where: query,
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
