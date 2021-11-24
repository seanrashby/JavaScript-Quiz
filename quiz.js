(function(){
    // Functions for the quiz to operate 
    function buildQuiz(){
      // var to store the html output 
      const output = [];
  
      
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          
          const answers = [];
  
          
          for(letter in currentQuestion.answers){
  
            
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      
      let numCorrect = 0;
  
      
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
       
        if(userAnswer === currentQuestion.correctAnswer){
          
          numCorrect++;
  
          
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        
        else{
          
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      
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
  
    
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
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
  
    
    buildQuiz();
  
    
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    
    showSlide(currentSlide);
  
    
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  