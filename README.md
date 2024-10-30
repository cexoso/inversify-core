# 基于 inversify 构建程序内核

这是一个使用 demo，用于演示使用 inversify + vue/reactivity 来构建框架无关的程序内核，这个仓库演示的只有逻辑是同构，渲染并不是同构的。

我将程序的内核逻辑叫 core，渲染叫 shell。shell 的作用是将 core 展示给用户，以及将用户的意图提交给 core 处理。

我有在知乎上分享过 https://zhuanlan.zhihu.com/p/3604866493, 这个仓库是文章的补充，用于更好的来说明逻辑层和视图层。

# 仓库结构

仓库使用 monorepo

- packages/core 文件夹保存的就是程序内核逻辑
- packages/react 是将 core 使用 react 的方式渲染
- packages/vue 是将 core 使用 vue 的方式渲染

# 体验地址

- [react](https://cexoso.github.io/inversify-core/react-app)
- [vue](https://cexoso.github.io/inversify-core/vue-app)
