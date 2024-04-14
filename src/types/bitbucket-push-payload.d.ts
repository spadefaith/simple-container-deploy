export interface BitbucketPushPayloadType {
  push: Push;
  repository: Repository;
  actor: Actor;
}

export interface Push {
  changes: Change[];
}

export interface Change {
  old: Old;
  new: New;
  truncated: boolean;
  created: boolean;
  forced: boolean;
  closed: boolean;
  links: Links9;
  commits: Commit[];
}

export interface Old {
  name: string;
  target: Target;
  links: Links4;
  type: string;
  merge_strategies: string[];
  default_merge_strategy: string;
}

export interface Target {
  type: string;
  hash: string;
  date: string;
  author: Author;
  message: string;
  summary: Summary;
  links: Links2;
  parents: Parent[];
  rendered: Rendered;
  properties: Properties;
}

export interface Author {
  type: string;
  raw: string;
  user: User;
}

export interface User {
  display_name: string;
  links: Links;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links {
  self: Self;
  avatar: Avatar;
  html: Html;
}

export interface Self {
  href: string;
}

export interface Avatar {
  href: string;
}

export interface Html {
  href: string;
}

export interface Summary {
  type: string;
  raw: string;
  markup: string;
  html: string;
}

export interface Links2 {
  self: Self2;
  html: Html2;
}

export interface Self2 {
  href: string;
}

export interface Html2 {
  href: string;
}

export interface Parent {
  hash: string;
  links: Links3;
  type: string;
}

export interface Links3 {
  self: Self3;
  html: Html3;
}

export interface Self3 {
  href: string;
}

export interface Html3 {
  href: string;
}

export interface Rendered {}

export interface Properties {}

export interface Links4 {
  self: Self4;
  commits: Commits;
  html: Html4;
}

export interface Self4 {
  href: string;
}

export interface Commits {
  href: string;
}

export interface Html4 {
  href: string;
}

export interface New {
  name: string;
  target: Target2;
  links: Links8;
  type: string;
  merge_strategies: string[];
  default_merge_strategy: string;
}

export interface Target2 {
  type: string;
  hash: string;
  date: string;
  author: Author2;
  message: string;
  summary: Summary2;
  links: Links6;
  parents: Parent2[];
  rendered: Rendered2;
  properties: Properties2;
}

export interface Author2 {
  type: string;
  raw: string;
  user: User2;
}

export interface User2 {
  display_name: string;
  links: Links5;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links5 {
  self: Self5;
  avatar: Avatar2;
  html: Html5;
}

export interface Self5 {
  href: string;
}

export interface Avatar2 {
  href: string;
}

export interface Html5 {
  href: string;
}

export interface Summary2 {
  type: string;
  raw: string;
  markup: string;
  html: string;
}

export interface Links6 {
  self: Self6;
  html: Html6;
}

export interface Self6 {
  href: string;
}

export interface Html6 {
  href: string;
}

export interface Parent2 {
  hash: string;
  links: Links7;
  type: string;
}

export interface Links7 {
  self: Self7;
  html: Html7;
}

export interface Self7 {
  href: string;
}

export interface Html7 {
  href: string;
}

export interface Rendered2 {}

export interface Properties2 {}

export interface Links8 {
  self: Self8;
  commits: Commits2;
  html: Html8;
}

export interface Self8 {
  href: string;
}

export interface Commits2 {
  href: string;
}

export interface Html8 {
  href: string;
}

export interface Links9 {
  commits: Commits3;
  diff: Diff;
  html: Html9;
}

export interface Commits3 {
  href: string;
}

export interface Diff {
  href: string;
}

export interface Html9 {
  href: string;
}

export interface Commit {
  type: string;
  hash: string;
  date: string;
  author: Author3;
  message: string;
  summary: Summary3;
  links: Links11;
  parents: Parent3[];
  rendered: Rendered3;
  properties: Properties3;
}

export interface Author3 {
  type: string;
  raw: string;
  user: User3;
}

export interface User3 {
  display_name: string;
  links: Links10;
  type: string;
  uuid: string;
  account_id: string;
  nickname?: string;
  created_on?: string;
  account_status?: string;
  kind?: string;
}

export interface Links10 {
  self?: Self9;
  avatar: Avatar3;
  html?: Html10;
}

export interface Self9 {
  href: string;
}

export interface Avatar3 {
  href: string;
}

export interface Html10 {
  href: string;
}

export interface Summary3 {
  type: string;
  raw: string;
  markup: string;
  html: string;
}

export interface Links11 {
  self: Self10;
  html: Html11;
  diff: Diff2;
  approve: Approve;
  comments: Comments;
  statuses: Statuses;
  patch?: Patch;
}

export interface Self10 {
  href: string;
}

export interface Html11 {
  href: string;
}

export interface Diff2 {
  href: string;
}

export interface Approve {
  href: string;
}

export interface Comments {
  href: string;
}

export interface Statuses {
  href: string;
}

export interface Patch {
  href: string;
}

export interface Parent3 {
  hash: string;
  links: Links12;
  type: string;
}

export interface Links12 {
  self: Self11;
  html: Html12;
}

export interface Self11 {
  href: string;
}

export interface Html12 {
  href: string;
}

export interface Rendered3 {}

export interface Properties3 {}

export interface Repository {
  type: string;
  full_name: string;
  links: Links13;
  name: string;
  scm: string;
  website: any;
  owner: Owner;
  workspace: Workspace;
  is_private: boolean;
  project: Project;
  uuid: string;
  parent: any;
}

export interface Links13 {
  self: Self12;
  html: Html13;
  avatar: Avatar4;
}

export interface Self12 {
  href: string;
}

export interface Html13 {
  href: string;
}

export interface Avatar4 {
  href: string;
}

export interface Owner {
  display_name: string;
  links: Links14;
  type: string;
  uuid: string;
  username: string;
}

export interface Links14 {
  self: Self13;
  avatar: Avatar5;
  html: Html14;
}

export interface Self13 {
  href: string;
}

export interface Avatar5 {
  href: string;
}

export interface Html14 {
  href: string;
}

export interface Workspace {
  type: string;
  uuid: string;
  name: string;
  slug: string;
  links: Links15;
}

export interface Links15 {
  avatar: Avatar6;
  html: Html15;
  self: Self14;
}

export interface Avatar6 {
  href: string;
}

export interface Html15 {
  href: string;
}

export interface Self14 {
  href: string;
}

export interface Project {
  type: string;
  key: string;
  uuid: string;
  name: string;
  links: Links16;
}

export interface Links16 {
  self: Self15;
  html: Html16;
  avatar: Avatar7;
}

export interface Self15 {
  href: string;
}

export interface Html16 {
  href: string;
}

export interface Avatar7 {
  href: string;
}

export interface Actor {
  display_name: string;
  links: Links17;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links17 {
  self: Self16;
  avatar: Avatar8;
  html: Html17;
}

export interface Self16 {
  href: string;
}

export interface Avatar8 {
  href: string;
}

export interface Html17 {
  href: string;
}
