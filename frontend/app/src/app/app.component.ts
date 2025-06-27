import { Component, signal } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuizGameComponent } from './components/quiz-game/quiz-game.component';
import {AddFlashcardComponent} from './components/add-flashcard/add-flashcard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuizGameComponent,
    AddFlashcardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // State management is done with Angular Signals (Angular 16+ feature)
  //Here, situations such as "will the game screen or the add screen appear?", "what is the score?"
  // and "is the quiz over?" are kept with the signal and automatically updated as they change. In this way, the UI and the data remain synchronized.
  currentView = signal<'add' | 'quiz'>('quiz');
  score = signal(0);
  totalQuestions = 0;
  quizEnded = signal(false);

  // Puts the view in "add flashcard" mode
  showAddView() {
    this.currentView.set('add');
    this.quizEnded.set(false);
  }
  // Puts the view in "quiz" mode and resets the score, quizEnded states
  showQuizView() {
    this.currentView.set('quiz');
    this.score.set(0);
    this.quizEnded.set(false);
  }
  // When the quiz is completed, the score and total questions from the event are set to states.
  onQuizCompleted(event: { score: number; total: number }) {
    this.score.set(event.score);
    this.totalQuestions = event.total;
    this.quizEnded.set(true);
  }

}
