import { Question } from "./question";
import { Scanword } from "./scanword";

export interface ScanwordQuestion {
    scanword : Scanword;
    question: Question;
    direction: boolean;
    x: number;
    y: number;
}