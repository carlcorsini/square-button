document.addEventListener('DOMContentLoaded', () => {
    // -----------
    // helpers
    // -----------

    // Credit:
    // https://stackoverflow.com/a/1484514
    let getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let playClick = () => {
        if (!muting) {
            playSound('assets/audio/click.wav', 1)
        }
    }

    let muteAll = () => {
        var sounds = document.querySelector('#allAudio')
        sounds.pause()
    }

    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // Variable Land
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************

    // select necessary html elements    
    let square = document.querySelector('#square')
    let theForm = document.querySelector('#theForm')
    let selectaAnimation = document.querySelector('#selectaAnimation')
    let selectaColor = document.querySelector('#selectaColor')
    let selectaRipple = document.querySelector('#selectaRipple')
    let button = document.querySelector('#changeColor')
    let title = document.querySelector('#title')
    let bottomRight = document.querySelector('#bottom-right')
    let scoreBox = document.querySelector('#scoreBox')
    let womp = document.querySelector('#womp')
    let drip = document.querySelector('#drip')
    let soundOn = document.querySelector('#soundOn')
    let rasta = document.querySelector('#rasta')
    let homerun = document.querySelector('#homerun')
    let special = document.querySelector('#special')
    let changeColorDiv = document.querySelector('#changeColorDiv')
    let modal = document.querySelector('#modal')
    let helpModal = document.querySelector('#helpModal')
    let freeButton = document.querySelector('#free')
    let storyButton = document.querySelector('#story')
    let closeMenu = document.querySelector('#closeMenu')
    let intro = document.querySelector('#intro')
    let reset = document.querySelector('#reset')
    let ps2 = document.querySelector('#ps2')
    let help = document.querySelector('#help')

    // assign required variables
    let free = localStorage.getItem('free') || false
    let introing = localStorage.getItem('intro') || false
    let color = '#0c1522'
    let background = '#0c1522'
    let border = 'aliceblue'
    let ripple = getRandomColor()
    let randomAnimation = true
    let randomRipple = true
    let randomBackground = true
    let randomBorder = true
    let random = true
    let randomWinnerBoo = false
    let animating = false
    let hovering = false
    let squaring = false
    let modaling = false
    let animations = ['spin', 'lift', 'move', 'wrapAround']
    let animation = animations[Math.floor(Math.random() * animations.length)];
    let score = 0
    let highScore = false
    let winner = 0
    let pitch = 1
    let modifier = 5
    let fibula = []
    let chosenValue
    let chosenAudio = 'assets/audio/womp.wav'
    let muting = localStorage.getItem('muting') ? true : false
    let winningScore = free ? 1000000000 : 32
    let specialUnlocked = localStorage.getItem('special') || false
    let homerunUnlocked = localStorage.getItem('homerun') || false
    let champion = localStorage.getItem('champion') || false

    // ------------
    // mobile check
    // ------------

    if (mobileCheck()) {
        let container = document.createElement('div')
        let sorry = document.createElement('h2')
        sorry.classList.add('sorry')
        document.body.innerHTML = ''
        document.body.style.textAlign = "center"
        container.classList.add('ui', 'container')
        container.style.textAlign = 'center'
        container.style.position = '-webkit-sticky'
        document.body.appendChild(container)
        sorry.style.marginTop = '8em'
        sorry.style.opacity = '0'
        sorry.innerHTML = "Tap anywhere to be redirected to the Square Mobile Beta 1.0"
        container.appendChild(sorry)
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
            let canvas = document.querySelector('#defaultCanvas0')
            sorry.style.opacity = 1
            canvas.style.opacity = 1
        }, 500)

        document.body.addEventListener('touchstart', () => {
            window.location.href = "https://sqrm.surge.sh"
        })

        return
    }

    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // Initiation
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************

    if (!localStorage.getItem('regular')) {
        help.classList.add('flashit')
    }

    setTimeout(() => {
        document.body.style.backgroundColor = '#0c1522'
    }, 2000)


    if (homerunUnlocked) {
        homerun.disabled = false
        homerun.classList.remove('disabled')

    }
    if (specialUnlocked) {
        special.classList.remove('disabled')
        special.disabled = false
    }

    if (specialUnlocked && homerunUnlocked) {
        console.log('yes')
        freeButton.disabled = false
        freeButton.classList.remove('disabled')
    }

    if (!muting && introing) {
        playSound(ps2.src, 1)
    }

    if (!muting) {
        womp.classList.add('active')
        soundOn.classList.add('active')
    }

    if (muting) {
        soundOn.innerHTML = 'Sound Off'
        soundOn.classList.remove('active')
    }

    if (introing) {
        intro.classList.add('active')
        intro.innerHTML = 'PS2 Intro On'
    }

    if (free) {
        freeButton.disabled = false
        freeButton.classList.remove('disabled')
        freeButton.classList.add('active')
        storyButton.classList.remove('active')
        $('#scoreBox').html('Free Mode').css({
            fontSize: '0.9em',

        })
    }

    if (score < 32) {
        if (!specialUnlocked) special.disabled = true
        if (!homerunUnlocked) homerun.disabled = true
    }

    // fade in 
    $('#theForm').hide().fadeIn(9000)
    $('#titleLink').hide().fadeIn(9000)
    $('#bottom-right').hide().fadeIn(9000)
    $('#bottom-left').hide().fadeIn(9000)
    $('#square').fadeIn(5000)

    // initialize semantic dropdown
    $('.ui.dropdown')
        .dropdown();

    // turnYourLightsDownLow function
    //        * dims page *
    let turnYourLightsDownLow = () => {
        animating = true
        $('.ui.dropdown').addClass("disabled");
        $('.ui.button').addClass("disabled");
        title.style.opacity = '0.1'
        scoreBox.style.opacity = '0.1'
        document.body.style.backgroundColor = "#010106"
        changeColorDiv.style.opacity = 0
    }

    // letThereBeLight function
    // * reverses dim effect *
    let letThereBeLight = () => {
        if (score > 5 || free) $('.ui.dropdown').removeClass("disabled");
        $('.ui.button').removeClass("disabled");
        title.style.opacity = '1'
        scoreBox.style.opacity = '1'
        document.body.style.backgroundColor = '#0c1522'
        button.disabled = false
        animating = false
        changeColorDiv.style.opacity = 0
    }

    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // Button Event Listeners
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************

    // helper for sound selection
    let setActiveButton = (active, disabled) => {
        if (active) active.classList.add('active')

        disabled.forEach(a => {
            a.classList.remove('active')
        })
    }

    womp.addEventListener('click', () => {
        localStorage.removeItem('muting')
        setActiveButton(womp, [drip, soundOn, rasta, homerun, special])
        muting = false
        chosenAudio = 'assets/audio/womp.wav'
        playSound(chosenAudio, 1)
    })

    drip.addEventListener('click', () => {
        localStorage.removeItem('muting')
        setActiveButton(drip, [womp, rasta, homerun, special])
        muting = false
        chosenAudio = 'assets/audio/drip.wav'
        playSound(chosenAudio, 1)
    })

    soundOn.addEventListener('click', () => {

        if (muting) {
            soundOn.innerHTML = 'Sound On'
            localStorage.removeItem('muting')
            muting = false
            chosenAudio = 'assets/audio/womp.wav'
            setActiveButton(womp, [drip, soundOn, rasta, homerun, special])
            soundOn.classList.add('active')
            playClick()
        } else {
            setActiveButton(null, [drip, soundOn, rasta, homerun, special, womp])
            soundOn.innerHTML = 'Sound Off'
            localStorage.setItem('muting', 'true')
            soundOn.classList.remove('active')
            muting = true
            chosenAudio = ''
        }
    })
    storyButton.addEventListener('click', () => {
        playClick()
        $('.ui.dropdown').addClass("disabled");
        localStorage.removeItem('free')
        setActiveButton(storyButton, [freeButton])
        free = false
        score = 0
        winner = false
        winningScore = 32
        highScore = 0
        $('#sequence').css('opacity', '0').html(0)
        $('#scoreBox').html(1).css('opacity', '1')
        fibula = []

    })
    freeButton.addEventListener('click', () => {
        playClick()
        $('.ui.dropdown').removeClass("disabled");
        $('.ui.button').removeClass("disabled");
        localStorage.setItem('free', 'true')
        setActiveButton(freeButton, [storyButton])
        $('#sequence').html('')
        $('#scoreBox').css('font-size', '.9em').html('Free Mode')
        freeButton.classList.remove('flashit')
        free = true
        score = 0
        winner = 0
        highScore = false
        fibula = []
        winningScore = 100000000000
        // console.log(winningScore)
    })

    intro.addEventListener('click', () => {
        playClick()
        if (!introing) {
            intro.innerHTML = "PS2 Intro On"

            playSound('assets/audio/ps2.wav', 1)
            localStorage.setItem('intro', 'true')
            introing = true
            intro.classList.add('active')
        } else {
            playClick()
            setTimeout(() => {
                muteAll()
            }, 25)
            intro.innerHTML = "PS2 Intro Off"
            introing = false
            localStorage.removeItem('intro')
            intro.classList.remove('active')
        }
    })

    menu.addEventListener('click', () => {
        playClick()
        menu.classList.remove('flashit')
        $('#modal')
            .modal({
                autoFocus: false,
                onHide: function () {
                    menu.classList.remove('active')
                    paused = false
                    modaling = false
                },
                onShow: function () {
                    menu.classList.add('active')
                    paused = true
                }
            }).modal('show');
    })

    help.addEventListener('click', () => {
        playClick()
        help.classList.remove('flashit')
        $('#helpModal')
            .modal({
                autoFocus: false,
                onHide: function () {
                    help.classList.remove('active')
                    $('#changeColorDiv').css('opacity', '1')
                    $('#title').css('opacity', '1')
                    $('#square').css('opacity', '1')
                    paused = false
                    modaling = false
                },
                onShow: function () {
                    help.classList.remove('flashit')
                    localStorage.setItem('regular', 'true')
                    $('#changeColorDiv').css('opacity', '0')
                    $('#square').css('opacity', '0')
                    $('#title').css('opacity', '0')
                    help.classList.add('active')
                    paused = true
                }
            }).modal('show');
    })


    rasta.addEventListener('click', () => {
        playSound('assets/audio/streets.wav', 1)
        square.style.backgroundColor = '#D51C2C'
        document.body.style.backgroundColor = '#018A2D'
        square.style.borderColor = '#FCDE03'
        setActiveButton(rasta, [drip, womp, homerun, special])
        muting = false
        chosenAudio = 'assets/audio/rasta.wav'
        ripple = '#FCDE03'
    })

    homerun.addEventListener('click', () => {
        setActiveButton(homerun, [drip, rasta, womp, special])
        muting = false
        chosenAudio = 'assets/audio/homerun.wav'
        playSound(chosenAudio, 1)
        homerun.classList.remove('flashit')
    })

    special.addEventListener('click', () => {
        setActiveButton(special, [drip, rasta, womp, homerun])
        muting = false
        chosenAudio = 'assets/audio/tony.wav'
        playSound(chosenAudio, 1)
        special.classList.remove('flashit')
    })

    special.addEventListener('click', () => {
        setActiveButton(special, [drip, rasta, womp, homerun])
        muting = false
        chosenAudio = 'assets/audio/tony.wav'
        playSound(chosenAudio, 1)
    })

    reset.addEventListener('click', () => {
        ['free', 'homerun', 'special', 'intro', 'muting', 'champion', 'regular'].forEach(a => {
            localStorage.removeItem(a)
            playClick()
        })

        $('#reset2').html('resetting.')

        setTimeout(() => {
            $('#reset2').html('resetting..')
        }, 400)
        setTimeout(() => {
            $('#reset2').html('resetting...')
        }, 800)
        setTimeout(() => {
            $('#reset2').html('')
        }, 1200)
        setTimeout(() => {
            $('#reset2').html('desynchronizing.')
        }, 1600)

        setTimeout(() => {
            $('#reset2').html('desynchronizing..')
        }, 2000)
        setTimeout(() => {
            $('#reset2').html('desynchronizing...')
        }, 2400)
        setTimeout(() => {
            $('#reset2').html('')
        }, 2800)
        setTimeout(() => {
            $('#reset2').html('detaching service node.')
        }, 3200)

        setTimeout(() => {
            $('#reset2').html('detaching service node..')
        }, 3600)
        setTimeout(() => {
            $('#reset2').html('detaching service node...')
        }, 4000)
        setTimeout(() => {
            $('#reset2').html('fatal_error::ERR_HARD_DRIVE_COMPROMISED')
            $('#reset2').effect('shake', {
                times: 10,
                distance: 6,
            }, 3000)
        }, 5500)

        setTimeout(() => {
            location.reload()

        }, 8500)
    })

    closeMenu.addEventListener('click', () => {
        if (!muting) playSound('assets/audio/deny.wav', 1)
    })

    closeHelpMenu.addEventListener('click', () => {
        if (!muting) playSound('assets/audio/deny.wav', 1)
    })

    document.body.addEventListener('mousemove', e => {
        pitch = Math.ceil(e.clientY / 100)
        modifier = Math.ceil(e.clientX / 100)
    })

    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // Hover Event Listeners
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************


    square.addEventListener('mouseover', () => {

        if (!animating) {
            square.classList.remove('shaker')
            square.classList.add('hover')
        } else {
            square.classList.add('no')
        }
        hovering = true
    })

    square.addEventListener('mouseout', () => {
        $("#ripple2").css('display', 'none')
        if (!animating) {
            square.classList.remove('hover')
            square.classList.add('shaker')
            square.classList.remove('hover')
        }
        square.classList.remove('no')
        hovering = false
    })

    bottomRight.addEventListener('mouseover', () => {
        hovering = true
    })

    bottomRight.addEventListener('mouseout', () => {
        hovering = false
    })
    changeColor.addEventListener('mouseover', () => {
        hovering = true

    })
    changeColor.addEventListener('mouseout', () => {
        hovering = false
    })
    changeColorDiv.addEventListener('mouseover', () => {
        squaring = true
    })

    changeColorDiv.addEventListener('mouseout', () => {
        squaring = false
    })

    modal.addEventListener('mouseover', () => {
        modaling = true
    })

    modal.addEventListener('mouseout', () => {
        modaling = false
    })

    helpModal.addEventListener('mouseover', () => {
        modaling = true
    })

    helpModal.addEventListener('mouseout', () => {
        modaling = false
    })

    closeMenu.addEventListener('mouseover', () => {
        hovering = true
    })
    closeMenu.addEventListener('mouseout', () => {
        hovering = false
    })

    closeHelpMenu.addEventListener('mouseover', () => {
        hovering = true
    })
    closeHelpMenu.addEventListener('mouseout', () => {
        hovering = false
    })

    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // Form Event Listeners
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************

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

    selectaBackground.addEventListener('change', (e) => {
        if (e.target.value == 'random') {
            randomBackground = true
        } else if (e.target.value === 'keep') {
            randomBackground = false
        } else {
            background = e.target.value
            randomBackground = false
        }
    })

    selectaBorder.addEventListener('change', (e) => {
        if (e.target.value == 'random') {
            randomBorder = true
        } else if (e.target.value === 'keep') {
            randomBorder = false
        } else {
            border = e.target.value
            randomBorder = false
        }
    })


    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // the form
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************

    theForm.addEventListener('submit', (e) => {
        if (!muting) playSound('assets/audio/bell.wav')
        square.classList.remove('shaker')
        animating = true
        e.preventDefault()
        turnYourLightsDownLow()
        animation = randomAnimation ? animations[Math.floor(Math.random() * animations.length)] : animation
        square.classList.add(animation)
        square.style.backgroundColor = random ? getRandomColor() : color
        ripple = randomRipple ? getRandomColor() : ripple
        square.style.borderColor = randomBorder ? getRandomColor() : border
        changeColorDiv.style.opacity = 0
        setTimeout(() => {
            if (animation == 'wrapAround' || animation == 'spin') {
                setTimeout(() => {
                    letThereBeLight()
                    square.classList.add('shaker')
                    changeColorDiv.style.opacity = 1
                    square.classList.remove(animation)
                    document.body.style.backgroundColor = randomBackground ? getRandomColor() : background
                }, 6000)

            } else {
                letThereBeLight()
                square.classList.add('shaker')
                changeColorDiv.style.opacity = 1
                square.classList.remove(animation)
                document.body.style.backgroundColor = randomBackground ? getRandomColor() : background
            }
        }, 4000)
    })


    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // The Click
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************
    // ******************************************************************************

    let fib = (num) => num <= 1 ? 1 : fib(num - 1) + fib(num - 2)

    $("body").click(function (e) {
        if ((modaling && paused) || hovering) {


            return
        }
        if ((score < 5 && !free) || (score > 31 && !free) || animating) {
            $('.ui.dropdown').addClass("disabled");
        } else {
            $('.ui.dropdown').removeClass("disabled");
        }

        if (score === winningScore) {
            console.log(winningScore)
            chosenValue = Math.random() < 0.5 ? 'assets/audio/homerun.wav' : 'assets/audio/tony.wav';
            winner++
        }

        if (!homerun.disabled && !special.disabled) {
            freeButton.disabled = false
        }

        if ((score + 2 > 3) && score + 2 < 35) {

            $('#sequence').css('opacity', '1')
            $('#sequence').html(score + 2)
        }
        if (score === 6 && !free) {
            console.log(free)
            chosenValue = 'assets/audio/achievement.wav'
        }

        let scoreSize = (currentScore, element) => {
            if (currentScore + 2 < 3) {
                $(element).css('font-size', '1em')
            }
            if (currentScore == 10) {
                $(element).css('font-size', '1.1em')
            }
            if (currentScore == 20) {
                $(element).css('font-size', '1.2em')
            }
            if (currentScore == 30) {
                $(element).css('font-size', '1.3em')
            }
        }

        if (!hovering && !muting) {
            play(pitch / modifier)
        }

        // Credit:
        // https://codepen.io/finnhvman/pen/jLXKJw
        // Setup
        var posX = $(this).offset().left - 17,
            posY = $(this).offset().top - 25,
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
        // ****************************************************************************
        // ****************************************************************************
        // ****************************************************************************
        // ****************************************************************************
        // Winner
        // ****************************************************************************
        // ****************************************************************************
        // ****************************************************************************
        // ****************************************************************************

        if (free) {
            score++
            $('#sequence').html(score)
            $('#sequence').effect('shake', {
                times: 1,
                distance: 10,
                direction: 'up'
            }, (score / score - 1))
            $('#scoreBox').css('opacity', '.3')
            $('#sequence').css('opacity', '1')
            return
        }
        if (highScore) $('.ripple').css('background', getRandomColor())
        scoreSize(score, '#scoreBox')
        scoreSize(score + 2, '#sequence')
        if (winner >= 2) {
            winner++
            $('#scoreBox').effect('shake', {
                times: 4,
                distance: 2,
            }, 400)

        }

        if (winner && !free && !highScore) {

            winner++
            if (winner == 2) {
                $('#defaultCanvas0').removeClass('shakerSquare')
                $('#square').removeClass('shaker')
                $('#square').removeClass(animation)
                $('#defaultCanvas0').removeClass('shaker')
                $('#defaultCanvas0').addClass('spin')
                setTimeout(() => {
                    $('#defaultCanvas0').removeClass('spin')

                }, 10500)

                Math.random() < 0.7 ? getSoundAndFadeAudio('goodTimes') : getSoundAndFadeAudio('works')
                turnYourLightsDownLow()
                highScore = true
                animating = true
                winner++
                scoreBox.innerHTML = 'HIGH SCORE!!'
                setTimeout(() => {
                    $('#defaultCanvas0').css('opacity', '1')

                }, 500)
                $('#sequence').effect('shake', {
                    times: 15,
                    distance: 5,
                    direction: 'up'
                }, 17000).css({
                    fontSize: '1.5em',
                    color: 'yellow'
                })

                $('#square').css({
                    opacity: '0',
                    borderColor: 'black'
                }).addClass('moveUp')

                $('#scoreBox').addClass('hover').css({
                    opacity: '1',
                    color: 'yellow'
                })

                setIntervalX((e) => {
                    $('body').css('background-color', getRandomColor())
                }, 1000, 13)
                setIntervalX((e) => {
                    $('.ripple').css('background', getRandomColor())
                }, 1000, 13)
                setTimeout(() => {

                    highScore = false
                    winner = 0
                    score = 0
                    $('#square').css('opacity', '1')
                    $('body').css('background-color', '#0c1522')
                    animating = true
                    $('#defaultCanvas0').css('border-color', 'black')
                    $('#square').css('border-color', 'aliceblue')
                    $('#square').css('background-color', '#0c1522')
                    $('#defaultCanvas0').css('opacity', '0')
                    $('#defaultCanvas0').css('border-color', '#0c1522')
                    $('#sequence').css('opacity', '0')
                    $('#square').removeClass('moveUp')
                }, 14000)
                setTimeout(() => {
                    letThereBeLight()
                    scoreBox.style.color = 'aliceblue'
                    animating = false
                    changeColorDiv.style.opacity = 1
                    $('#square').removeClass('shakerSquare')
                    $('#square').addClass('shaker')
                }, 19000)
                setTimeout(() => {
                    $('#scoreBox').removeClass('hover')
                    $('#sequence').html('')
                    changeColorDiv.style.opacity = 1
                }, 17000)

                setTimeout(() => {
                    $('#defaultCanvas0').addClass('shakerSquare') ?
                        $('#square').addClass('shakerSquare') : undefined
                }, 10100)

                setTimeout(() => {
                    if (champion) return
                    if (chosenValue == 'assets/audio/homerun.wav' && !free && homerun.disabled) {
                        localStorage.setItem('homerun', 'true')
                        homerun.disabled = false
                        homerun.classList.add('flashit')
                        homerun.classList.remove('disabled')
                        homerun.disabled = false
                    } else if (!free && special.disabled) {
                        localStorage.setItem('special', 'true')
                        special.disabled = false
                        special.classList.add('flashit')
                        special.classList.remove('disabled')
                        special.disabled = false
                    }
                    if (!special.disabled && !homerun.disabled) {
                        console.log('but champion?')
                        if (!free && !champion) {
                            console.log('tis');
                            menu.classList.add('flashit')
                            freeButton.classList.add('flashit')
                            localStorage.setItem('champion', 'true')
                            freeButton.disabled = false
                            freeButton.classList.remove('disabled')
                        }
                        champion = true
                    }
                }, 16000)

                if (chosenValue == 'assets/audio/homerun') {
                    homerun.classList.add('flashit')
                    homerun.classList.remove('disabled')
                }
                if (chosenValue == 'assets/audio/special') {
                    special.classList.add('flashit')
                    special.classList.remove('disabled')
                }
            }
        } else if (!highScore) {
            $('#scoreBox').effect('shake', {
                times: 2,
                distance: 3,
            }, 100)
            $('#sequence').effect('shake', {
                times: 2,
                distance: 3,
                direction: 'up'
            }, 100)
            score++
            fibula.push(fib(score))
            $('#scoreBox').prop('Counter', fibula[score - 2] || 0).animate({
                Counter: fibula[score - 1]
            }, {
                duration: 500,
                easing: 'swing',
                step: function (now) {
                    $('#scoreBox').text(Math.ceil(now));
                },
                queue: false
            });
            scoreBox.innerHTML = fibula[score]
        }
        // ¯\_(ツ)_/¯
    });

    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // Square Event Listener
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************

    $("#square").click(function (e) {
        if (animating) {
            return
        }
        play(pitch / modifier)

        // Credit
        // https://codepen.io/finnhvman/pen/jLXKJw
        // Setup
        var posX = $(this).offset().left - 15,
            posY = $(this).offset().top - 13,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(this).prepend("<span class='ripple2'></span>");
        $(".ripple2").css('background', '#010106')

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
        $(".ripple2").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect2");
    })

    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // AudioZone
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************
    // *****************************************************************************

    function playSound(file, speed = 1, pitchShift = 1, loop = false, autoplay = true) {

        if (muting) return

        // Credit:
        // https://stackoverflow.com/a/49749868
        if (pitchShift) {
            audioCtx = new(window.AudioContext || window.webkitAudioContext)();
            source = audioCtx.createBufferSource();
            request = new XMLHttpRequest();
            request.open('GET', file, true);
            request.responseType = 'arraybuffer';

            request.onload = function () {
                var audioData = request.response;

                audioCtx.decodeAudioData(audioData, function (buffer) {
                        myBuffer = buffer;
                        songLength = buffer.duration;
                        source.buffer = myBuffer;
                        source.playbackRate.value = speed;
                        source.connect(audioCtx.destination);
                        source.loop = loop;
                    },
                    function (e) {
                        "Error with decoding audio data" + e.error
                    });

            }
            request.send();
            source.play = source.start
        } else {
            source = new Audio(file)
            source.playbackRate = speed
            source.loop = loop
        }
        if (autoplay) {
            source.play()
        }
        return source
    }
    var source


    function play(pitch) {
        if (hovering) {
            source = playSound('assets/audio/pop.wav', pitch)
            return
        } else if (score === winningScore) {
            source = playSound(chosenValue, 1)
        } else if (score == 5 && !free) {
            source = playSound('assets/audio/achievement.wav')
        } else {
            source = playSound(chosenAudio, pitch)
        }
    }

    // Credit
    // https://stackoverflow.com/a/26869192
    function getSoundAndFadeAudio(audiosnippetId) {
        if (muting) return
        var sound = document.getElementById(audiosnippetId);

        // Set the point in playback that fadeout begins. This is for a 2 second fade out.
        var fadePoint = sound.duration - 2;

        var fadeAudio = setInterval(function () {

            // Only fade if past the fade out point or not at zero already

            if ((sound.currentTime >= fadePoint) && (sound.volume >= 0.0)) {
                sound.volume -= 0.09;
            }
            // When volume at zero stop all the intervalling
            if (sound.volume <= 0.010000000000000259) {
                sound.volume = 0
                clearInterval(fadeAudio);
                sound.volume = 1
            }
        }, 200);

        sound.play()
    }
})

// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// p5
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************


// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// Fire Works
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************

// Credit:
// https://codepen.io/Alexndr/pen/OYgmWg
var fireworks = [];
var gravity;

function setup() {
    if (mobileCheck()) {
        var cnv = createCanvas(375, 700);
    } else {
        var cnv = createCanvas(420, 420);
    }
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 4;
    cnv.position(x, y);
    stroke('#c7f0fb');
    strokeWeight(20);

    gravity = createVector(0, .2);
}

function draw() {
    colorMode(RGB, 1000);
    background(0, 100);

    if (random(1) < .3) {
        fireworks.push(new Firework());
    }

    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }
}


//____Particle Function____// 
function Particle(x, y, firework, hu) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 300;
    this.weight = 4;
    this.hu = hu;

    if (this.firework) {
        this.vel = createVector(0, -random(height / 100, height / (32 + height / 100)));
    } else {
        this.vel = p5.Vector.random2D();
        this.vel.setMag(pow(random(1, 2), 2));
        this.weight = map(mag(this.vel.x, this.vel.y), 1, 4, 3, 0);
        this.vel.mult(height / this.pos.y);
    }

    this.acc = createVector(0, 0);

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        if (!this.firework) {
            this.vel.mult(0.9);
            this.lifespan -= 5;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.done = function () {
        if (this.lifespan > 0) {
            return false;
        } else {
            return true;
        }
    }

    this.show = function () {
        if (!this.firework) {
            colorMode(HSB);
            stroke(hu, 255, 255, this.lifespan);
            strokeWeight(this.weight);
        } else {
            colorMode(HSB);
            stroke(hu, 255, 255);
            strokeWeight(4);
        }
        point(this.pos.x, this.pos.y);
    }

}


//____Firework Function____// 
function Firework() {

    this.hu = random(255);
    this.firework = new Particle(random(width), height, true, this.hu);
    this.exploded = false;
    this.particles = [];

    this.done = function () {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    this.update = function () {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }
        for (var i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    this.explode = function () {
        for (var i = 0; i < floor(random(10, 100)); i++) {
            var p = new Particle(this.firework.pos.x, this.firework.pos.y, false, this.hu);
            this.particles.push(p);
        }
    }

    this.show = function () {
        if (!this.exploded) {
            this.firework.show();
        }
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}


// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// Scoped Helpers
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

        callback();

        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}

//Credit
// https://stackoverflow.com/a/11381730
let mobileCheck = () => {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};