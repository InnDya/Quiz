let quiz;

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("btnNext").addEventListener("click", onClickNext);
    quiz = new Quiz(showCurrentQuestion);
})

function onClickNext(e) {
    quiz.checkAnswer();
    deleteAnswers();
    quiz.nextQuestion();
    if (quiz.completed()) {
        quizCompleted();
    } else {
        showCurrentQuestion();
    }
}

function onClickRestart(e) {
    deleteAnswers();
    document.getElementById("questionBox").innerText = "";
    document.getElementById("btnNext").disabled = false;
    document.getElementById("btnRestart").remove();
    quiz = new Quiz(showCurrentQuestion);
}

function quizCompleted() {
    document.getElementById("btnNext").disabled = true;
    let btnRestart = document.createElement("button");
    btnRestart.setAttribute("type", "button");
    btnRestart.setAttribute("id", "btnRestart");
    btnRestart.innerHTML = "Restart";
    document.getElementById("buttons").appendChild(btnRestart);
    btnRestart.addEventListener("click", onClickRestart);

    let name = document.getElementById("firstName").value;
    document.getElementById("questionBox").innerHTML = (name + ", you finished the quiz! Your result is " + quiz.score + " of 10.<br/>If you want to start over click Restart.");
}

function addCheckbox(id, text) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", id);
    let li = document.createElement("li");
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = text;
    li.appendChild(checkbox);
    li.appendChild(label);
    document.getElementById("answers").appendChild(li);
}

function deleteAnswers() {
    document.getElementById("answers").innerHTML = "";
}

function addRadioBtn(id, text) {
    let radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("name", "radio_answers");
    radioBtn.setAttribute("id", id);
    let li = document.createElement("li");
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = text;
    li.appendChild(radioBtn);
    li.appendChild(label);
    document.getElementById("answers").appendChild(li);
}

function showCurrentQuestion() {
    console.log(quiz);
    let question = quiz.getCurrentQuestion();
    console.log(question);

    if (question.multiple_correct_answers == 'true') {
        // checkboxes
        if (question.answers.answer_a != null) {
            addCheckbox("answer_a_correct", question.answers.answer_a);
        }
        if (question.answers.answer_b != null) {
            addCheckbox("answer_b_correct", question.answers.answer_b);
        }
        if (question.answers.answer_c != null) {
            addCheckbox("answer_c_correct", question.answers.answer_c);
        }
        if (question.answers.answer_d != null) {
            addCheckbox("answer_d_correct", question.answers.answer_d);
        }
        if (question.answers.answer_e != null) {
            addCheckbox("answer_e_correct", question.answers.answer_e);
        }
        if (question.answers.answer_f != null) {
            addCheckbox("answer_f_correct", question.answers.answer_f);
        }


    } else {
        // radio buttons
        if (question.answers.answer_a != null) {
            addRadioBtn("answer_a_correct", question.answers.answer_a);
        }
        if (question.answers.answer_b != null) {
            addRadioBtn("answer_b_correct", question.answers.answer_b);
        }
        if (question.answers.answer_c != null) {
            addRadioBtn("answer_c_correct", question.answers.answer_c);
        }
        if (question.answers.answer_d != null) {
            addRadioBtn("answer_d_correct", question.answers.answer_d);
        }
        if (question.answers.answer_e != null) {
            addRadioBtn("answer_e_correct", question.answers.answer_e);
        }
        if (question.answers.answer_f != null) {
            addRadioBtn("answer_f_correct", question.answers.answer_f);
        }
    }

    document.getElementById("questionBox").innerText =
        "[" + (quiz.currentQuestion + 1) + "/10] " + question.question;
}

