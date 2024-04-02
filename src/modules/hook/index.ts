import OpenApiMiddleware from "../../middlewares/OpenApiMiddleware";
import ValidateMiddleware from "../../middlewares/ValidateMiddleware";
import { receiveHook } from "./controller";
import { parseBitbucket, parseGithub, parseGitlab, parseJson } from "./utils";

const store = {};
const queue = [];

const express = require("express");
const HookModule = express.Router();
const joi = require("joi");

HookModule.post("/receive/:type/:repo/:current_branch", [
  OpenApiMiddleware.path({
    summary: "hook",
    tags: ["hook"],
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "number" },
                data: { type: "boolean" },
              },
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {},
          },
        },
      },
    },
  }),
  ValidateMiddleware.params(
    joi.object({
      repo: joi.string(),
      current_branch: joi.string(),
      type: joi.string(),
    })
  ),
  async (req, res, next) => {
    try {
      /**
       * trigger after 5mins
       */
      const time = req.query.timeout || 300000;
      const name = `${req.params.type}-${req.params.repo}-${req.params.current_branch}`;

      const params = req.params;
      const payload = req.body;
      const query = req.query;

      let parse: {
        branch?: string;
        message?: string;
        name?: string;
      } = {};
      if (params.type == "bitbucket") {
        parse = parseBitbucket(payload);
      } else if (params.type == "github") {
        parse = parseGithub(payload);
      } else if (params.type == "gitlab") {
        parse = parseGitlab(payload);
      } else if (params.type == "json") {
        parse = parseJson(payload);
      }

      if (!parse) {
        parse = {};
      }

      console.log(32, parse);

      if (params.current_branch != parse?.branch) {
        throw new Error(
          `pass branch is not the same, ${params.current_branch} != ${parse?.branch}`
        );
      }

      if (params.repo != parse?.name) {
        throw new Error(`pass not the repo`);
      }

      queue.push({ name, params, payload, query, parse });

      res.json({ status: 1 });
    } catch (err) {
      next(err);
    }
  },
]);

let id: any = "";
function interval() {
  id = setInterval(() => recurse(), 10000);
  console.log(`run the cron ${id}`);
}
interval();

function recurse() {
  const conf: {
    params: any;
    payload: any;
    query: any;
    parse: any;
    name: string;
  } = queue[0] || {};
  queue.shift();

  console.log(111, `current cron id ${id}`, conf);

  if (conf.params && conf.payload && conf.query && conf.parse && conf.name) {
    /**
     * stop the cron
     */
    console.log(`cron id ${id} has stopped`);
    clearInterval(id);

    receiveHook(conf.params, conf.payload, conf.query, conf.parse)
      .then((res) => {
        console.log(11, res);
        console.log(`stop execute ${conf.name}`);

        /**
         * rerun the cron
         */
        interval();
      })
      .catch((err) => {
        console.log(err);
        console.log(`failed execute ${conf.name}`);
        /**
         * rerun the cron
         */
        interval();
      });
  }
}

export default HookModule;
