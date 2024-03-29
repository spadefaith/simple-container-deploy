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
}, payload:any,query:{
    dep:string
})=>{
    
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

    if(params.repo != parse.name){
        throw new Error(`pass not the repo`);
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

    console.log(66,shellOpts);

    shell.cd(find.root_path);
    executeCmd(shellOpts,find.root_path,  `git pull origin ${parse.branch}`);

    shell.cd(find.compose_path);
    executeCmd(shellOpts,find.compose_path,  `docker compose down`);
    executeCmd(shellOpts,find.compose_path,  `docker compose build --no-cache ${query.dep || ''}`);
    executeCmd(shellOpts,find.compose_path,  `docker compose up --build --force-recreate --no-deps -d ${query.dep || ''}`);
    // executeCmd(shellOpts,find.compose_path,  ` if [ ! $(docker images -qa -f 'dangling=true') ]; then echo "clean"; else docker rmi $(docker images -qa -f 'dangling=true');  fi`);
    // executeCmd(shellOpts,find.compose_path,  ` if [ ! $(docker ps -a -f  status=created -q) ]; then echo "clean"; else docker rm -v $(docker ps -a -f status=exited -f status=created -q);  fi`);
    executeCmd(shellOpts,find.compose_path,  "docker system prune -f");
    

    return true;

}



function executeCmd(env, path, command){
    const cmd = shell.exec(command, {
        ...env,
        cwd:path,
    });

    if(cmd.code  !== 0){
        throw new Error(cmd.stderr)
    }
}