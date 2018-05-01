export class Category {
    public id: string;
    public name: string;
    public selected: boolean = false;
    public percent: string;
    public chartData: any[] = new Array();
    public correct: number;
    public total: number;
}