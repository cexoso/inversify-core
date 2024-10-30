import { provide, inject } from 'vue'
import type { Container, interfaces } from 'inversify'

const inversifyContainerKey = 'inversify-container'

export const provideContainer = (container: Container) => {
  provide(inversifyContainerKey, container)
}

export const useInject = <T>(Model: interfaces.ServiceIdentifier<T>) => {
  const container = inject<Container>(inversifyContainerKey)
  if (container === undefined) {
    throw new Error('useInject 需要父容器使用 provideContainer 来提供值')
  }

  if (import.meta.hot && !container.isBound(Model)) {
    // 用于修复 HMR 问题的
    container.bind(Model).toSelf().inSingletonScope()
  }

  const model = container.get(Model)
  return model
}
