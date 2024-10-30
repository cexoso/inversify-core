import { Container } from "inversify";
import { UserInfoService } from "./users-info-service";
import { getOrCreateStub } from "utils";
export const mockBaseScene = (container: Container) => {
  const userInfoService = container.get(UserInfoService);
  const getUserInfoByNameStub = getOrCreateStub(
    userInfoService,
    "getUserInfoByName"
  );
  getUserInfoByNameStub.resolves({
    login: "junegunn",
    id: 700826,
    node_id: "MDQ6VXNlcjcwMDgyNg==",
    avatar_url: "https://avatars.githubusercontent.com/u/700826?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/junegunn",
    html_url: "https://github.com/junegunn",
    followers_url: "https://api.github.com/users/junegunn/followers",
    following_url:
      "https://api.github.com/users/junegunn/following{/other_user}",
    gists_url: "https://api.github.com/users/junegunn/gists{/gist_id}",
    starred_url: "https://api.github.com/users/junegunn/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/junegunn/subscriptions",
    organizations_url: "https://api.github.com/users/junegunn/orgs",
    repos_url: "https://api.github.com/users/junegunn/repos",
    events_url: "https://api.github.com/users/junegunn/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/junegunn/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    name: "Junegunn Choi",
    company: null,
    blog: "https://junegunn.github.io/",
    location: null,
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 151,
    public_gists: 37,
    followers: 7777,
    following: 0,
    created_at: "2011-03-31T05:09:54Z",
    updated_at: "2024-08-06T03:35:43Z",
  });
};
