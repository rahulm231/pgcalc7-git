

$( document ).ready(function() {
// http://perplexed.co.uk/596_expanding_textarea_as_you_type.htm
// .expandingtext
$('textarea').keyup(function(){
  while (this.rows > 1 && this.scrollHeight < this.offsetHeight){
    this.rows--;
  }
  var h = 0;
  while ((this.scrollHeight > this.offsetHeight || this.scrollHeight < 50) && h!==this.offsetHeight){
    h = this.offsetHeight;
    this.rows++;
  }
  this.rows++;
});
$('textarea').trigger('keyup'); // initialize to height of contents
});

