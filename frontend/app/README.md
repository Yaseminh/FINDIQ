# Quiz Flashcard Application

A simple Angular application to create flashcards and play quizzes based on those flashcards.  
Uses Angular Signals for reactive state management and communicates with a backend service.

---

## Features

- Add flashcards with questions, correct answers, and wrong answers.
- Play quiz games with multiple-choice questions.
- Uses Angular 16+ Signals for managing reactive UI state.
- Communicates with backend using Angular HttpClient.

---

## Inversion of Control (IoC) and Dependency Injection (DI)

This project uses **IoC and DI** via Angular framework:

- Angular takes control of creating instances of services and dependencies automatically.
- You never manually instantiate services with `new`. Instead, Angular injects them where needed.
- Example:
  ```typescript
  constructor(private userService: UserService) {}

Here, Angular automatically injects an instance of UserService into the component's constructor.

This improves code maintainability, testability, and separation of concerns.

## Setup
Navigate to backend directory:
cd app
npx tsc
npm start

## Adding Bootstrap to the Project
1. Install Bootstrap:
npm install bootstrap
2. Open angular.json file, locate the styles array inside the build > options section.
3. Add Bootstrap CSS path to styles:

"styles": [
"node_modules/bootstrap/dist/css/bootstrap.min.css",
"src/styles.css"
]

4. Restart your Angular application to load Bootstrap styles.

