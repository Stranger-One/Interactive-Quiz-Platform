# Interactive Quiz Platform

The Interactive Quiz Platform is a web application built with React and Vite. It allows users to take quizzes, view their quiz history, and review their answers. The platform supports multiple-choice questions as well as text-based answers.

## Features

- **Home Page**: Start a new quiz and view quiz history.
- **Quiz Page**: Take a quiz with multiple-choice and text-based questions.
- **Review Page**: Review the answers of a completed quiz.
- **Authentication**: Sign in and sign up functionality (placeholder).

## Pages

### Home Page

- **Path**: `/`
- **Components**: `TestHistory`
- **Description**: The home page allows users to start a new quiz and view their quiz history. The quiz history shows the scores and timestamps of previous quiz attempts.

### Quiz Page

- **Path**: `/test`
- **Components**: `Quiz`
- **Description**: The quiz page presents a series of questions to the user. Users can select answers for multiple-choice questions or input text-based answers. The quiz tracks the user's score and time taken for each question.

### Review Page

- **Path**: `/review/:id`
- **Components**: `ReviewTest`
- **Description**: The review page displays the details of a completed quiz, including the questions, user's answers, correct answers, and time taken for each question.

### Authentication Pages

- **Paths**: `/auth/signin`, `/auth/signup`
- **Components**: `SignIn`, `SignUp`
- **Description**: Placeholder pages for user authentication.

## Components

### TestHistory

- **Props**: `refresh` (boolean)
- **Description**: Displays the history of quiz attempts. Each entry shows the score and timestamp.

### Quiz

- **Description**: Manages the quiz-taking process. Tracks the current question, user's score, selected answers, and time left for each question. Saves the quiz result and review data to the database.

### ReviewTest

- **Description**: Fetches and displays the details of a completed quiz from the database. Shows the questions, user's answers, correct answers, and time taken for each question.

## Usage

### Running the Project

1. **Install Dependencies**: Run `npm install` to install the required dependencies.
2. **Start the Development Server**: Run `npm run dev` to start the Vite development server.
3. **Build for Production**: Run `npm run build` to build the project for production.
4. **Preview the Production Build**: Run `npm run preview` to preview the production build.

### Project Structure

```
/src
  /components
    - Quiz.jsx
    - TestHistory.jsx
  /database
    - db.js
  /pages
    - Home.jsx
    - QuizTest.jsx
    - ReviewTest.jsx
  /utils
    - questions.js
  - App.jsx
  - main.jsx
  - index.css
```

### Database

The project uses IndexedDB to store quiz history. The database configuration is located in `src/database/db.js`.

### Questions

The quiz questions are defined in `src/utils/questions.js`. Each question has an `id`, `question`, `options`, and `answer`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
