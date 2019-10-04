import {Operand} from "./operand";

export class Executor {
    public url: string;
    public name: string;
    public operand: Operand;

    constructor(url: string, name: string, operand: Operand) {
        this.url = url;
        this.name = name;
        this.operand = operand;
    }

}