import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Flashcard {
  question: string;
  correctAnswers: string[]; // changed from correctAnswer
  wrongAnswers: string[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswers: string[]; // changed from correctAnswer
}


@Injectable({
  providedIn: 'root' // This service is automatically provided as a singleton at the top level of the application (root)
})
export class FlashcardService {
  private apiUrl = 'http://localhost:3000';

   // Angular DI container automatically injects HttpClient instance
  // We are not creating a new HttpClient, the framework provides it
  constructor(private http: HttpClient) { }

  // Sends a POST request to the API, creates a new flashcard
  createFlashcard(flashcard: Flashcard): Observable<any> {
    return this.http.post(`${this.apiUrl}/flashcards`, flashcard);
  }

  // Gets quiz questions from API with GET
  getQuizQuestions(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.apiUrl}/quiz`);
  }
}
