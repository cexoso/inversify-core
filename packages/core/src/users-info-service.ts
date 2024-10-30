import { injectable, inject } from "inversify";

type Fetch = typeof fetch;
export interface UserInfo {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

@injectable()
export class UserInfoService {
  constructor(@inject("fetch") private fetch: Fetch) {}
  public async getUserInfoByName(name: string): Promise<UserInfo> {
    // 这里使用依赖注入的方式使用 fetch，而不是直接的使用 window.fetch，是希望对于不同的环境可以注入
    // 不同的 fetch 实例，对于单元测试环境是不希望真实的发送请求的。在这里 fetch 就属于 humble object
    // 它是测试的边界
    return this.fetch(`https://api.github.com/users/${name}`).then((res) =>
      res.json()
    );
  }
}
