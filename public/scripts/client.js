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
      <p>${content}</p>
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
       $(".tweets-section").append(newTweet);
    }
  }
  
  $(".new-tweet form").submit(function(event){
    event.preventDefault()
  
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: $(this).serialize()
    })
  
  })

  const loadtweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets"
    })
    .then(function(data){
      renderTweets(data);
    })
  }

  loadtweets();

})