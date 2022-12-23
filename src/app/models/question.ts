export interface Question {    
    id: number;
    answer: string;
    question: string;
    type: string;
    audio: {
        audio: string;
    };
    image: {
        image: string;
    }
}