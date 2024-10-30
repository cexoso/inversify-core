import { describe, it } from "vitest";
import { createTestContainer } from ".";
import { ListController } from "./list-controller";

describe("list controller", () => {
  it("列表加载后，会展示可选的用户列表", async () => {
    const container = createTestContainer();
    const listController = container.get(ListController);
    listController.load();
    console.log("debugger 🐛 1", 1);
  });
});
