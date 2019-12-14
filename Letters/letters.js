let lettersSize = document.getElementById('size');
let lettersOrder = document.getElementById('order');
let index = 0;
let activeArray = mix(Array.from(document.querySelectorAll('.letter')));

lettersOrder.value = 'randomly';
lettersSize.value = 'uppercase';
selectTime.value = 'notSelected';

main.innerHTML = activeArray[index].innerHTML;

function showLetter() {

    if (lettersSize.value == 'uppercase') {
        main.innerHTML = activeArray[index].innerHTML;
    } else {
        main.innerHTML = activeArray[index].innerHTML.toLowerCase();
   }
}

lettersOrder.onchange = function() {
    
    if(this.value == 'in_order') {
        activeArray = letters;
    } else {
        activeArray = mix(Array.from(document.querySelectorAll('.letter')));
    }
    index = 0;
    showLetter();
}

lettersSize.onchange = function() {
    showLetter();
}

okButton.onclick = function(){
     
    if (index == activeArray.length - 1) {
        if (lettersOrder.value == 'randomly') {
            activeArray = mix(activeArray);
        }       
        index = 0;        
    } else {
        index ++;
    }

    showLetter();

    if(timer) counter ++;
};

prevButton.onclick = function() {

    if (index == 0) {
        showLetter();
        return;
    }

    index --;
    showLetter();
};

skipButton.onclick = function() {
    
    if (index == activeArray.length - 1) {
        if (lettersOrder.value == 'randomly') {
            activeArray = mix(activeArray);
        }   
        index = 0;
    } else {
        index ++;
    }

    showLetter(activeArray);
}

selectTime.onchange = onSelectTime;

stopButton.onclick = cancelStopwatch;

function defineLastWordOfMessage(counter) {
    if (counter > 10 && counter < 20)  return 'букв';
    
    let lastNumber = counter % 10;

    if(lastNumber == 0) return 'букв';

    if (lastNumber == 1) return 'букву';

    if (lastNumber >= 2 && lastNumber <= 4) return 'буквы';

    if (lastNumber >= 5 && lastNumber <= 9) return 'букв';
}
