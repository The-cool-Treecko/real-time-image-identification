var previousResult = '';

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded() {
  console.log("model is loaded!");
}

function draw() {
  image(video,0,0,300,300);
  classifier.classify(canvas,gotResults);
}

function gotResults(error,results) {
  if (error) {
    console.error(error);
  }
  else {
    if(results[0].confidence > 0.5 && previousResult != results[0].label) {
      console.log(results);
      previousResult = results[0].label;
      document.getElementById("object").innerHTML = results[0].label;
      document.getElementById("accuracy").innerHTML = Math.round(results[0].confidence*100)+"%";
      synth = window.speechSynthesis;
      speak_data = new SpeechSynthesisUtterance("The object is "+results[0].label);
      synth.speak(speak_data);
    }
  }
}
