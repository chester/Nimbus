'use strict';

var data;

$(document).ready(function() {
    initializePage();
})

function initializePage() {

    var data = JSON.parse(sessionStorage.getItem('stepsData'));
    //console.log(data);

    $(document.body).append(data);

    
   
   // html = $('#progressHandlebar').html();
   // template = Handlebars.compile(html);

   // appendText = template(data);
   // $('#data').html(appendText);
}

$('#affirm').click(function() {
   gtag('event', 'click', {
  'event_category': 'affirmation'});
});