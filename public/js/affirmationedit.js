'use strict';

$(document).ready(function() {
    initializePage();
})

function initializePage() {
    console.log("Javascript for Reflect Connected");
    var items = sessionStorage.getItem('affirmationsList');
    var parsedItems = JSON.parse(items);
    var i;
    for( i = 0; i < parsedItems.length; i++) {
        var li = document.createElement("li");
        var newItemVal = parsedItems[i];
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
    var itemsArray = [];
    var i;
    for( i = 0; i < testArray.length; i++) {
        itemsArray.push(testArray[i].childNodes['0'].data);
    }
   // console.log(testArray);
    console.log(itemsArray.length);

    sessionStorage.setItem('affirmationsList', JSON.stringify(itemsArray));
   // $.get('/selectReflect');

}

// close button
var listedItems = document.getElementsByTagName("LI");
var i;
for (i = 0; i < listedItems.length; i++) {
    var span = document.createElement("SPAN");
    var icon = document.createTextNode("\u200B");
    span.className = "closeButton";
    span.appendChild(icon);
    listedItems[i].appendChild(span);
    console.log("Added");
}

//close action
var close = document.getElementsByClassName("closeButton");
var i;
for ( i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        //div.style.display = "none";
        div.remove();
        console.log("CLOSEE");
    }
}

function addList() {
    var li = document.createElement("li");
    var newItemVal = document.getElementById("myInput").value;
    var textObj = document.createTextNode(newItemVal);
    console.log(document.getElementById("myInput"));
    li.appendChild(textObj);
    if( newItemVal == '') {
        alert("Please write an affirmation for yourself.");
    } else {
        document.getElementById("UList").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    // Now add X button
    var span = document.createElement("SPAN");
    var icon = document.createTextNode("\u200B");
    span.className = "closeButton";
    span.appendChild(icon);
    li.appendChild(span);
    
    for( i = 0; i < close.length; i++ ) {
        close[i].onclick = function() {
            var div = this.parentElement;
            //div.style.display = "none";
            div.remove();
        }
    }
}
