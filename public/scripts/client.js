/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = (tweet) => {
  var name = tweet["user"]["name"]
  var avatar = tweet["user"]["avatars"]
  var handle = tweet["user"]["handle"]
  var content = tweet["content"]["text"]
  var date = tweet["created_at"]
  
  console.log(name, avatar, handle, content, date)

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

renderTweets(data)




