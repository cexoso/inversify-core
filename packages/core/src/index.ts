import "reflect-metadata";
import { Container } from "inversify";
import { createMemoryHistory, createBrowserHistory } from "history";
import { ListController } from "./list-controller";
import { detailController } from "./detail-controller";
import { UserInfoService } from "./users-info-service";

const createBaseContainer = () => {
  const container = new Container();
  container.bind(ListController).toSelf().inSingletonScope();
  container.bind(detailController).toSelf().inSingletonScope();
  container.bind(UserInfoService).toSelf().inSingletonScope();
  return container;
};

export const createProdContainer = () => {
  const container = createBaseContainer();
  const browserHistory = createBrowserHistory();
  // 真实的生产玩意，history 是浏览器路由，对 history 的操作会真实的操作到浏览器路由上
  container.bind("history").toConstantValue(browserHistory);
  container.bind("fetch").toConstantValue(window.fetch);
  return container;
};

export const createTestContainer = () => {
  const container = createBaseContainer();
  const memoryHistory = createMemoryHistory();
  // 对于单元测试环境，history 采用内存路由，因为浏览器路由是单实例的，内存路由是多实例的
  container.bind("history").toConstantValue(memoryHistory);
  container.bind("fetch").toConstantValue((...o: any) => {
    console.log("debugger 🐛 ..o", ...o);
    return Promise.reject(new Error("在测试环境你应该 mock 掉该请求"));
  });
  return container;
};
