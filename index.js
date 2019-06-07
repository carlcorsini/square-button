document.addEventListener('DOMContentLoaded', () => {

    setTimeout(function () {
        window.scrollTo(0, 300);
    }, 200);


    let getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function play(sound) {
        var audio = document.createElement('audio');
        audio.src = `assets/audio/${sound}.wav`;
        audio.addEventListener("ended", function () {
            document.removeChild(this);
        }, false);
        audio.play();
    }




    let color = '#0c1522'
    let background = '#0c1522'
    let border = 'aliceblue'
    let ripple = getRandomColor()
    let randomAnimation = true
    let randomRipple = true
    let randomBackground = true
    let randomBorder = true
    let random = true
    let animating = false
    let squaring = false
    let animations = ['spin', 'bounce', 'move', 'wrapAround']
    let animation = animations[Math.floor(Math.random() * animations.length)];

    let initiateSquare = () => {
        Math.random() < 0.5 ? $('#square').addClass('shakerSquare') : $('#square').addClass('shaker')
    }

    let denitiateSquare = () => {
        $('#square').removeClass('shakerSquare shaker')
    }


    bell.play()
    bell.pause()

    initiateSquare()

    setTimeout(() => {
        document.body.style.backgroundColor = '#0c1522'
    }, 2000)

    $('#square').fadeIn(5000)

    let turnYourLightsDownLow = () => {
        animating = true
        document.body.style.backgroundColor = "#010106"
    }

    let letThereBeLight = () => {
        animating = false
        document.body.style.backgroundColor = '#0c1522'
        initiateSquare()
    }

    // ******************************************************************************
    // ******************************************************************************
    // the square
    // ******************************************************************************
    // ******************************************************************************


    square.addEventListener('touchstart', (e) => {
        squaring = true

        if (!animating) {
            play('bellMobile')
            denitiateSquare()
            animating = true
            e.preventDefault()
            turnYourLightsDownLow()
            animation = randomAnimation ? animations[Math.floor(Math.random() * animations.length)] : animation
            square.classList.add(animation)
            square.style.backgroundColor = random ? getRandomColor() : color
            ripple = randomRipple ? getRandomColor() : ripple
            square.style.borderColor = randomBorder ? getRandomColor() : border

            setTimeout(() => {
                if (animation == 'wrapAround' || animation == 'spin') {
                    setTimeout(() => {
                        squaring = false
                        letThereBeLight()
                        square.classList.remove(animation)
                        document.body.style.backgroundColor = randomBackground ? getRandomColor() : background
                        setTimeout(() => {
                            animating = false
                        }, 12000)
                    }, 6000)

                } else {
                    squaring = false
                    letThereBeLight()
                    square.classList.remove(animation)
                    document.body.style.backgroundColor = randomBackground ? getRandomColor() : background
                    setTimeout(() => {
                        animating = false
                    }, 6000)
                }

            }, 4000)
        }
    })



    jQuery.event.special.touchstart = {
        setup: function (_, ns, handle) {
            this.addEventListener("touchstart", handle, {
                passive: false
            });
        }
    };


    // ******************************************************************************
    // ******************************************************************************
    // The Click
    // ******************************************************************************
    // ******************************************************************************


    $("body").on({
        'touchstart': function (e) {
            e.preventDefault()

            if (animating) $(".ripple").remove();
            // Setup
            var posX = $(this).offset().left,
                posY = $(this).offset().top
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

            if (squaring) {

                $(".ripple").css({
                    borderRadius: '5%',
                    width: buttonWidth,
                    height: buttonHeight,
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("rippleEffect");

            } else {
                $(".ripple").css({
                    width: buttonWidth,
                    height: buttonHeight,
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("rippleEffect");

            }

        }
    });

})

// function setIntervalX(callback, delay, repetitions) {
//     var x = 0;
//     var intervalID = window.setInterval(function () {

//         callback();

//         if (++x === repetitions) {
//             window.clearInterval(intervalID);
//         }
//     }, delay);
// }