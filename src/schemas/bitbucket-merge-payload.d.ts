export interface BitbucketMergePayloadType {
  repository: Repository;
  actor: Actor;
  pullrequest: Pullrequest;
}

export interface Repository {
  type: string;
  full_name: string;
  links: Links;
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

export interface Links {
  self: Self;
  html: Html;
  avatar: Avatar;
}

export interface Self {
  href: string;
}

export interface Html {
  href: string;
}

export interface Avatar {
  href: string;
}

export interface Owner {
  display_name: string;
  links: Links2;
  type: string;
  uuid: string;
  username: string;
}

export interface Links2 {
  self: Self2;
  avatar: Avatar2;
  html: Html2;
}

export interface Self2 {
  href: string;
}

export interface Avatar2 {
  href: string;
}

export interface Html2 {
  href: string;
}

export interface Workspace {
  type: string;
  uuid: string;
  name: string;
  slug: string;
  links: Links3;
}

export interface Links3 {
  avatar: Avatar3;
  html: Html3;
  self: Self3;
}

export interface Avatar3 {
  href: string;
}

export interface Html3 {
  href: string;
}

export interface Self3 {
  href: string;
}

export interface Project {
  type: string;
  key: string;
  uuid: string;
  name: string;
  links: Links4;
}

export interface Links4 {
  self: Self4;
  html: Html4;
  avatar: Avatar4;
}

export interface Self4 {
  href: string;
}

export interface Html4 {
  href: string;
}

export interface Avatar4 {
  href: string;
}

export interface Actor {
  display_name: string;
  links: Links5;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links5 {
  self: Self5;
  avatar: Avatar5;
  html: Html5;
}

export interface Self5 {
  href: string;
}

export interface Avatar5 {
  href: string;
}

export interface Html5 {
  href: string;
}

export interface Pullrequest {
  comment_count: number;
  task_count: number;
  type: string;
  id: number;
  title: string;
  description: string;
  rendered: Rendered;
  state: string;
  merge_commit: MergeCommit;
  close_source_branch: boolean;
  closed_by: ClosedBy;
  author: Author;
  reason: string;
  created_on: string;
  updated_on: string;
  destination: Destination;
  source: Source;
  reviewers: any[];
  participants: Participant[];
  links: Links14;
  summary: Summary;
}

export interface Rendered {
  title: Title;
  description: Description;
}

export interface Title {
  type: string;
  raw: string;
  markup: string;
  html: string;
}

export interface Description {
  type: string;
  raw: string;
  markup: string;
  html: string;
}

export interface MergeCommit {
  hash: string;
  links: Links6;
  type: string;
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

export interface ClosedBy {
  display_name: string;
  links: Links7;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links7 {
  self: Self7;
  avatar: Avatar6;
  html: Html7;
}

export interface Self7 {
  href: string;
}

export interface Avatar6 {
  href: string;
}

export interface Html7 {
  href: string;
}

export interface Author {
  display_name: string;
  links: Links8;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links8 {
  self: Self8;
  avatar: Avatar7;
  html: Html8;
}

export interface Self8 {
  href: string;
}

export interface Avatar7 {
  href: string;
}

export interface Html8 {
  href: string;
}

export interface Destination {
  branch: Branch;
  commit: Commit;
  repository: Repository2;
}

export interface Branch {
  name: string;
}

export interface Commit {
  hash: string;
  links: Links9;
  type: string;
}

export interface Links9 {
  self: Self9;
  html: Html9;
}

export interface Self9 {
  href: string;
}

export interface Html9 {
  href: string;
}

export interface Repository2 {
  type: string;
  full_name: string;
  links: Links10;
  name: string;
  uuid: string;
}

export interface Links10 {
  self: Self10;
  html: Html10;
  avatar: Avatar8;
}

export interface Self10 {
  href: string;
}

export interface Html10 {
  href: string;
}

export interface Avatar8 {
  href: string;
}

export interface Source {
  branch: Branch2;
  commit: Commit2;
  repository: Repository3;
}

export interface Branch2 {
  name: string;
}

export interface Commit2 {
  hash: string;
  links: Links11;
  type: string;
}

export interface Links11 {
  self: Self11;
  html: Html11;
}

export interface Self11 {
  href: string;
}

export interface Html11 {
  href: string;
}

export interface Repository3 {
  type: string;
  full_name: string;
  links: Links12;
  name: string;
  uuid: string;
}

export interface Links12 {
  self: Self12;
  html: Html12;
  avatar: Avatar9;
}

export interface Self12 {
  href: string;
}

export interface Html12 {
  href: string;
}

export interface Avatar9 {
  href: string;
}

export interface Participant {
  type: string;
  user: User;
  role: string;
  approved: boolean;
  state: string;
  participated_on: string;
}

export interface User {
  display_name: string;
  links: Links13;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links13 {
  self: Self13;
  avatar: Avatar10;
  html: Html13;
}

export interface Self13 {
  href: string;
}

export interface Avatar10 {
  href: string;
}

export interface Html13 {
  href: string;
}

export interface Links14 {
  self: Self14;
  html: Html14;
  commits: Commits;
  approve: Approve;
  "request-changes": RequestChanges;
  diff: Diff;
  diffstat: Diffstat;
  comments: Comments;
  activity: Activity;
  merge: Merge;
  decline: Decline;
  statuses: Statuses;
}

export interface Self14 {
  href: string;
}

export interface Html14 {
  href: string;
}

export interface Commits {
  href: string;
}

export interface Approve {
  href: string;
}

export interface RequestChanges {
  href: string;
}

export interface Diff {
  href: string;
}

export interface Diffstat {
  href: string;
}

export interface Comments {
  href: string;
}

export interface Activity {
  href: string;
}

export interface Merge {
  href: string;
}

export interface Decline {
  href: string;
}

export interface Statuses {
  href: string;
}

export interface Summary {
  type: string;
  raw: string;
  markup: string;
  html: string;
}
