export function proxify<T extends object>(o: T): T {
  const handler: ProxyHandler<T> = {
    set: (target, property, value) => {
      console.log(`old ${property}: ${target[property]}`);
      console.log(`new ${property}: ${value}`);
      return true;
    }
  };
  return new Proxy<T>(o, handler);
}
