function gameRoots(app) {

  let goodAnswers = 0;
  let isGameOver = false;
  let callFriendUsed = false;
  let questionCrowdUsed = false;
  let halfUsed = false;

  const questions = [
    {
      question: 'Jaki jest najlepszy język programowania?',
      answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
      correctAnswer: 2,
    },
    {
      question: 'Proces inicjalizacji zmiennej to: ?',
      answers: ['Przypisanie wartości początkowej zmiennej', 'Utworzenie drugiej zmiennej, o takiej samej nazwie co pierwsza', 'Żadne z powyższych'],
      correctAnswer: 1,
    },
    {
      question: 'Kompilator to: ?',
      answers: ['Urządzenie używane do weryfikacji poprawności kodu programu', 'Program umożliwiający sprawne wyszukanie błędów w kodzie (przechodząc po nim linijka po linijce)', 'Program tłumaczący kod źródłowy programu na kod maszynowy'],
      correctAnswer: 2,
    },
  ];

  app.get('/question', (req, res) => {

    if (goodAnswers === questions.length) {
      res.json({
        winner: true
      });

    } else if (isGameOver) {
      res.json({
        loser: true,
      });

    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;

      res.json({
        question, answers
      })
    }
  });

  app.post('/answer/:index', (req, res) => {

    if (isGameOver) res.json({
      loser: true,
    });

    const { index } = req.params;

    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    };

    res.json({
      correct: isGoodAnswer,
      goodAnswers,
    });
  });

  app.get('/help/friend', (req, res) => {

    if (callFriendUsed) {
      return res.json({
        text: 'To koło ratunkowe było już wykorzystane',
      });
    }

    callFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;
    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer ? `Hmm, wydaje mi się że odpowiedź to ${question.answers[question.correctAnswer]}` : 'Hmm, no nie wiem....'
    });

  });

  app.get('/help/half', (req, res) => {

    if (halfUsed) {
      return res.json({
        text: 'To koło ratunkowe było już wykorzystane',
      });
    }

    halfUsed = true;

    const question = questions[goodAnswers];

    const answersCopy = question.answers.filter((s, index) => (
      index !== question.correctAnswer
    ));

    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy,
    });

  });

  app.get('/help/crowd', (req, res) => {

    if (questionCrowdUsed) {
      return res.json({
        text: 'To koło ratunkowe było już wykorzystane',
      });
    }

    questionCrowdUsed = true;

    const chart = [10, 20, 30, 40];

    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);

      chart[i] += change;
      chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const { correctAnswer } = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart
    });
  });

}

module.exports = gameRoots;