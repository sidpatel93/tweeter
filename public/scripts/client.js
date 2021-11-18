/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const createTweetElement = (tweet) => {
    let name = tweet["user"]["name"];
    let avatar = tweet["user"]["avatars"];
    let handle = tweet["user"]["handle"];
    let content = tweet["content"]["text"];
    let date = tweet["created_at"];
    
    let tweetHTML = $(`<article>
    <header>
      <div>          
        <img src=${avatar}>
        <span>${name}</span>
      </div>
      <span>${handle}</span>
    </header>
    <div>
      <p><strong>${escape(content)}</strong></p>
    </div>
    <footer>
      <span> ${timeago.format(date)}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  
    $('.tweets-section').append(tweetHTML);
    return tweetHTML;
  
  };
  
  const renderTweets = (arrOfTweets) => {
    for (let obj of arrOfTweets) {
      let newTweet = createTweetElement(obj);
      $(".tweets-section").prepend(newTweet);
    }
  };

  const loadtweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets"
    })
      .then(function(data) {
        $('.tweets-section').empty();
        renderTweets(data);
      });
  };

  loadtweets();
    
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    let textarea = $('#tweet-text');
    let outputCount = $('#tweet-text').next().children("output");
    let form = $('.new-tweet form');
    let errorDiv = $(".error");

    if (textarea.val().length > 140) {
      errorDiv.html("<p> ⚠ Charater count exceed the max limit of 140 characters. ⚠ </p>");
      errorDiv.show();
    } else if (textarea.val().length === 0) {
      errorDiv.html("<p> ⚠ Text field can not be empty. ⚠ </p>");
      errorDiv.show();
    } else {
      let dataToput = form.serialize();
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: dataToput,
      })
        .then(function(res) {
          loadtweets();
        });
    }
    textarea.val('');
    outputCount.val(140);
    outputCount.css("color","black");
  }
  );

  $('#tweet-text').on('click', function() {
    let errorDiv = $(".error");
    errorDiv.hide();
    let output = $(this).next().children("output");
    output.val(140);
    output.css("color","black");
  });

  const escape = function(userInput) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(userInput));
    return div.innerHTML;
  };

  $('.navicon').on('click', function() {
    let form = $(".new-tweet form");
    form.show();
  });

});