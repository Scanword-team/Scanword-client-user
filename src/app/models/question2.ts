export interface Question {
    id: number;
    answer: string;
    question: string;
    type: string;
    x: number;
    y: number;
    direction: boolean;
    image: string;
    audio: string;
}