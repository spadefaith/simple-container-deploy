require('dotenv').config('../');

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const BASE_URL = process.env.BASE_URL;


const AppConfig = (env?)=>{


    return {
        development:{
            PORT,
            HOOK_BASE_URL:`${BASE_URL}/api/client/hook/receive`
        },
        staging:{
            PORT,
            HOOK_BASE_URL:`${BASE_URL}/api/client/hook/receive`
        },
        production:{
            PORT,
            HOOK_BASE_URL:`${BASE_URL}/api/client/hook/receive`
        },
    }[env || NODE_ENV]
};

export default AppConfig;