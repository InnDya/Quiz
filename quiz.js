class Quiz {
    // In class I have 4 properties (fields - egenskaper): currentQuestion, score and questionArr
    // Constructor receives function showCurrentQuestion as parameter (callback) because fetch() is asynchronous and we must wait
    // to get all data and then we call showCurrentQuestion()
    constructor(showCurrentQuestion) {
        this.currentQuestion = 0;
        this.score = 0;
        let quizUrl = 'https://quizapi.io/api/v1/questions?apiKey=61NpzcuQqCz5TQMyxak6LdBR8VuEZ1LtqYhZiNzt&tags=HTML&limit=10';
        fetch(quizUrl)
            .then(response => response.json())
            .then(data => {
                this.questionsArr = data;
                showCurrentQuestion();
            })
            .catch(error => {
                console.log(error);
            });
    }

    getCurrentQuestion() {
        return this.questionsArr[this.currentQuestion];
    }

    nextQuestion() {
        this.currentQuestion++;
    }

    completed() {
        return this.currentQuestion === this.questionsArr.length;
    }

    checkAnswer() {
        let answers = this.questionsArr[this.currentQuestion].correct_answers;
        let inputList = document.querySelectorAll("ul#answers li input");
        // NodeList is not an array. That's why I create an array from inputList.  
        let checked = Array.from(inputList).filter(input => input.checked);
        checked.forEach(input => {
            if (answers[input.id] == "true") {
                this.score += 1;
            }
        });
    }
}