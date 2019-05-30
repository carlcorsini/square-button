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
    let button = document.querySelector('#changeColor')
    let title = document.querySelector('#title')
    let changeColorDiv = document.querySelector('#changeColorDiv')

    // assign required variables
    let animation = 'spin'
    let color = getRandomColor()
    let random = true
    let animating = false
    let hovering = false

    // ---------------------
    // hover event listeners
    // ---------------------

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
        e.preventDefault()
        turnYourLightsDownLow()
        square.classList.add(animation)
        square.style.backgroundColor = random ? getRandomColor() : color
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