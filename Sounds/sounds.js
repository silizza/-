let activeArray = [];
let i = 0;
for (let letter of letters) {
    if (letter.classList.contains('vowel') || letter.classList.contains('consonant')) {
        activeArray.push(letter);
    }
}

mix(activeArray);

main.append(activeArray[i]);

document.addEventListener('mousedown', function(event) {

    let activeLetter = event.target.closest('.letter');
    
    let activeDropable = null;

    if(!activeLetter) return;

    let initialCoords = activeLetter.getBoundingClientRect();    

    event.preventDefault();

    activeLetter.ondragstart = function() {
        return false;
    }

    let shiftX, shiftY;

    startDrag(activeLetter, event.clientX, event.clientY); 
    
    function onMouseUp(event) {
        finishDrag();
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);

        activeLetter.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        activeLetter.hidden = false;

        if (!elemBelow) return;

        let dropableBelow = elemBelow.closest('.container');

        if (activeDropable != dropableBelow) {

            if (activeDropable) {
                activeDropable.classList.remove('active');
            }

            activeDropable = dropableBelow;

            if (activeDropable) {
                activeDropable.classList.add('active');
            }
        }              
    }    

    function startDrag (elem, clientX, clientY) {

        document.addEventListener('mousemove', onMouseMove);
        elem.addEventListener('mouseup', onMouseUp);
       

        shiftX = clientX - elem.getBoundingClientRect().left;
        shiftY = clientY - elem.getBoundingClientRect().top;

        elem.style.position = 'fixed';       

        moveAt(clientX, clientY);
    };

    function finishDrag() {   
        
        document.removeEventListener('mousemove', onMouseMove);
        activeLetter.removeEventListener('mouseup', onMouseUp);
                    
        if(!activeDropable) {
            activeLetter.style.position = 'static';  
            return;
        }

        activeDropable.classList.remove('active');
        
        if ((activeLetter.classList.contains('vowel') && activeDropable.classList.contains('vowels')) ||
            (activeLetter.classList.contains('consonant') && activeDropable.classList.contains('consonants'))) {
                
                activeLetter.classList.add('falling');
                activeDropable.classList.add('target');
                
                setTimeout( function() {
                    activeLetter.style.position = 'static';  
                   
                    activeLetter.classList.remove('falling'); 
                    activeDropable.classList.remove('target');                   
                    showNextLetter();
                    
                }, 1000);
        } else {
            activeLetter.style.position = 'static';  
            return;
        }        
        
        activeDropable.classList.remove('active');
    }

    function moveAt(clientX, clientY) {
       
        if ((clientY > document.documentElement.clientHeight) ||       
            (clientY < 0) ||             
            (clientX > document.documentElement.clientWidth) ||    
            (clientX < 0)) {
                finishDrag();
                return;
        }

        let newX = clientX - shiftX;
        let newY = clientY - shiftY;

        activeLetter.style.left = newX + 'px';
        activeLetter.style.top = newY + 'px';
    }
});

function showNextLetter() {
    main.innerHTML = '';
    if (i == activeArray.length - 1) {
        showMessage('Молодец!', 'Ты правильно сложил все буквы!');
        mix(activeArray);
        i = 0;
    } else {    
        i++;
    }
    main.append(activeArray[i]);
}