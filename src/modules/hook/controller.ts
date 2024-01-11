import Models from "../../../db/models";
import { appModelSchema } from "../../interfaces";
import { restructEnv } from "../../utils";
import { getProvider, parseBitbucket, parseGithub, parseGitlab, parseJson } from "./utils";

const shell = require('shelljs');
const path = require('path');
const fs = require('fs');


export const receiveHook = async (params:{
    type:string,
    current_branch:string,
    repo:string
}, payload:any)=>{
    
    let parse: {
        branch?:string,
        message?:string,
        name?:string
    } = {};
    if(params.type == 'bitbucket'){
        parse = parseBitbucket(payload)
    } else if(params.type == 'github'){
        parse = parseGithub(payload)
    } else if(params.type == 'gitlab'){
        parse = parseGitlab(payload)
    } else if (params.type == 'json'){
        parse = parseJson(payload);
    };

    console.log(32,parse);

    if(params.current_branch != parse.branch){
        throw new Error(`pass branch is not the same, ${params.current_branch} != ${parse.branch}`);
    }

    const find: appModelSchema =await Models.AppModel.findOne({
        raw:true,
        where:{
            name:parse.name,
            branch:parse.branch,
        }
    });

    if(!find){
        throw new Error(`not found`);
    }

    if(!fs.existsSync(find.compose_path)){
        throw new Error('not found')
    }

    const shellOpts:any = { };
    const restruct = await restructEnv(find);
    if(restruct){
        shellOpts.env = restruct;
    }

    shell.cd(find.root_path);
    const pull = shell.exec(`git pull origin ${parse.branch}`, {
        ...shellOpts,
        cwd:find.root_path
    });

    if(pull.code != 0){
        throw new Error('error in pulling repo');
    };

    shell.cd(find.compose_path);
    const deploy = shell.exec(`docker-compose down  && docker-compose up --build -d`, {
        ...shellOpts,
        cwd:find.compose_path,
    });

    if(deploy.code  !== 0){
        throw new Error(deploy.stderr)
    }

    return true;

}