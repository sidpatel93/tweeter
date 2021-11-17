/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const createTweetElement = (tweet) => {
    var name = tweet["user"]["name"]
    var avatar = tweet["user"]["avatars"]
    var handle = tweet["user"]["handle"]
    var content = tweet["content"]["text"]
    var date = tweet["created_at"]
    
    var tweetHTML = $(`<article>
    <header>
      <div>          
        <img src=${avatar}>
        <span>${name}</span>
      </div>
      <span>${handle}</span>
    </header>
    <div>
      <p>${escape(content)}</p>
    </div>
    <footer>
      <span> ${timeago.format(date)}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`)
  
    $('.tweets-section').append(tweetHTML)
    return tweetHTML
  
  }
  
  const renderTweets = (arrOfTweets) => {
    for(var obj of arrOfTweets){
       var newTweet = createTweetElement(obj);
       $(".tweets-section").prepend(newTweet);
    }
  }

  const loadtweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets"
    })
    .then(function(data){
      $('.tweets-section').empty()
      renderTweets(data);
    })
  }

  loadtweets();
    
  $(".new-tweet form").submit(function(event){
    event.preventDefault()
    var textarea = $('#tweet-text')
    var form = $('.new-tweet form')
    var errorDiv = $(".error");

    if(textarea.val().length > 140) {
      errorDiv.html("<p> ⚠ Charater count exceed the max limit of 140 characters. ⚠ </p>")
      errorDiv.show()
    }

    else if(textarea.val().length === 0) {
      errorDiv.html("<p> ⚠ Text field can not be empty. ⚠ </p>")
      errorDiv.show()
    }

    else {
      var dataToput = form.serialize()
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: dataToput,
      })
      .then(function(res){
          loadtweets();
      })    
      }
      textarea.val('');
    }
  )

  $('#tweet-text').on('click', function() {
    var errorDiv = $(".error");
    errorDiv.hide();
    let output = $(this).next().children("output");
    output.val(140)
    output.css("color","black")
  })

  const escape = function(userInput) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(userInput));
    return div.innerHTML;
  }

})