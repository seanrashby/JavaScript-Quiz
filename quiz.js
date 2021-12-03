(function(){
  // Functions
  var timer;
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  
  function startTimer(){
    var sec = 30;
    var element = document.getElementById('timer');
    timer = setInterval(function(){
        sec--;
        element.innerHTML='00:'+sec;
        if (sec <= 0) {
            clearInterval(timer);
            showResults()
        }
    }, 1000);
  }
  function startQuiz(e){

    const notStarted = document.querySelectorAll('.hidden');

    e.target.classList.add("hidden");

    for (let i = 0; i < notStarted.length; i++) {
      notStarted[i].classList.remove("hidden");
    }
    
    startTimer(); 
  }

  function showResults(){
    clearInterval(timer);
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const startButton = document.getElementById('start');
  const myQuestions = [
    {
      question: "What is JavaScript?",
        answers: {
          a: "A sandwich",
          b: "An internet coding language",
          c: "A rare Amazonian bird"
        },
        correctAnswer: "b"
      },
      {
        question: "What does addEventListener do in JS?",
        answers: {
          a: "Event targeting",
          b: "An inbuilt function in JS which takes the event to listen for, and a second argument to be called whenever the described event gets fired",
          c: "I should have just majored in poli sci"
        },
        correctAnswer: "b"
      },
      {
        question: "Can you target HTML elements with JS?",
        answers: {
          a: "Yes",
          b: "Maybe?",
          c: "No",
    
        },
        correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();