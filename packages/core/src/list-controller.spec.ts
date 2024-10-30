import { describe, it, expect } from "vitest";
import { createTestContainer } from ".";
import { ListController } from "./list-controller";
import { mockBaseScene } from "./mocks";
import { getOrCreateStub } from "utils";
import { UserInfoService } from "./users-info-service";

describe("list controller", () => {
  it("列表加载后，会展示可选的用户列表", async () => {
    // 创建测试环境
    const container = createTestContainer();
    // mock 场景
    mockBaseScene(container);
    const userInfoService = container.get(UserInfoService);
    const getUserInfoByNameStub = getOrCreateStub(
      userInfoService,
      "getUserInfoByName"
    );
    const listController = container.get(ListController);
    expect(listController.userList).deep.eq(["junegunn", "gaearon", "benlesh"]);
    // 界面加载会调用 load 函数
    await listController.load();
    expect(getUserInfoByNameStub.firstCall.args).deep.eq(
      ["junegunn"],
      "可以断言请求参数"
    );
    expect(listController.userName.value).eq("Junegunn Choi");
    expect(listController.avatar.value).eq(
      "https://avatars.githubusercontent.com/u/700826?v=4"
    );
  });
});
