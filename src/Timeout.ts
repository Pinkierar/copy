export class Timeout {
  private readonly limit: number;
  private readonly start: number;

  public constructor(limit: number) {
    this.limit = limit;
    this.start = performance.now();
  }

  public isTimeout(): boolean {
    const time = performance.now();
    const difference = time - this.start;

    return difference >= this.limit;
  }
}