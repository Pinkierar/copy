import {Value, ValueComplex} from './Value.js';
import {NodeComplex, NodeSimple} from './Node.js';
import {Timeout} from './Timeout.js';

export function clone<T>(value: T, timeLimit: number = 3000): T {
  // Примитивы не имеют вложенности
  if (!Value.isComplex(value)) return value;

  const timeout = new Timeout(timeLimit);

  const rootNode = NodeComplex.createRoot(new ValueComplex(value));

  let parent: NodeComplex = rootNode;
  let current: NodeSimple | NodeComplex | null = null;

  while (true) {
    if (timeout.isTimeout()) throw new Error('time out');

    if (parent.value.isEmpty() || current?.isLast()) {
      if (parent === rootNode) break;

      current = parent;
      parent = current.parent;
      continue;
    }

    if (current === null) {
      current = parent.getFirstChild();
    } else {
      current = parent.getChildAfter(current.keyIndex);
    }

    if (current instanceof NodeComplex) {
      parent.clone.set(current.keyName, current.clone);

      parent = current;
      current = null;
    } else {
      parent.clone.set(current.keyName, current.value);
    }
  }

  return rootNode.clone.value as T;
}