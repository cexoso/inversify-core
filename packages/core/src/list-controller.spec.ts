import { describe, it, expect } from "vitest";
import { createTestContainer } from ".";
import { ListController } from "./list-controller";

describe("list controller", () => {
  it("列表加载后，会展示可选的用户列表", async () => {
    const container = createTestContainer();
    const listController = container.get(ListController);
    expect(listController.userList).deep.eq(["junegunn", "gaearon", "benlesh"]);
    console.log("debugger 🐛 ", listController.currentUser.value);
  });
});
