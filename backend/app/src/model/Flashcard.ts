import mongoose, { Document } from 'mongoose';

interface IFlashcard extends Document {
    question: string;
    correctAnswers: string[]; // changed
    wrongAnswers: string[];
}

const FlashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    correctAnswers: { type: [String], required: true }, // changed
    wrongAnswers: { type: [String], required: true }
});

export default mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);
