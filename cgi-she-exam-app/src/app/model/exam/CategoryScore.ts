export class CategoryScore {
    constructor() {}

    public name: string;
    public id: string;
    get data(): any[] {
        return [this.correct, this.total - this.correct];
    }
    public correct: number;
    public total: number;

    get percent(): string {
        if (this.total === 0)
            return '(0%)'

        return `(${Math.floor((this.correct / this.total * 100)).toString()})%`;
    }
}