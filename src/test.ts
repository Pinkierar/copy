import {clone} from './clone.js';

export const test = (name: string, obj: any, modifier?: (cloned: any) => void): void => {
  console.group('Test', name);

  const cloned = clone(obj);
  modifier && modifier(cloned);

  console.groupCollapsed('Source object');
  console.dir(obj);
  console.groupEnd();

  console.groupCollapsed('The cloned object has been modified');
  console.dir(cloned);
  console.groupEnd();

  console.groupEnd();
};

// For Console
(globalThis as any).clone = clone;
(globalThis as any).cloneTest = test;