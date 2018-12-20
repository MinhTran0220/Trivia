
// DOM ready
$(document).ready(function () {
    $('.Test-container').hide();
    $('#previous').hide();
    $('#next').hide();
    $('#submit').hide();
    $('#timeLeft').hide();
});

// click to start then display questions
$("#startbtn").click(function () {
    $('#welcomeScreen').hide();
    $('.Test-container').show();
    $('#timeLeft').show();
    $('#previous').show();
    $('#next').show();
    $('#submit').show();

    // constant Games Quetions
    const triviaQuestions = [
        {
            question: "What was the last photo you took?",
            answers: {
                a: " yesterday", b: " Monday", c: " Tuesday ", d: " last month"
            },
            correctAnswer: "a",
        }, {
            question: "Name the three primary colours?",
            answers: {
                a: "white, black & red", b: "orange, black & red", c: "white, red & blue", d: "red, yellow & blue"
            },
            correctAnswer: "d"
        }, {
            question: "When did the Cold War end?",
            answers: {
                a: "1986", b: "1989", c: "1987", d: "1991"
            },
            correctAnswer: "b"
        }, {
            question: "How tall would a double elephant folio book be?",
            answers: {
                a: "70 inches", b: "60 inches", c: "50 inches", d: "55 inches"
            },
            correctAnswer: "c"
        }, {
            question: "On what date did the Battle of Culloden take place?",
            answers: {
                a: "16th April 1745", b: "16th April 1746", c: "16th April 1747", d: "17th April 1746"
            },
            correctAnswer: "b"
        }, {
            question: "How many valves does a trumpet have? ",
            answers: {
                a: "three", b: "one", c: "two", d: "four"
            },
            correctAnswer: "a"
        }, {
            question: "When was the euro introduced as legal currency on the world market?",
            answers: {
                a: "1st January 1998", b: "1st January 1999.", c: "1st January 1997.", d: "5st January 1999."
            },
            correctAnswer: "b"
        }, {
            question: "What does the term 'piano' mean?",
            answers: {
                a: "To be played rocker", b: "To be played hardly", c: "To be played softly", d: "To be played slowly"
            },
            correctAnswer: "c"
        }, {
            question: "When was William Shakespeare born?",
            answers: {
                a: " 23rd May 1564", b: " 23rd jun 1564", c: " 23rd April 1565", d: " 23rd April 1564"
            },
            correctAnswer: "d"
        }, {
            question: "When did Margaret Thatcher become Prime Minister?",
            answers: {
                a: "1979", b: "1980", c: "1975", d: "1985"
            },
            correctAnswer: "a"
        }

    ];

    //Create a Test Question
    function testQuestion() {
        //place to store HTML output
        var output = [];

        //for each question
        triviaQuestions.forEach((currentQuestion, questionNumber) => {
            //store the list of answer choices
            var answers = [];

            //and each available answer
            //for (var i= 0; i < currentQuestion.answers.length; i++){
            // let word = currentQuestion.answers[i];
            for (word in currentQuestion.answers) {
                //add HTML radio button
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${word}">
                    ${currentQuestion.answers[word]}
                    </label>`
                );
            }

            //add this question and its answers to the output
            output.push(
                `<div class="slide">
                <div class="question"> ${currentQuestion.question}</div>
                <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        });

        //combine the output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");

    }

    // creater for time variables
    var count = 45;
    var intervalId;

    //timer function (interval-solved class solution)
    //when button is clicked, it will trigger the stop or run
    $("#timeLeft").on("click", runTimer);

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        // creater time decrease count by 1
        count--;
        //show timer in tag id
        $("#timeLeft").html("<h1>Time Remaining:</h1> <br> <h2>" + count + "</h2>");

        //once timer hits zero
        if (count === 0) {
            stop();
            alert("Times Up!");
            $('#timeLeft').hide(); //hide timer
            showResults(); //if time runs out, show results
        }
    }
    //clear intervalId
    function stop() {
        clearInterval(intervalId);
    }
    // creater function Show Results
    function showResults() {

        //gather answer containers from the quuestions
        const answerContainers = quizContainer.querySelectorAll(".answers");

        //keep track of user's answers
        let numCorrect = 0;

        let quesSkipped = 0;

        triviaQuestions.forEach((currentQuestion, questionNumber) => {
            //find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            //if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {

                //add to the number of correct answers
                numCorrect++;

                //color the answers green
                answerContainers[questionNumber].style.color = '#green';
            }
            else {
                //color the answers red
                answerContainers[questionNumber].style.color = '#red';
            }

        });
        // length of questions
        var quesLength = triviaQuestions.length;
        var quesLengthA = parseInt(quesLength);

        // length of correct answers
        var correctLength = parseInt(numCorrect);

        //amount missed
        var amountMissed = quesLength - correctLength;

        //show number of correct answers out of total
        $("#pageBreak").html("<hr size='5' color='white'>")
        $("#numberRight").html(" <h1 id='Hallelujah'>Hallelujah!!!</h1> <br> <h1 class='score'>You got " + correctLength + " questions correct!</h1><br>");
        $("#numberWrong").html("<h1 id='another'>Please Play another Game</h1> <br> <h1 class='score'>You missed " + amountMissed + " questions.</h1><img class='center' src='https://media0.giphy.com/media/7zQ02nV86XGBce95o5/giphy.webp' /><br><br>");
        $('#timeLeft').hide();
    }

    //function for Questions
    function showNext(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;
        //if else statement
        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }
    // function next questions
    function nextQuestions() {
        showNext(currentSlide + 1);

    }
    // funtion Previous quetions
    function previousQuestions() {
        showNext(currentSlide - 1);
    }

    const quizContainer = document.getElementById("Test");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // var audio for play music
    var audio = document.getElementById("myAudio");
    // function Music Volume
    function setMusicVolume() {
        audio.play();
        audio.volume = 0.3;
    }
    // function music end
    function musicEnds(p_audio) {
        audio.muted = true;
    };
    //display Test and timer
    runTimer();
    testQuestion();
    setMusicVolume();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showNext(0);

    // function on click to  submit,  & show results
    submitButton.addEventListener("click", endTrivia);
    function endTrivia() {
        showResults();
        stop();
        $('#timeLeft').hide();
        musicEnds();

    }
    // Timer set to end up  here
    previousButton.addEventListener("click", previousQuestions);
    nextButton.addEventListener("click", nextQuestions);

});

