import { createProdContainer } from "core";
import { Env } from "../hooks/use-inject";
import { List } from "./pages/list";
import { useRef } from "react";
import { Container } from "inversify";

const useProdContainer = () => {
  const ref = useRef<Container>();
  if (ref.current === undefined) {
    ref.current = createProdContainer();
  }
  return ref;
};

export const App = () => {
  const prodContainer = useProdContainer();
  return (
    <Env container={prodContainer.current!}>
      <List />
    </Env>
  );
};
