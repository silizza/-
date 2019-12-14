let main = document.querySelector('.main');
let letters = document.querySelectorAll('.letter');

let chooseAllButton = document.getElementById('chooseAllButton');
let uppercaseButton = document.getElementById('uppercaseButton');
let lovercaseButton = document.getElementById('lowercaseButton');
       
let lowercaseLetter;
let container;

function showAlfabet() {

    main.innerHTML = '';

    for(let letter of letters) {        

        container = document.createElement('span');
        container.classList.add('container');
        lowercaseLetter = letter.textContent.toLowerCase();  

        container.append(letter, lowercaseLetter);
        main.append(container);

       container.onselectstart = function() {
            return false;
       }
    }
}

showAlfabet();

chooseAllButton.onclick = function() {
    showAlfabet();
    uppercaseButton.classList.remove('active');
    lowercaseButton.classList.remove('active');
    chooseAllButton.classList.add('active');
};

uppercaseButton.onclick = function() {
    uppercaseButton.classList.add('active');
    lowercaseButton.classList.remove('active');
    chooseAllButton.classList.remove('active');
    
    main.innerHTML = '';
    for(let letter of letters) {

        container = document.createElement('span');
        container.classList.add('container');        
        container.append(letter);
        main.append(container);
    }
};

lowercaseButton.onclick = function() {
    uppercaseButton.classList.remove('active');
    lowercaseButton.classList.add('active');
    chooseAllButton.classList.remove('active');
    
    main.innerHTML = '';

    for(let letter of letters) {        

        container = document.createElement('span');
        container.classList.add('container');
        lowercaseLetter = letter.textContent.toLowerCase();  

        container.append(lowercaseLetter);
        main.append(container);
    }
};

lovercaseButton.onselectstart = function() {
    return false;
};
    
uppercaseButton.onselectstart = function() {
    return false;
};

chooseAllButton.onselectstart = function() {
    return false;
};
