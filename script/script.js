 const textItems = [
  "I am a bug squasher",
  "I am a bug creator",
  "I am a developer",
  "I am a low-code enthusiast",
  "I am a Java lover"
 ];

 const textPeriod = 2000;

const textTyper = function(element, toRotate, period) {
  this.toRotate = toRotate;
  this.element = element;
  this.loopNumber = 0;
  this.period = period || 2000;
  this.text = "";
  this.tick();
  this.isDeleting = false;
}

textTyper.prototype.tick = function() {
  let i = this.loopNumber % this.toRotate.length;
  let fullText = this.toRotate[i];

  if(this.isDeleting) {
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    this.text = fullText.substring(0, this.text.length + 1);
  }

  this.element.textContent = this.text;

  let that = this;
  let delta = 200 - Math.random() * 100;

  if(this.isDeleting) {
    delta /= 2;
  }

  if(!this.isDeleting && this.text === fullText) {
    delta = this.period;
    this.isDeleting = true;
  } else if(this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.loopNumber++;
    delta = 500;
  }

  setTimeout(() => that.tick(), delta);
}

window.onload = function() {
  const textElement = document.querySelector(".typewrite");

  new textTyper(textElement, textItems, textPeriod)

}