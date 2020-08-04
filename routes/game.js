function gameRoots(app) {

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
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;

      res.json({
        question, answers
      })
    }
  });
}

module.exports = gameRoots;