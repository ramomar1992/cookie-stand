'use strict';
let clickNum = 0;
let darkModeBut = document.getElementById('darkMode');
let pEl = document.querySelector('p');
let actionEl = document.querySelector('body');
let defaultElP = pEl.style.color;
let defaultActionEl = actionEl.style.backgroundColor;
let defaultActionElColor = actionEl.style.color;

darkMode.addEventListener('click', function (e) {
    // console.log(defaultElP);
    // console.log(defaultActionEl);
    // console.log();
    if (clickNum == 0) {
        clickNum++;
        pEl.style.color = 'white';
        actionEl.style.backgroundColor = 'black';
        actionEl.style.color = 'white';
        darkModeBut.textContent = 'Normal Mode';

    } else if (clickNum == 1) {
        clickNum--;
        pEl.style.color = defaultElP;
        actionEl.style.backgroundColor = defaultActionEl;
        actionEl.style.color = defaultActionElColor;
                darkModeBut.textContent = 'Drak Mode';

    }
});