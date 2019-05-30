document.addEventListener('DOMContentLoaded', () => {
    $('.ui.dropdown')
        .dropdown();

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let square = document.querySelector('#square')
    let theForm = document.querySelector('#theForm')
    let animation = 'spin'
    let color = getRandomColor()
    let random = true

    let selectaAnimation = document.querySelector('#selectaAnimation')
    let selectaColor = document.querySelector('#selectaColor')
    let button = document.querySelector('#changeColor')

    selectaAnimation.addEventListener('change', (e) => {

        animation = e.target.value
    })


    selectaColor.addEventListener('change', (e) => {
        if (e.target.value == 'random') {
            random = true

        } else {
            color = e.target.value
            random = false
        }
    })

    theForm.addEventListener('submit', (e) => {
        button.disabled = true
        e.preventDefault()
        square.classList.add(animation)
        square.style.backgroundColor = random ? getRandomColor() : color
        setTimeout(() => {
            square.classList.remove(animation)
            button.disabled = false
        }, 4000)
    })


})