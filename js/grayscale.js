/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
$.ajax({
  url: "https://rieanna-portraits.firebaseio.com/reviews.json",
}).done(function(data){
  console.log(data);
  
  var html_string = "";
  var reviewString = "<h2>Write a Review</h2><input id='name' type='text' class='btn-default form-control' style='color: white; font-size: 1.4em;' placeholder='Your Name'><textarea id='content' class='btn-default form-control' style='color: white; font-size: 1.4em;' placeholder='Your Review'></textarea><select id='rating' class='btn-default form-control' style='color: white; font-size: 1.4em;'><option selected='selected' value='5'>5</option><option value='4'>4</option><option value='3'>3</option><option value='2'>2</option><option value='1'>1</option></select><button id='send' class='btn btn-default btn-lg'>Submit Review</button>";
  for (var key in data) {
    console.log(key);
    console.log(data[key]);
    html_string += "<div class='review'><h4>" + data[key].name + "</h4>" + "<p>" + data[key].content + "</p>" + data[key].rating + "</div>";
  }
  $('#map').html(html_string);
  $('#map').append(reviewString);
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

$('#send').on("click", function(){
  postReview();
});

function postReview(){
  var review = {
    name: $('#name').val(),
    content: $('#content').val(),
    rating: $('#rating').val()
  };
  console.log(review);

  $.ajax({
    url: "https://rieanna-portraits.firebaseio.com/reviews.json",
    data: JSON.stringify(review),
    method: "POST"
  }).done(function(data){
    console.log(data);
  });
}