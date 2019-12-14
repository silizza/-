let menu = document.getElementById('menu');
let round_button = document.getElementById('round_button');
let navigation = document.getElementById('navigation');
let modalWindow = document.querySelector('.modal');

round_button.onclick = toggleMenu;
modalWindow.onclick = toggleMenu;

function toggleMenu() {
    menu.classList.toggle('active');
    modalWindow.classList.toggle('active');
}

function getRandomLetter(arr) {
    let index = Math.floor(Math.random() * (arr.length - 1));
    return arr[index].innerHTML;
}