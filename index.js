document.addEventListener('DOMContentLoaded', () => {

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let square = document.querySelector('#square')

    let button = document.querySelector('#changeColor')

    button.addEventListener('click', () => {
        if (square.style.backgroundColor == 'white') {
            square.style.backgroundColor = 'blue'
        } else {
            square.style.backgroundColor = 'white'
        }
    })


})