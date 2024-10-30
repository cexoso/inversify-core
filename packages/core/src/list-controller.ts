import { injectable, inject } from "inversify";
// 采用 @vue/reactivity 是因为现有前端没有一个好用且独立的状态库
// 这里可以使用 rxjs 代替 @vue/reactivity，但会导致代码理解成本上升
// 更期望新的 signals 成为标准后，可以使用 singlas 来承担状态的数据结构
import { shallowRef, computed } from "@vue/reactivity";
import { UserInfoService } from "./users-info-service";

@injectable()
export class ListController {
  constructor(
    @inject(UserInfoService) private userInfoService: UserInfoService
  ) {}
  userList = ["junegunn", "gaearon", "benlesh"];

  #selectIndex = shallowRef(0);

  // 表示当前选中的用户详细信息的描述
  currentUser = computed(() => {
    this.userInfoService.getUserInfoByName()
    const user = shallowRef()
    const index = this.#selectIndex.value;
    const name = this.userList[index];
    console.log("debugger 🐛 name", name);
  });

  async load() {
    console.log("debugger 🐛 1", 1);
  }
}
