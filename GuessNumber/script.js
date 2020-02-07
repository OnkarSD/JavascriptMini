const msg1 = document.getElementById("msg");

const randomNum = getRandomNumber();
console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//begin

recognition.start();

//user number captured

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msg1.innerHTML = `
    <div>You Said : </div>
    <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
    const num = +msg;

    //if number
    if(Number.isNaN(num)){
        msg1.innerHTML += '<div>Not A valid Number Buddy !!</div>';
        return;
    }

    //range
    if(num >100 || num<1) {
        msg1.innerHTML = '<div>Number must be Between 1--100</div>';
        return;
    }

    //check num
    if(num === randomNum){
        document.body.innerHTML = `
        <h2>Yes! Yes! Yes!<br><br>
        It Was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum) {
        msg1.innerHTML += '<div>Go Lower</div>';
    
    }else{
        msg1.innerHTML += '<div> Go Higher</div>';
    }
}


function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result

recognition.addEventListener("result", onSpeak);

// End of Service

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {

    if(e.target.id == 'play-again'){
        window.location.reload();
    }

});