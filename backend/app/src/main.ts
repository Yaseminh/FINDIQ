import "reflect-metadata";  // Bu mutlaka en üstte olmalı
import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Flashcard from "./model/Flashcard";
import { FlashcardService } from "./service/flashCardService";

import { Container } from "typedi";

const app: Express = express();
const port: number = 3000;

//We save the flashcard Mongoose model in the typedi container with the "flashcardModel" key.
//The dependencies are not managed by us, but by the container. In other words, we will not get the
// flashcard model directly, but through the container.
Container.set("flashcardModel", Flashcard);

// Get FlashcardService from container
//Instead of creating the FlashcardService object ourselves with new FlashcardService(...),
// the container calls it and automatically injects the dependencies it needs (e.g. flashcardModel).
const flashcardService = Container.get(FlashcardService);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/flashcard_quiz")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
//These are "middleware" functions used in Express.js and process the body of incoming HTTP requests.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route logging
app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Flashcard routes
app.post("/flashcards", (req: Request, res: Response) => {
    flashcardService.createFlashcard(req, res);
});

app.get("/quiz", (req: Request, res: Response) => {
    flashcardService.getQuizQuestions(req, res);
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
