import { Value, ValueComplex } from './Value.js';
import { NodeComplex } from './Node.js';
export function clone(obj) {
    // Примитивы не имеют вложенности
    if (!Value.isComplex(obj))
        return obj;
    const rootNode = NodeComplex.createRoot(new ValueComplex(obj));
    let parent = rootNode;
    let current = null;
    while (true) {
        if (parent.value.isEmpty() || current?.isLast()) {
            if (parent === rootNode)
                break;
            current = parent;
            parent = current.parent;
            continue;
        }
        if (current === null) {
            current = parent.getFirstChild();
        }
        else {
            current = parent.getChildAfter(current.keyIndex);
        }
        if (current instanceof NodeComplex) {
            parent.clone.set(current.keyName, current.clone);
            parent = current;
            current = null;
        }
        else {
            parent.clone.set(current.keyName, current.value);
        }
    }
    return rootNode.clone.value;
}
