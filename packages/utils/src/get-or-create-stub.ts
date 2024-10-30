import { stub, SinonStub } from "sinon";
type StubHandler = any;
type key = string | symbol | number;
const instanceMap = new WeakMap<object, Map<key, StubHandler>>();

export const getOrCreateStub = <T extends Object, K extends keyof T>(
  service: T,
  name: K
) => {
  function getOrCreateInstanceMap() {
    let x = instanceMap.get(service);
    if (x === undefined) {
      x = new Map();
      instanceMap.set(service, x);
    }
    return x;
  }
  const methodMap = getOrCreateInstanceMap();
  function getOrCreateMethodStubhandler(methodMap: Map<key, StubHandler>) {
    let x = methodMap.get(name);
    if (x === undefined) {
      x = stub(service, name);
      methodMap.set(name, x);
    }
    return x;
  }
  type Value = T[K];
  type Method = Value extends (i: infer I) => infer O ? (i: I) => O : any;
  type Req = Parameters<Method>;
  type Res = ReturnType<Method>;
  const stubMethod = getOrCreateMethodStubhandler(methodMap);
  return stubMethod as SinonStub<Req, Res>;
};
