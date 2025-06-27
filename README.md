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

## Features that can be improved

1. 🗂️ Category System
Allow users to group flashcards into categories such as:

Math, History, Science, etc.

When starting a quiz, users can choose a specific category.

Makes learning more organized and goal-oriented.

2. 📊 Score Tracking & Statistics
Store and display historical quiz scores to help users track their progress over time:

Example: “You scored 7/10 last time on Math.”

Identify which questions were answered incorrectly.

Visual indicators or charts for progress (optional).

3. ⏱️ Timer for Each Question
Add a countdown timer (e.g., 30 seconds) per quiz question:

Automatically moves to the next question when time runs out.

Adds challenge and simulates time-pressured scenarios.

4. 📈 Performance Analytics
Based on quiz results:

Calculate success rates per category or user.

Track improvement trends over time.

Ideal for use in learning environments or employee training.

5. 👥 Role-Based Access (RBAC)
Introduce a simple login system with user roles:

Role	Abilities
Admin	Create and manage flashcards/quizzes
User (Student/Employee)	Play quizzes and track own scores

Different UI and functionality based on the logged-in role.

Useful for organizations, schools, or training platforms.

6. ⭐ User Feedback & Rating System
Add a simple survey or rating prompt at the end of each quiz session to collect user feedback:

Example questions:

"Did you enjoy the quiz experience?"

"Was the difficulty level appropriate?"

"Any suggestions for improvement?"

Users can rate the quiz (e.g., 1 to 5 stars).

Optional open-text feedback field for detailed suggestions.

💡 This feedback can be stored and analyzed by the admin to continuously improve the quality and relevance of the flashcards and UI experience.

7. 💡 Hint System
Users can optionally click a “Show Hint” button for challenging questions.

Each question can have a predefined hint to assist the user without giving away the answer.

8. ✨ Animations and UI Enhancements
Add visual feedback (e.g., color transitions, icons) for correct and incorrect answers.

Use smooth animations during quiz transitions to create a more modern and engaging user interface.



