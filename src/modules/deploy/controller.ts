import { isPortFree, toEnv } from "./utils";

const shell = require('shelljs');
const path = require('path');
const fs = require('fs');


export const create = async (name,data:{
    env:{
        NODE_ENV:string
        PORT:number
    },
    branch:string,
    repo:string
})=>{
    try {
        const appName = `${name}-${data.branch}`;
        const root = path.join(__dirname, `../../../../apps/${appName}`);
        const port = data.env.PORT;
        
        // if(port){
        //     const isFree = await isPortFree(port);
        //     console.log(isFree);
        // }
    
    
    
        fs.rmSync(root, { recursive: true, force: true });
        fs.mkdirSync(root, { recursive: true });


        if(shell.exec(`git clone --branch ${data.branch} ${data.repo} ${root}`).code != 0){
            throw new Error('error in cloning repo');
        };
    
    
        
    
        const content = toEnv(data.env);
    
        fs.writeFileSync(`${root}/.env`,content);
    
    
        shell.cd(root);
        shell.exec(`docker-compose down  && docker-compose up --build -d`);

        return true;
    
    } catch(err){
        throw err;
    }

}