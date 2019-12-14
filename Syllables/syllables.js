let vowels = Array.from(document.querySelectorAll('.vowel'));
let consonants = Array.from(document.querySelectorAll('.consonant'));
let gutturals = Array.from(document.querySelectorAll('.guttural'));
let hissing = Array.from(document.querySelectorAll('.hissing'));

let setOfSyllables = new Set();
let array = [];
let index = 0;

 //'ь','ы','ь' can't be first letters
let possibleFirstLetters = letters.concat();
possibleFirstLetters.splice(27, 3);

fillInSetOfSyllables();
showSyllable();

selectComplexity.onchange = function() {
   fillInSetOfSyllables();
   showSyllable();
};

okButton.onclick = function() { 
           
    if (index == array.lenth - 1) {        
        fillInSetOfSyllables();
    } else {
        index ++;
    }

    showSyllable();    

    if(timer) counter ++;    
}

prevButton.onclick = function() {
    if (index == 0) {
        showSyllable(); 
        return;      
    }

    index --;
    showSyllable();
};

selectTime.onchange = onSelectTime;

skipButton.onclick = function() {
    if (index == array.lenth - 1) {        
        fillInSetOfSyllables();
    } else {
        index ++;
    }

    showSyllable();    
};

stopButton.onclick = cancelStopwatch;

function getFirstLetter () {   
    return getRandomLetter(possibleFirstLetters);
}

function getSecondLetter(firstLetter) {
    
    //exclude swear words
    if (firstLetter.innerHTML == 'Ё') {
        return getRandomLetter(consonants.filter(letter => letter.innerHTML != 'Б'));
    }
    
    //leters 'а' or 'о' after 'й'
    if (firstLetter.innerHTML == 'Й') {
        return getRandomLetter([letters[0], letters[15]]);
    }

    //if first letter is 'г', 'к' or 'х'
    if (firstLetter.classList.contains('guttural')) {
        return getRandomLetter(vowels.filter(letter =>
             letter.innerHTML != 'Ё' &&
             letter.innerHTML != 'Ю' &&
             letter.innerHTML != 'Я' &&
             letter.innerHTML != 'Э' &&
             letter.innerHTML != 'Ы'));
    }

    
    //if first letter is 'ш', 'ч', 'ж' or 'щ'
    if (firstLetter.classList.contains('hissing')) {
        return getRandomLetter(vowels.filter(letter =>
            letter.innerHTML != 'О' &&
            letter.innerHTML != 'Ю' &&
            letter.innerHTML != 'Я' &&
            letter.innerHTML != 'Э' &&
            letter.innerHTML != 'Ы'));
    }

    if (firstLetter.classList.contains('vowel')) {
        return getRandomLetter(consonants);
    }
  
    return getRandomLetter(vowels);   
}

function getThirdLetter (first, second) {
    
    //exclude swear words
    if (first.innerHTML == 'Х' && second.innerHTML == 'У') {
            return getRandomLetter(consonants.filter(letter =>
                letter.innerHTML != 'Й'));
    }        
    
    //letter 'к' after 'ш', 'ч', 'ж' and 'щ'
    if (second.classList.contains('hissing')) {       
            return letters[11];
        }
    

    if (second.innerHTML == 'Й') {
        return getRandomLetter(consonants);
    }

    //letter 'с' after  'к', 'г' or 'х'
    if (second.classList.contains('guttural')) {
        return letters[18];
    }

    // 'ь' after rest consonants
    if (second.classList.contains('consonant')) {
        return letters[29];
    }

    //if second letter is vowel
    return getRandomLetter(consonants);
}

function getMiddleSyllable() {

    let letter_1 = getFirstLetter();    
    let letter_2 = getSecondLetter(letter_1);  
    let letter_3 = getThirdLetter(letter_1, letter_2);
    
    return letter_1.innerHTML + letter_2.innerHTML + letter_3.innerHTML;
}

function getSimpleSyllable() {

    let letter_1 = getFirstLetter();    
    let letter_2 = getSecondLetter(letter_1);

    return letter_1.innerHTML + letter_2.innerHTML;
}

function getComplexSyllable() {

    let complConsArr = ['ВБР', 'ПР', 'ВЗД', 'ВКЛ', 'ШКР', 'ВПР', 'ВСМ', 'ВСТ', 'ВТР', 'ЗБР', 'ЗДР', 'СКЛ', 'СКР', 'СПР', 'СТР'];

    let beginning = getRandomLetter(complConsArr);
    let ending = getRandomLetter(vowels).innerHTML;

    return beginning + ending;
}

function fillInSetOfSyllables() {

    setOfSyllables.clear();
    index = 0;

    switch (selectComplexity.value) {
        case 'simple':
            while (setOfSyllables.size < 200) {
                setOfSyllables.add(getSimpleSyllable());
            }
            break;
        case 'middle':
            while (setOfSyllables.size < 200) {
                setOfSyllables.add(getMiddleSyllable());
            }
            break;
        case 'complex':
            while (setOfSyllables.size < 100) {
                setOfSyllables.add(getComplexSyllable());
            }
            break;
        case 'different':
            while (setOfSyllables.size < 200) {
                setOfSyllables.add(getSimpleSyllable());         setOfSyllables.add(getMiddleSyllable());
                setOfSyllables.add(getSimpleSyllable());
                setOfSyllables.add(getComplexSyllable());
                setOfSyllables.add(getMiddleSyllable());   
            }
            break;
    }

    array = Array.from(setOfSyllables);

}

function showSyllable() {   
    
    main.innerHTML = array[index];
  
}


fillInSetOfSyllables();
showSyllable();


function defineLastWordOfMessage(counter) {
    if (counter > 10 && counter < 20)  return 'слогов';
    
    let lastNumber = counter % 10;

    if(lastNumber == 0) return 'слогов';

    if (lastNumber == 1) return 'слог';

    if (lastNumber >= 2 && lastNumber <= 4) return 'слога';

    if (lastNumber >= 5 && lastNumber <= 9) return 'слогов';
}
