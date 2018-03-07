'use strict';

//var fs = require('fs');

var jsonData = {};

$(document).ready(function() {
    initializePage();
})

function initializePage() {
    var topicText = sessionStorage.getItem('theFocus');
    //var topic = {
    //    "topic" : topicText
    //}
    var progress = [];
    jsonData.topic = topicText;
    if( topicText == '') {
        jsonData.topic = "You did not select a topic";
    }
    //jsonData.topic = topicText;
    jsonData.progress = progress;
    //console.log(jsonData);

    var steps = sessionStorage.getItem('stepsList');
    var parsedSteps = JSON.parse(steps);
    var i;
    for( i = 0; i < parsedSteps.length; i++) {
        var li = document.createElement("li");
        var newItemVal = parsedSteps[i];
        var textObj = document.createTextNode(newItemVal);
        li.appendChild(textObj);
        document.getElementById("UList").appendChild(li);

        // add x button 
        var span = document.createElement("SPAN");
        var icon = document.createTextNode("\u00D7");
        span.className = "closeButton";
        span.appendChild(icon);
        li.appendChild(span);
        span.onclick = function() {
            var div = this.parentElement;
            div.remove();
        }
    }
}

function nextPage() {
    var testArray = document.getElementsByTagName("li");

    if(testArray.length == 0) {
        alert("Please Enter Steps")
        return;
    }

    var itemsArray = [];
    var i;
    for( i = 0; i < testArray.length; i++) {
        itemsArray.push(testArray[i].childNodes['0'].data);
    }

    sessionStorage.setItem('stepsList', JSON.stringify(itemsArray));


    // Create json object for each step
    var j;
    for( j = 0; j < itemsArray.length; j++ ) {
        var step = {
            "stepName": itemsArray[j],
            "feelingData": "",
            "containerClass":"container left",
            "finished": false
        }
        jsonData.progress.push(step);
    }

    var json = JSON.stringify(jsonData);

    sessionStorage.setItem('stepsData', json);
    $.post('/progress/setSteps', jsonData);

    //$.post("/progress", json);

    //fs.writeFile('testJson.json', json, 'utf8', callback);

    //$.post("/sendSteps", jsonData);
    
    //alert(itemsArray);
   // console.log(testArray);
   // console.log(itemsArray.length);

   // sessionStorage.setItem('reflectionItems', JSON.stringify(itemsArray));
   // $.get('/selectReflect');

}

// close button
var listedItems = document.getElementsByTagName("LI");
var i;
for (i = 0; i < listedItems.length; i++) {
    var span = document.createElement("SPAN");
    var icon = document.createTextNode("\u00D7");
    span.className = "closeButton";
    span.appendChild(icon);
    listedItems[i].appendChild(span);
   // console.log("Added");
}

//close action
var close = document.getElementsByClassName("closeButton");
var i;
for ( i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.remove();
        //div.style.display = "none";
    }
}

function addList() {
    var li = document.createElement("li");
    var newItemVal = document.getElementById("myInput").value;
    var textObj = document.createTextNode(newItemVal);
    //console.log(document.getElementById("myInput"));
    li.appendChild(textObj);
    if( newItemVal == '') {
        alert("Please submit an actionable step towards your goal.");
    } else {
        document.getElementById("UList").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    // Now add X button
    var span = document.createElement("SPAN");
    var icon = document.createTextNode("\u00D7");
    span.className = "closeButton";
    span.appendChild(icon);
    li.appendChild(span);
    
    for( i = 0; i < close.length; i++ ) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.remove();
            //div.style.display = "none";
        }
    }
}
