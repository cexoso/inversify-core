<template>
  <slot> </slot>
</template>
<script lang="ts" setup>
import { createProdContainer } from "core";
import { provideContainer } from "./hooks/use-inject";
import { PropType } from "vue";

type Container = ReturnType<typeof createProdContainer>;
const props = defineProps({
  container: {
    type: Function as PropType<() => Container>,
  },
});
const container = props.container ? props.container() : createProdContainer();
provideContainer(container);
</script>
