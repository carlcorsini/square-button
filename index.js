document.addEventListener('DOMContentLoaded', () => {
    // initialize semantic dropdown
    $('.ui.dropdown')
        .dropdown();

    // turnYourLightsDownLow function
    //        * dims page *
    let turnYourLightsDownLow = () => {
        animating = true
        button.disabled = true
        $('.ui.dropdown').addClass("disabled");
        title.style.opacity = '0.25'
        scoreTitle.style.opacity = '0.1'
        document.body.style.backgroundColor = "#010106"
    }

    // letThereBeLight function
    // * reverses dim effect *
    let letThereBeLight = () => {
        $('.ui.dropdown').removeClass("disabled");
        title.style.opacity = '1'
        scoreTitle.style.opacity = '1'
        document.body.style.backgroundColor = '#0c1522'
        button.disabled = false
        animating = false
    }

    // select necessary html elements    
    let square = document.querySelector('#square')
    let theForm = document.querySelector('#theForm')
    let selectaAnimation = document.querySelector('#selectaAnimation')
    let selectaColor = document.querySelector('#selectaColor')
    let selectaRipple = document.querySelector('#selectaRipple')
    let button = document.querySelector('#changeColor')
    let title = document.querySelector('#title')
    let changeColorDiv = document.querySelector('#changeColorDiv')
    let scoreDiv = document.querySelector('#score')
    let scoreTitle = document.querySelector('#scoreTitle')

    $('#theForm').hide().fadeIn(4000)
    $('#titleLink').hide().fadeIn(5000)
    $('#bottom-left').hide().fadeIn(4000)

    // assign required variables
    let color = '#0c1522'
    let ripple = getRandomColor()
    let randomAnimation = true
    let randomRipple = true
    let random = true
    let animating = false
    let hovering = false
    let animations = ['spin', 'bounce', 'move']
    let animation = animations[Math.floor(Math.random() * animations.length)];
    let score = 0
    let highScore = false


    // ---------------------
    // hover event listeners
    // ---------------------

    square.classList.add('hover')
    setTimeout(() => {
        square.classList.remove('hover')
        document.body.style.backgroundColor = '#0c1522'
    }, 2000)
    setTimeout(() => {

        document.body.style.backgroundColor = '#0c1522'
    }, 1000)

    square.addEventListener('mouseover', () => {
        if (!animating) square.classList.add('hover')
        hovering = true
    })
    square.addEventListener('mouseout', () => {
        if (!animating) square.classList.remove('hover')
        hovering = false
    })

    changeColorDiv.addEventListener('mouseover', () => {
        hovering = true
    })
    changeColorDiv.addEventListener('mouseout', () => {
        hovering = false
    })

    // --------------------
    // form event listeners
    // --------------------

    selectaAnimation.addEventListener('change', (e) => {
        if (e.target.value == 'random') {
            randomAnimation = true
            animation = animations[Math.floor(Math.random() * animations.length)]
        } else {
            randomAnimation = false
            animation = e.target.value
        }
    })

    selectaColor.addEventListener('change', (e) => {
        if (e.target.value == 'random') {
            random = true

        } else if (e.target.value == 'keep') {
            random = false
        } else {
            color = e.target.value
            random = false
        }
    })

    selectaRipple.addEventListener('change', (e) => {
        if (e.target.value == 'random') {
            randomRipple = true
        } else if (e.target.value === 'keep') {
            randomRipple = false
        } else {
            ripple = e.target.value
            randomRipple = false
        }
    })




    theForm.addEventListener('submit', (e) => {
        e.preventDefault()
        turnYourLightsDownLow()
        animation = randomAnimation ? animations[Math.floor(Math.random() * animations.length)] : animation
        square.classList.add(animation)
        square.style.backgroundColor = random ? getRandomColor() : square.style.backgroundColor
        ripple = randomRipple ? getRandomColor() : ripple
        setTimeout(() => {
            letThereBeLight()
            square.classList.remove(animation)
        }, 4000)
    })

    // ---------------------
    // ripple event listener
    // ---------------------

    let fib = (num) => num <= 1 ? 1 : fib(num - 1) + fib(num - 2)

    $("body").click(function (e) {
        // Remove any old one
        $(".ripple").remove();

        // Setup
        var posX = $(this).offset().left,
            posY = $(this).offset().top - 38,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(this).prepend("<span class='ripple'></span>");
        $(".ripple").css('background', ripple)

        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;


        // Add the ripples CSS and start the animation
        if (!hovering) {
            $(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");

            if (highScore) {
                $('#scoreTitle').css('color', 'yellow')
                $('#scoreTitle').css('font-size', '1.2em')
                $('#scoreTitle').effect('shake', {
                    times: 4,
                    distance: 2,
                    queue: false
                }, 200)
                scoreDiv.innerHTML = 'HIGH SCORE!!'
            } else {
                console.log('no')
                scoreDiv.innerHTML = fib(Number(score))
                score++
                $('#score').effect('shake', {
                    times: 4,
                    distance: 2,
                    queue: false
                }, 400)
            }
            if (highScore || fib(Number(score)) > 2900000) {
                highScore = true
                scoreDiv.innerHTML = 'HIGH SCORE!!'
                $('#scoreTitle').css('color', 'yellow')
                $('#scoreTitle').css('font-size', '1.2em')
            } else {
                console.log('no')
                $('#score').prop('Counter', fib(Number(score - 1))).animate({
                    Counter: fib(Number(score))
                }, {
                    duration: 800,
                    easing: 'swing',
                    step: function (now) {
                        $('#score').text(Math.ceil(now));
                    },
                    queue: false
                });
            }
        }
    });
})

// random color function
// returns color string

let getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}