let main = document.querySelector('.main');
let letters = Array.from(document.querySelectorAll('.letter'));

let okButton = document.getElementById('okButton');
let prevButton = document.getElementById('prevButton');

let selectTime = document.getElementById('selectTime');
let selectComplexity = document.getElementById('complexity');

let newHeader = document.getElementById('newHeader');
let stopButton = document.getElementById('stopButton');
let skipButton = document.getElementById('skipButton');
let stopwatch = document.getElementById('stopwatch');

let continueButton = document.getElementById('continueButton');

let startButton, cancelButton;

let timerID, readTimer;

let timer;

let counter = 0;

let buttons = document.querySelectorAll('.button');
for( let button of buttons) {
    button.onselectstart = function() {
        return false;
    }
}

main.onselectstart = function() {
    return false;
}
function mix(arr) {
    return arr.sort(() => {return Math.random() - 0.5});
}

function getRandomLetter(arr) {
    let index = Math.floor(Math.random() * (arr.length - 1));
    return arr[index];
}

function onSelectTime() {

    switch (selectTime.value) {
        case 'notSelected':
            timer = null;
            return;
            break;
        case '30sec':
            timer = 30000;            
            break;
        case '1min':
            timer = 60000;
            break;
        case '2min':
            timer = 120000;
            break;
        case '3min':
            timer = 180000;
            break
    }
    
    let dialogWindow = document.createElement('div');
    dialogWindow.className = 'startWindow';
    dialogWindow.insertAdjacentHTML('afterbegin','<button id="startButton" class="button ok">Старт</button><button id="cancelButton" class = "button cancel">Отмена</button>');
    area.append(dialogWindow);

    startButton = document.getElementById('startButton');
    cancelButton = document.getElementById('cancelButton');

    startButton.onclick = function() {
        dialogWindow.remove();
        ReadByTime(timer).then(counter => showMessage('Время вышло!', `Прочитано ${counter} ${defineLastWordOfMessage(counter)}`));
    }

    cancelButton.onclick = function() {
        dialogWindow.remove();
        selectTime.value = 'notSelected';  
    }
}

function runStopwatch(){

    newHeader.style.display = 'flex';    

    let mm = '00';
    let ss = '00';        
    stopwatch.innerHTML = mm + ':' + ss;

    let start = new Date(); 
    timerID = setInterval (function() {
        let ms = new Date() - start;
        
        mm = new Date(ms).getMinutes();
        ss = new Date(ms).getSeconds();

        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;
        stopwatch.innerHTML = mm +':'+ ss;        
    }, 500);
}

function stopStopwatch(timerID) {   
    
    clearInterval(timerID);
   
    stopwatch.innerHTML = null;   
    selectTime.value = 'notSelected';
    newHeader.style.display = 'none';
    
    prevButton.hidden = false;    
}


let ReadByTime = timer => { return new Promise(
    function(resolve, reject) {
        counter = 0;
        skipButton.hidden = false;
        prevButton.hidden = true;
        runStopwatch();
        readTimer = setTimeout(function() {
            stopStopwatch(timerID);
            skipButton.hidden = true;
            resolve(counter);
        }, timer);        
    });
};

function cancelStopwatch() {
    skipButton.hidden = true;
    stopStopwatch(timerID);
    clearTimeout(readTimer);
}

let balloons = document.querySelectorAll('.balloon');
let balloonsWindow = document.getElementById('balloonsWindow');
let titleMessage = document.getElementById('titleMessage');
let mainMessage = document.getElementById('mainMessage');


function showMessage(string1, string2) {
    titleMessage.innerHTML = string1;
    mainMessage.innerHTML = string2;
    balloonsWindow.classList.add('active');
    for (let balloon of balloons) {
        balloonFly(balloon);
        balloon.addEventListener('transitionend', function() {
            balloonFly(balloon);       
        });
    }
}

function balloonFly(balloon) {      
    let balloonTop = balloon.getBoundingClientRect().top; 
      
    let percentageTop = (balloonTop / document.documentElement.clientHeight) * 100;
    
    if (percentageTop < -11) {
        balloon.hidden = true;
        balloon.style.top = document.documentElement.clientHeight + 'px';        
        balloon.hidden = false;
        return balloonFly(balloon);        
    }

    balloon.style.top = (percentageTop - 20) + '%';   
}

continueButton.onclick = function () {
    balloonsWindow.classList.remove('active');
}