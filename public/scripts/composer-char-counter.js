$(document).ready(function() {

  // const count = $(".counter").html();
  // let = Number(count);
  // console.log(count);

  $("#tweet-text").on("keyup", function(){
    let output = $(this).next().children("output");
    let currentCount = this.value.length;
    let total = 140 - currentCount
    if(total < 0){
      output.val(total)
      output.css("color","red")
    }
    else {
      output.css("color","black")
      output.val(total)
    }
  })
});