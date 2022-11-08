export class Cell {
    constructor (
        public type: string,
        public text: string,
        public questionNumber: number[],
        public isDisable: boolean
    ) { }
}