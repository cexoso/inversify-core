<template>
  <div>
    <ul>
      <li
        v-for="(user, key) of userList"
        :style="style(key)"
        @click="() => changeSelectIndex(key)"
      >
        {{ user }}
      </li>
    </ul>
    <div>
      <h1>当前选中的用户</h1>
      <div>
        <span> {{ userName }} </span>
        <div>
          <img v-if="avatar" :src="avatar" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CSSProperties, computed } from "vue";
import { ListController } from "core";
import { useInject } from "../hooks/use-inject";
const listController = useInject(ListController);
listController.load();
const { userList, userName, avatar, changeSelectIndex } = listController;
const style = computed(() => {
  const selectIndex = listController.selectIndex.value;
  return (currentkey: number) => {
    const css: CSSProperties = {
      listStyle: "none",
      padding: "4px 0",
      fontSize: "20px",
    };
    if (selectIndex === currentkey) {
      css.color = "red";
    }
    return css;
  };
});
</script>
