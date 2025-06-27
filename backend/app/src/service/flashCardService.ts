import { Request, Response } from "express";
import {Inject, Service} from "typedi"; // <-- Required to get dependencies from the IoC container

// FlashcardService is the service layer of our application
@Service()
export class FlashcardService {
    // DI (Dependency Injection) happens here
    // - It says to the IoC Container: If there is an object named "flashcardModel", inject it
    // - This is also an Inversion of Control since control is provided by the IoC Container
    constructor(
        @Inject("flashcardModel") private flashcardModel: any
    ) {}

    // Service method of flashcard creation endpoint
    async createFlashcard(req: Request, res: Response) {
        try {
            const { question, correctAnswers, wrongAnswers } = req.body;
            // Simple validation
            if (!question || !correctAnswers || !wrongAnswers) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            // flashcardModel injected from outside, used here
            const newFlashcard = new this.flashcardModel({
                question,
                correctAnswers,
                wrongAnswers
            });
            // save to MongoDB
            await newFlashcard.save();
            // Success answer
            res.status(201).json(newFlashcard);
        } catch (error) {
            console.error("Error creating flashcard:", error);
            res.status(500).json({ error: "Failed to create flashcard" });
        }
    }
// Method that randomly draws quiz questions
    async getQuizQuestions(req: Request, res: Response) {
        try {
            //It is used for operations such as data filtering, grouping, sorting, limiting, and creating new fields.
            const questions = await this.flashcardModel.aggregate([
                { $sample: { size: 10 } }, // Randomly select 10 questions
                {
                    //there are only 1's (which fields you will take)
                    $project: {
                        question: 1,
                        options: { $concatArrays: ["$correctAnswers", "$wrongAnswers"] },
                        correctAnswers: 1
                    }
                }
            ]);
            // Shuffle options for each question
            const processedQuestions = questions.map((q: any) => ({
                ...q,
                options: this.shuffleArray(q.options)
            }));

            res.json(processedQuestions);
        } catch (error) {
            console.error("Error getting quiz questions:", error);
            res.status(500).json({ error: "Failed to get quiz questions" });
        }
    }

    private shuffleArray(array: any[]) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap two selected elements
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}
