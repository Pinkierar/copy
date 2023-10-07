type Key = string | number | symbol;
type Simple = null | undefined | Key | boolean | Function;
type Complex = { [key in Key]: Any } | Any[];
type Any = Complex | Simple;

// Примитивные: string | number | boolean | symbol | function | null | undefined
// Комплексные: array | object