import { injectable, inject } from "inversify";
// 采用 @vue/reactivity 是因为现有前端没有一个好用且独立的状态库
// 这里可以使用 rxjs 代替 @vue/reactivity，但会导致代码理解成本上升
// 更期望新的 signals 成为标准后，可以使用 singlas 来承担状态的数据结构
import { shallowRef, computed } from "@vue/reactivity";
import { UserInfo, UserInfoService } from "./users-info-service";

@injectable()
export class ListController {
  constructor(
    @inject(UserInfoService) private userInfoService: UserInfoService
  ) {}
  userList = ["junegunn", "gaearon", "benlesh"];

  #selectIndex = shallowRef(-1);
  // 希望保持单向数据流
  selectIndex = computed(() => this.#selectIndex.value);

  changeSelectIndex = async (nextIndex: number) => {
    if (this.#selectIndex.value === nextIndex) {
      return;
    }
    this.#selectIndex.value = nextIndex;
    await this.updateCurrentUser();
  };

  // 可以封装, 不开放所有的细节
  private currentUserInfo = shallowRef<UserInfo>();

  // 而是通过更精细化的字段来导致明确的接口
  userName = computed(() => this.currentUserInfo.value?.name ?? "");
  avatar = computed(() => this.currentUserInfo.value?.avatar_url ?? "");

  private async updateCurrentUser() {
    const index = this.#selectIndex.value;
    const name = this.userList[index];
    this.currentUserInfo.value = undefined;
    this.userInfoService.getUserInfoByName(name).then((res) => {
      if (this.#selectIndex.value === index) {
        // 防止数据请求竞态
        this.currentUserInfo.value = res;
      }
    });
  }

  async load() {
    await this.changeSelectIndex(0);
  }
}
