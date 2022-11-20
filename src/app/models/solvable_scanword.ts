import { Question } from "./question";
import { Scanword } from "./scanword";
import { RegisterUser } from "./register_user";
export interface SolvableScanword {
    id: number;
    owner: RegisterUser;
    solved: boolean;
    prompt: number;
    solvedQuestions: Array<Question>;
}


