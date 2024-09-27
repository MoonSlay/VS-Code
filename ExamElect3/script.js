$(document).ready(function() {
    const questions = [
        {
            question: "What does HTML stand for?",
            choices: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Text Multiple Language"],
            correctAnswer: 2
        },
        {
            question: "What does CSS stand for?",
            choices: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
            correctAnswer: 1
        },
        {
            question: "What does JS stand for?",
            choices: ["JustScript", "JavaSuper", "JavaScript", "JunkScript"],
            correctAnswer: 2
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            choices: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']", "var colors = {red, green, blue}"],
            correctAnswer: 2
        },
        {
            question: "Which HTML element is used to define a JavaScript script?",
            choices: ["&lt;script&gt;", "&lt;js&gt;", "&lt;javascript&gt;", "&lt;code&gt;"],
            correctAnswer: 0
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // Create and append the progress segments
    function createProgressSegments() {
        for (let i = 0; i < questions.length; i++) {
            $('#progress-bar-container').append('<div class="progress-segment"></div>');
        }
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            let question = questions[currentQuestionIndex];
            $('#question-container').html(`
                <h3>${question.question}</h3>
                <form id="question-form">
                    ${question.choices.map((choice, index) => `
                        <label>
                            <input type="radio" name="answer" value="${index}"> ${choice}
                        </label><br>
                    `).join('')}
                </form>
            `);
            $('#feedback').html('');
        } else {
            showScore();
        }
    }

    function showScore() {
        $('#quiz-section').hide();
        $('#score-section').show();
        $('#score-message').html(`You scored ${score} out of ${questions.length}`);
    }

    $('#start-quiz').click(function() {
        $('#landing-page').hide();
        $('#quiz-section').show();
        createProgressSegments(); // Create segments when quiz starts
        loadQuestion();
    });

    $('#submit-answer').click(function() {
        let selectedAnswer = $('input[name="answer"]:checked').val();
        if (selectedAnswer === undefined) {
            alert('Please select an answer!');
        } else {
            const segment = $('.progress-segment').eq(currentQuestionIndex); // Select the current segment

            if (selectedAnswer == questions[currentQuestionIndex].correctAnswer) {
                $('#feedback').html('<span style="color:green">Correct!</span>');
                segment.css('background-color', 'green'); // Green for correct
                score++;
            } else {
                $('#feedback').html('<span style="color:red">Incorrect!</span>');
                segment.css('background-color', 'red'); // Red for incorrect
            }

            currentQuestionIndex++;
            setTimeout(loadQuestion, 1000); // Load the next question after 1 second
        }
    });

    $('#restart-quiz').click(function() {
        currentQuestionIndex = 0;
        score = 0;
        $('#progress-bar-container').empty(); // Clear progress bar when restarting
        $('#score-section').hide(); // Hide score section
        $('#quiz-section').show(); // Show quiz section again
        createProgressSegments(); // Recreate progress segments
        loadQuestion(); // Load the first question
    });
});
