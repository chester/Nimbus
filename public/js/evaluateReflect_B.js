'use strict';

$(document).ready(function() {
    //console.log("JS");
    initializePage();
    if( sessionStorage.getItem('evaluateQuestions') != null ) {
        loadData();
    }
})

function initializePage() {
    var focusText = sessionStorage.getItem('theFocus');
    document.getElementById("focus").innerHTML = focusText;
}


function nextPage() {
    var evaluateQuestions = [];
    //alert(document.getElementById("q1").value);
    evaluateQuestions.push(document.getElementById("q1").value);
    evaluateQuestions.push(document.getElementById("q2").value);
    evaluateQuestions.push(document.getElementById("q3").value);
    evaluateQuestions.push(document.getElementById("q4").value);


    sessionStorage.setItem('evaluateQuestions', JSON.stringify(evaluateQuestions));
    console.log(window.performance.now());
    if (window.performance) {
        var timeSincePageLoad = Math.round(performance.now());
        timeSincePageLoad = timeSincePageLoad / 1000;
        console.log("Time since page load: " + timeSincePageLoad);
       // ga('create', 'UA-114936723-1', 'auto');
       // ga('send', 'timing', 'Page Time', 'time', timeSincePageLoad);

        // Try sending an event with a value, value=timeSincePageLoad
        //Category = next, action = click 
        ga('create', 'UA-114936723-1', 'auto');
        ga('send', 'event', {
            'eventCategory': 'next',
            'eventAction': 'click',
            'eventValue': timeSincePageLoad
        });
    }
    
}

function loadData() {
    var data = JSON.parse(sessionStorage.getItem('evaluateQuestions'));
    document.getElementById("q1").value = data['0'];
    document.getElementById("q2").value = data['1'];
    document.getElementById("q3").value = data['2'];
    document.getElementById("q4").value = data['3'];
    //console.log(data['0']);

}

//document.getElementById("q2").style.visibility = "hidden";
//document.getElementById("q3").style.visibility = "hidden";

$("#next").click(nextQuestion);
function nextQuestion(event) {
    $("#q1").hide();
    $("#q2").css('display', 'block');
    $(this).hide();
    $("#next2").css('display', 'block');
}

$("#next2").click(nextQuestion2);
function nextQuestion2(event) {
    $("#q2").hide();
    $("#q3").css('display', 'block');
    $(this).hide();
    $("#last").css('display', 'block');
}

$("#last").click(lastQuestion);
function lastQuestion(event) {
    $("#q3").hide();
    $("#q4").css('display', 'block');
    $(this).hide();
    $("#save").css('display', 'block');
}


  

