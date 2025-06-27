import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../../service/flashcard.service';
@Component({
  selector: 'app-add-flashcard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.css']
})
export class AddFlashcardComponent {
  // Here we inject the FlashcardService service using Angular's new 'inject' function (DI).
  flashcardService = inject(FlashcardService);
 // Reactive form definition
  flashcardForm = new FormGroup({
    question: new FormControl('', Validators.required),
    correctAnswers: new FormControl('', Validators.required),
    wrongAnswers: new FormControl('', Validators.required)
  });

  addFlashcard() {
    if (this.flashcardForm.invalid) return;
    // We convert the strings we receive from the form into an array (separated by ',')
    const flashcard = {
      question: this.flashcardForm.value.question!,
      correctAnswers: this.flashcardForm.value.correctAnswers!.split(',').map(s => s.trim()),
      wrongAnswers: this.flashcardForm.value.wrongAnswers!.split(',').map(s => s.trim())
    };
   // We send a POST request to the backend using the service
    // HTTP requests or other asynchronous operations are returned as Observables.
    // Observables provide a stream and the subscribe() method is used to receive data from this stream.
    this.flashcardService.createFlashcard(flashcard).subscribe({
      next: () => {
        this.flashcardForm.reset();
        alert('Flashcard added successfully!');
      },
      error: (err) => console.error('Error adding flashcard:', err)
    });
  }
}
