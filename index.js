const STORE = [
    {
        question: 'Which one of following is correct method for accessing object?',
        answer: [
            'object.name()',
            'message.toUpperCase()',
            'objectName.methodName()',
            'object.Name.method.Name()'
            ],
        correctAnswer:'objectName.methodName()'
    },
    {
        question: 'The "this" keyword in the method means:',
        answer: [
            'The Current object',
            'The name of the given method',
            'The name of the web page',
            'The name of the current function'
            ],
        correctAnswer: 'The name of the given method'
    },
    {
        question: 'The type of function that executes when an event occurs is called:',
        answer: [
            'event handler',
            'event description',
            'event name',
            'event function'
        ],
        correctAnswer: 'event handler'
    },
    {
        question: 'The result of the condition statement is always:',
        answer: [
            'A Boolean value',
            'A numeric Value',
            'A String Value',
            'All of above'
        ],
        correctAnswer: 'A Boolean value', 
    },
    {
        question: 'What do you need to do create a parameter?',
        answer: [
            'Use the "var" keyword',
            'Write a variable name in the parentheses',
            'Use the "param" keyword',
            'declare a parameter'
        ],
        correctAnswer: 'Write a variable name in the parentheses'   
    },
    {
        question: 'The "concat" method takes two arrays and:',
        answer:[
            'combine them in one new array',
            'compares their members',
            'outputs them to the screen',
            'store their values'
        ],
        correctAnswer: 'combine them in one new array'
    },
    {
        question: 'What information results from creating a Date Object?',
        answer:[
            'An Empty string',
            'The date when the web page was hosted',
            'The Current date and time',
            'set reminder'
        ],
        correctAnswer: 'The Current date and time'
    },
    {
        question: 'Which function is used to stop a setInterval timer?',
        answer: [
            'clearInterval',
            'clearTimer',
            'stopInterval',
            'stopTimer'
        ],
        correctAnswer: 'clearInterval'
    },
];

let score = 0;
let questionNumber = 0;


//Generate questions
function generateQuestions(){
    if ( questionNumber < STORE.length ){
        return createThing(questionNumber);
    } else {
    $('.questionPage').hide();
    finalScore();
    $('.questionNumber').text(8);
    }
};

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}


//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber +1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begin the quiz
  function startQuiz(){
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event){
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionPage').show();
      $('.questionPage').prepend(generateQuestions());
      // generateQuestions();
    });
  }


//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.questionPage').on('submit', '.toMakeRequiredWork', function () {
    event.preventDefault();
    $('.altBox').hide();
    $('.feedbackPage').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(){
    $('.questionPage').html('<form id="question" class="toMakeRequiredWork">'
    + '<p>'
    + STORE[questionNumber].question
    + '</p>'
    + STORE[questionNumber].answer.map((answer) => {
    return `<label><input  type="radio" value="${answer}" name="ans" required/> <span>${answer}</span><br></label>`
    }).join('')
    + `<button type="submit" class="check">Submit</button></form>`);
$('.questionNumber').text(questionNumber +1);
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.feedbackPage').html(
    `<h3>Your answer is correct!</h3>
    <img src="./images/correct.png" alt="correct-emoji" class="images" width="200px">
      <p class="sizeMe">Fantastic!</p>
      <button type="button" class="nextButton button correct-button">Next One!</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.feedbackPage').html(
    `<h3>That's the wrong answer...</h3>
    <img src="./images/wrong.png" alt="wrong-emoji" class="images" width="200px">
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.feedbackPage').on('click', '.nextButton', function () {
    $('.altBox').hide();
    $('.questionPage').show();
    updateQuestionNumber(questionNumber);
    $('.questionPage form').replaceWith(generateQuestions());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.finalPage').show();

  const great = [
    'Great job!',
    'images/congrats.png',
    'cheering monkey',
  ];

  const good = [
    'Good, not great.',
    'images/read.jpg',
    'monkey reading a book',
  ];

  const bad = [
    'Do you even know what monkeys look like?',
    'images/end.png',
    'cat in a monkey costume',
  ];

  if (score >= 6) {
    array = great;
  } else if (score < 6 && score >= 4) {
    array = good;
  } else {
    array = bad;
  }
  return $('.finalPage').html(
    `<h3>'Great Job!'</h3>
      <img src="images/congrats.png" alt="congrats-emoji" class="images" width="300px">
        <h3>Your score is ${score} of 8</h3>
        <button type="submit" class="restartButton button">Try Again!</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.mainBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function mainQuiz(){
    startQuiz();
    generateQuestions();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(mainQuiz);