import localForage from "localforage";

localForage.config({
  driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: "JTerminal",
  version: 1.0,
  storeName: "terminal_store",
  description: "JTerminal store",
});

const localforage = localForage.createInstance({ name: "JTerminal" });

export { localforage };
