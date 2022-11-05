import { Question } from "./question";
import { Scanword } from "./scanword";

export interface ScanwordQuestion {
    scanword : Scanword;
    question: Question;
    direction: boolean;
    number: number;
    x: number;
    y: number;
}