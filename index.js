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
        title.style.opacity = '0.5'
        document.body.style.backgroundColor = "#010106"
    }

    // letThereBeLight function
    // * reverses dim effect *
    let letThereBeLight = () => {
        $('.ui.dropdown').removeClass("disabled");
        title.style.opacity = '1'
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

    $('#theForm').hide().fadeIn(4000)
    $('#titleLink').hide().fadeIn(5000)



    // assign required variables
    let color = getRandomColor()
    let ripple = getRandomColor()
    let randomAnimation = true
    let randomRipple = true
    let random = true
    let animating = false
    let hovering = false
    let animations = ['spin', 'bounce', 'move']
    let animation = animations[Math.floor(Math.random() * animations.length)];

    // ---------------------
    // hover event listeners
    // ---------------------

    square.classList.add('hover')
    setTimeout(() => {
        square.classList.remove('hover')
    }, 2000)

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
        square.style.backgroundColor = random ? getRandomColor() : color
        ripple = randomRipple ? getRandomColor() : ripple
        setTimeout(() => {
            letThereBeLight()
            square.classList.remove(animation)
        }, 4000)
    })

    // ---------------------
    // ripple event listener
    // ---------------------

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