// src/app/components/quiz-game/quiz-game.component.ts
//// Required imports for Angular component
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../../service/flashcard.service';

@Component({
  selector: 'app-quiz-game', // Used in HTML as <app-quiz-game>
  standalone: true, // Independent component that is not connected to the module
  imports: [CommonModule], // Uses Angular's common module (ngIf, ngFor etc.)
  templateUrl: './quiz-game.component.html', // HTML template of the component
  styleUrls: ['./quiz-game.component.css'] // Component's CSS file
})
export class QuizGameComponent {
  // Definition of event emitter so that the component can send the score and total question
  // information to the outside.
  @Output() quizCompleted = new EventEmitter<{ score: number; total: number }>();

  // Array to hold questions
  questions: any[] = [];
  // Counter that keeps track of which question we are on
  currentQuestionIndex = 0;
  // Array to hold answers marked by the user (multiple answers supported)
  selectedAnswers: string[] = []; // instead of selectedAnswer: string | null

  // Keeps track of the number of correct answers given by the user
  score = 0;

  // FlashcardService is automatically injected with DI in Constructor
  constructor(private flashcardService: FlashcardService) {}

  // Lifecycle method that runs when the Angular component is initialized
  ngOnInit(): void {
    this.loadQuestions();
  }

  // When the checkbox changes, the method called updates the selected answers
  onCheckboxChange(event: Event) {
    // Get the changed checkbox element from the event
    const checkbox = event.target as HTMLInputElement;
    //The .trim() method removes whitespace from the beginning and end of a string.
    const value = (checkbox.value || '').trim();

    if (checkbox.checked) {
      //Checks if the value already exists in the selectedAnswers array.
      if (!this.selectedAnswers.includes(value)) {
        this.selectedAnswers.push(value);
      }
    } else {
      // If the checkbox is unchecked, it is removed from the answer array
      this.selectedAnswers = this.selectedAnswers.filter(v => v !== value);
    }
  }

  // Method for loading questions via service
  loadQuestions() {
    this.flashcardService.getQuizQuestions().subscribe({
      next: (questions) => {
        // Convert incoming questions to appropriate format (trim spaces, make arrays, etc.)
        this.questions = questions.map(q => ({
          ...q,
          options: q.options.map((opt: string) => opt.trim()), // trim spaces in options
          //This line ensures that the correctAnswers variable is always treated as an array,
          // so that subsequent operations (e.g. map) work without errors.
          correctAnswers: (Array.isArray(q.correctAnswers) ? q.correctAnswers : [q.correctAnswers || ''])
            .map((ans: string) => ans.trim()) // trim spaces in correct answers
        }));
      },
      error: (err) => console.error('Error loading questions:', err)
    });
  }

  // In quiz-game.component.ts
  // Called when the user submits the answers
  submitAnswer() {
    // Get current question
    const currentQuestion = this.questions[this.currentQuestionIndex];
    // Get correct answers as an array (can be single or multiple answers)
    const correctAnswers: string[] = Array.isArray(currentQuestion.correctAnswers)
      ? currentQuestion.correctAnswers
      : currentQuestion.correctAnswer
        ? [currentQuestion.correctAnswer]
        : [];
    // Check if the answers selected by the user are equal to the correct answers (order does not matter)
    const isCorrect = this.arraysEqual(
      //The sort() method sorts the array alphabetically or numerically.
      this.selectedAnswers.slice().sort(),
      correctAnswers.slice().sort()
    );

    // If correct, increase the score
    if (isCorrect) {
      this.score++;
    }

    // Clear the selections so that the next question starts from scratch
    this.selectedAnswers = [];

    // Then move to next question
    this.currentQuestionIndex++;
    // If we are after the last question, emit the result information (communication between components)
    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizCompleted.emit({ score: this.score, total: this.questions.length });
    }
  }
  // Helper function that compares two string arrays for equality
  arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    // Remove spaces from the beginning and end of each element in the array
    const aTrimmed = a.map(s => s.trim());
    const bTrimmed = b.map(s => s.trim());

    // Sort arrays alphabetically
    aTrimmed.sort();
    bTrimmed.sort();

    // Check if the element in each index is the same
    return aTrimmed.every((val, i) => val === bTrimmed[i]);
  }
}
