import { BitbucketMergePayloadType } from "../../types/bitbucket-merge-payload";
import { BitbucketPushPayloadType } from "../../types/bitbucket-push-payload";

export const parseBitbucket = (json) => {
  // console.log("parseBitbucket", JSON.stringify(json, null, 4));
  let branch, message, name, user;

  if (json.pullrequest) {
    const d = json as BitbucketMergePayloadType;

    branch = d?.pullrequest?.destination?.branch?.name;
    message = `merge to ${branch}`;
    name = d?.repository?.name;
    user = d?.actor?.display_name;
  } else if (json.push) {
    const d = json as BitbucketPushPayloadType;
    const changes = (d?.push?.changes || [])[0];

    if (changes) {
      branch = changes?.new?.name;
      message = changes?.new?.target?.message;
      name = d?.repository?.name;
      user = d?.actor?.display_name;
    }
  }

  // console.log(
  //   "parsedBitbucket",
  //   JSON.stringify({ branch, message, name, user }, null, 4)
  // );

  return { branch, message, name, user };
};

export const parseGithub = (json) => {
  console.log("parseGithub", JSON.stringify(json || {}, null, 4));
  let {
    ref,
    pusher: { name: username },
    repository: { name },
    commits: [{ message }],
  } = json;
  let branch = ref.split("/")[2];
  return { branch, name, message };
};

export const parseGitlab = (json) => {
  console.log("parseGitlab", JSON.stringify(json || {}, null, 4));
  let {
    ref,
    user_username: name,
    commits: [{ message }],
  } = json;
  let branch = ref.split("/")[2];
  return { branch, name, message };
};

export const parseJson = (json) => {
  console.log("parseJson", JSON.stringify(json || {}, null, 4));
  return {
    branch: json.branch,
    name: json.name,
    message: json.message,
  };
};

export const getProvider = (repo) => {
  if (!repo) {
    return "json";
  }
  if (repo.includes("bitbucket")) {
    return "bitbucket";
  } else if (repo.includes("github")) {
    return "github";
  } else if (repo.includes("gitlab")) {
    return "gitlab";
  }
};
