import {
  createContext,
  FC,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import type { interfaces } from "inversify";
import { createProdContainer } from "core";
import { Ref, watch } from "@vue/reactivity";

type Container = ReturnType<typeof createProdContainer>;

const ContainerContext = createContext<Container>(undefined as any);

export const Env: FC<{
  container: Container;
  children: ReactNode;
}> = (props) => {
  return (
    <ContainerContext.Provider value={props.container}>
      {props.children}
    </ContainerContext.Provider>
  );
};

export function useInject<T>(Model: interfaces.ServiceIdentifier<T>) {
  const container = useContext(ContainerContext);
  if (container === undefined) {
    throw new Error("useInject 需要父容器使用 provideContainer 来提供值");
  }

  if (import.meta.hot && !container.isBound(Model)) {
    // 用于修复 HMR 问题的
    container.bind(Model).toSelf().inSingletonScope();
  }

  const model = container.get(Model);
  return model;
}

// 连接 vue 的响应式
export function useVueRef<T>(ref: Ref<T>) {
  const [state, setState] = useState<T>(undefined as T);
  useEffect(() => {
    const unwatch = watch(
      [ref],
      ([nextValue]) => {
        setState(nextValue);
      },
      { immediate: true }
    );
    return () => unwatch();
  }, [ref]);
  return state;
}
