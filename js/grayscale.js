/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
 var code = "";
$.ajax({
  url: "https://rieanna-portraits.firebaseio.com/code.json",
}).done(function(data){
  code = data;
});


// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(document).on("click", "#send", function(){
  postReview();
});



//////////////////////////////////////////
//////////////////////////////////////////
$.ajax({
  url: "https://rieanna-portraits.firebaseio.com/reviews.json",
}).done(function(data){
  var html_string = "";
  var reviewString = "<div id='review'><h2>Write a Review</h2><input id='code' class='btn-default form-control middle' type='text' style='width: 170px; color: white; font-size: 1.4em;' placeholder='Your Code'><input id='name' type='text' class='btn-default form-control' style='color: white; font-size: 1.4em;' placeholder='Your Name'><textarea id='content' class='btn-default form-control' style='color: white; font-size: 1.4em;' placeholder='Your Review'></textarea><select id='rating' class='btn-default form-control' style='color: white; font-size: 1.4em;'><option selected='selected' value='5'>5</option><option value='4'>4</option><option value='3'>3</option><option value='2'>2</option><option value='1'>1</option></select><button id='send' class='btn btn-default btn-lg'>Submit Review</button></div>";
  for (var key in data) {
    console.log(key);
    console.log(data[key]);
    html_string += ReviewTemplate(data[key].name, data[key].content, data[key].rating, data[key].date);
  }
  $('#map').html("<div class='review'>" + html_string + "</div>");
  $('#map').append(reviewString);
  $('#map').prepend("<h2>Reviews</h2>");
  $('#map').append("<div id='message'></div>");
});

function postReview(){
  var review = {
    name: $('#name').val(),
    content: $('#content').val(),
    rating: $('#rating').val(),
    date: (new Date()).toTimeString()
  };
  console.log(review);

  var message = $('#message');
  if($('#code').val() === code){
    if(review.name !== "" && review.content !== ""){
      $.ajax({
        url: "https://rieanna-portraits.firebaseio.com/reviews.json",
        data: JSON.stringify(review),
        method: "POST"
      }).done(function(data){
        console.log(data);
        $('#review').html(ReviewTemplate(review.name, review.content, review.rating, review.date));
        message.html(ReturnHTMLMessage("Thank You"));
      });
    }else{
      message.html(ReturnHTMLMessage("Please fill in all fields."));
    }
  }else{
    message.html(ReturnHTMLMessage("Wrong Code. Try Again."));
  }
}

function ReviewTemplate(name, content, rating, date){
  return "<div class='review' style='color: white;'><h3>" + name + "</h3>" + "<p>" + content + "</p>" + "<p style='color: grey;'>" + date + "</p>" + "</div>";
}

function ReturnHTMLMessage(message){
  return "<h3 class='middle' style='color: #42dca3;'>" + message + "</h3>";
}