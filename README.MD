This repository contains a function for copying objects of any complexity, any nesting, with functions, or empty objects

## Use window.clone for cloning
#### Typification:
```typescript
clone<T>(object: T) => T
```
#### Example:
```typescript
const obj = {key1: {key2: 'value'}}
const cloned = clone(obj);
cloned.key1.key2 = 'MODIFIED';
console.log('obj', obj);
console.log('cloned', cloned);
```

## Use window.cloneTest for testing with logging
#### Typification:
```typescript
cloneTest(testName: string, object: any, modifier?: (cloned: any) => void) => void
```
#### Example:
```typescript
cloneTest('My test', {key1: {key2: 'value'}}, cloned => {
    cloned.key1.key2 = 'MODIFIED';
});
```