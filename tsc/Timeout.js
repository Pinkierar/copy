export class Timeout {
    limit;
    start;
    constructor(limit) {
        this.limit = limit;
        this.start = performance.now();
    }
    isTimeout() {
        const time = performance.now();
        const difference = time - this.start;
        return difference >= this.limit;
    }
}
