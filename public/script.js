const question = document.querySelector('#question');
const gameBoard = document.querySelector('.game-board');
const h2 = document.querySelector('h2');

function fillQuestionElements(data) {

  if (data.winner === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'Wygrałeś/aś';
    return;
  }

  if (data.loser === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'Nie poszło tym razem, spróbuj następnym razem.';
    return;
  }

  question.innerText = data.question;

  for (const i in data.answers) {

    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];

  }
}

function showNextQuestion() {

  fetch('/question', {
    method: 'GET',
  })
    .then(r => r.json()
      .then(data => {
        fillQuestionElements(data);
      }));
}

showNextQuestion();

const goodAnswerSpan = document.querySelector('#good-answers');

function handleAnswerFeedback(data) {
  goodAnswerSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: 'POST',
  })
    .then(r => r.json()
      .then(data => {
        handleAnswerFeedback(data);
      }));
}

const buttons = document.querySelectorAll('.answer-button');

for (const button of buttons) {
  button.addEventListener('click', (event) => {

    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);

  });
}

const tipDiv = document.querySelector('#tip');

function handleFirendsAnswer(data) {
  tipDiv.innerText = data.text;
}

function callToAFriend() {
  fetch('/help/friend', {
    method: 'GET',
  })
    .then(r => r.json()
      .then(data => {
        handleFirendsAnswer(data);
      }));
}

document.querySelector('#callToAFriend').addEventListener('click', callToAFriend);

function handleHalfOnHalfAnswer(data) {

  if (typeof data.text === 'string') {
    tipDiv.innerText = data.text;

  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText > -1)) {
        button.innerText = '';
      }
    }
  }

}

function halfOnHalf() {
  fetch('/help/half', {
    method: 'GET',
  })
    .then(r => r.json()
      .then(data => {
        handleHalfOnHalfAnswer(data);
      }));
}

document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf);