import { clone } from './clone.js';
export const test = (name, obj, modifier) => {
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
globalThis.clone = clone;
globalThis.cloneTest = test;
