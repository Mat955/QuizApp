const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server is listening at http://localhost:3000 Lets play a game!');
});

let goodAnswers = 0;
let callFriendUsed = false;
let questionCrowdUsed = false;
let halfUsed = false;

const questions = [
  {
    question: 'Jaki jest najlepszy język programowania?',
    answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
    correctAnswer: 2,
  },
];