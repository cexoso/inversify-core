import 'reflect-metadata'
import { Container } from "inversify";
import { createMemoryHistory, createBrowserHistory } from "history";

export const createProdContainer = () => {
  const container = new Container();
  const browserHistory = createBrowserHistory();
  // 真实的生产玩意，history 是浏览器路由，对 history 的操作会真实的操作到浏览器路由上
  container.bind("history").toConstantValue(browserHistory);
  return container;
};

export const createTestContainer = () => {
  const container = createProdContainer();
  const memoryHistory = createMemoryHistory();
  // 对于单元测试环境，history 采用内存路由，因为浏览器路由是单实例的，内存路由是多实例的
  container.rebind("history").toConstantValue(memoryHistory);
  return container;
};
