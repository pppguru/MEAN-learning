export class Telephone {
    public id: string;
    constructor(public countryCode: string,
                public areaCode: string,
                public number: string,
                public extension: string)
    {}
}