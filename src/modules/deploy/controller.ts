import Models from "../../../db/models";
import AppConfig from "../../config";
import { appModelSchema } from "../../interfaces";
import LoopService from "../../services/LoopService";
import { restructEnv } from "../../utils";
import { getProvider } from "../hook/utils";
import { isPortFree, toEnv } from "./utils";

const shell = require("shelljs");
const path = require("path");
const fs = require("fs");

const config = AppConfig();

console.log(15, config);

export const create = async (
  name,
  data: {
    env: {
      NODE_ENV: string;
      PORT: number;
    };
    branch: string;
    repo: string;
    persist: boolean;
  }
) => {
  const appName = `${name}-${data.branch}`;
  const root = path.join(__dirname, `../../../../apps/${appName}`);

  fs.existsSync(root) && fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root, { recursive: true });

  shell.exec(`git stash`);
  shell.exec(`git stash drop`);
  const clone = shell.exec(
    `git clone --branch=${data.branch} ${data.repo} ${root} `
  );
  if (clone.code != 0) {
    console.log(`git clone --branch=${data.branch} ${data.repo} ${root} `);

    throw new Error(clone.stderr);
  }

  const envs = await persistData(name, root, data);
  console.log(40, root);
  console.log(41, envs);
  shell.cd(root);
  shell.exec("pwd");
  shell.exec("ls -alt");
  const deploy = await shell.exec(
    `docker compose down  && docker compose up --build -d `,
    {
      cwd: root,
      env: envs,
    }
  );

  if (deploy.code !== 0) {
    throw new Error(deploy.stderr);
  }

  await shell.exec("docker system prune -f");

  return true;
};

async function persistData(name, root, data) {
  let app = null;
  let envs: any = data.env || {};
  let isExisted = false;
  if (data.branch) {
    app = await Models.AppModel.findOne({
      raw: true,
      where: {
        branch: data.branch,
        name: name,
      },
    });

    /**
     * prevent replacing the existing app
     */
    if (app) {
      if (
        !(
          data.repo == app.repo &&
          (app.branch ? app.branch == data.branch : true)
        )
      ) {
        app = null;
      } else {
        isExisted = true;
      }
    }
  }

  if (data.persist) {
    const provider = getProvider(data.repo) || data.provider;

    if (!app) {
      const rec: appModelSchema = {
        branch: data.branch,
        name,
        compose_path: root,
        root_path: root,
        repo: data.repo,
        webhook_url: `${config.HOOK_BASE_URL}/${provider}/${name}/${data.branch}`,
      };

      app = await Models.AppModel.create(rec);
    } else {
      const rec: appModelSchema = {
        branch: data.branch,
        name,
        compose_path: root,
        root_path: root,
        repo: data.repo,
        webhook_url: `${config.HOOK_BASE_URL}/${provider}/${name}/${data.branch}`,
      };

      console.log(103, rec);

      await Models.AppModel.update(rec, {
        where: {
          branch: data.branch,
          name: name,
        },
      });
    }

    if (data?.env != undefined) {
      await Models.EnvModel.destroy({
        where: {
          app_id: app.app_id,
        },
      });

      if (Object.keys(data.env).length) {
        const restruct = Object.keys(data.env).map((key) => {
          return {
            prop_key: key,
            prop_value: data.env[key],
            app_id: app.app_id,
          };
        });

        await Models.EnvModel.bulkCreate(restruct);
      }
    }
  }

  if (app && app.app_id) {
    const restruct = await restructEnv(app);

    if (restruct) {
      envs = {
        ...restruct,
        ...envs,
      };
    }
  }

  const content = await toEnv(envs);

  await fs.writeFileSync(`${root}/.env`, content);

  console.log(135, fs.existsSync(`${root}/.env`));

  return envs;
}
