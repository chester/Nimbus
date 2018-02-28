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
    evaluateQuestions.push(document.getElementById("q1").value)
    evaluateQuestions.push(document.getElementById("q2").value)
    evaluateQuestions.push(document.getElementById("q3").value)

    sessionStorage.setItem('evaluateQuestions', JSON.stringify(evaluateQuestions));
    
}

function loadData() {
    var data = JSON.parse(sessionStorage.getItem('evaluateQuestions'));
    document.getElementById("q1").value = data['0'];
    document.getElementById("q2").value = data['1'];
    document.getElementById("q3").value = data['2'];
    //console.log(data['0']);
}

  if (window.performance) {
  var timeSincePageLoad = Math.round(performance.now());
  gtag('send', 'timing', 'JS Dependencies', 'load', timeSincePageLoad);
}