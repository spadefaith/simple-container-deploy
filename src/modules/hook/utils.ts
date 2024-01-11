export const parseBitbucket = (json)=>{
  console.log("parseBitbucket",JSON.stringify(json || {}, null, 4))
  let {
    push:{
      changes:[
        {
          new:{
            name:branch, 
            target:{
              message
            }
          }
        }
      ]
    },
    actor:{
      display_name:name
    }
  } = json;


  return {branch,message,name};
}

export const parseGithub = (json)=>{
  console.log("parseGithub",JSON.stringify(json || {}, null, 4))
  let {ref, pusher:{name}, commits:[{message}]} = json;
  let branch = ref.split('/')[2];
  return {branch,name,message};
}

export const parseGitlab = (json)=>{
  console.log("parseGitlab",JSON.stringify(json || {}, null, 4))
  let {ref, user_username:name, commits:[{message}]} = json;
  let branch = ref.split('/')[2];
  return {branch,name,message};
}

export const parseJson = (json)=>{
  console.log("parseJson",JSON.stringify(json || {}, null, 4))
  return {
    branch:json.branch,
    name:json.name,
    message:json.message
};
}


export const getProvider = (repo)=>{
  if(!repo){
    return "json";
  }
  if(repo.includes("bitbucket")){
    return "bitbucket"
  } else if (repo.includes('github')){
    return "github"
  } else if (repo.includes('gitlab')){
    return "gitlab"
  }
}