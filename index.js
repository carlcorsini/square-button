document.addEventListener('DOMContentLoaded', () => {
    $('.ui.dropdown').hide().fadeIn(5000)
    $('#theForm').hide().fadeIn(5000)
    $('#titleLink').hide().fadeIn(5000)
    $('#bottom-right').hide().fadeIn(5000)
    $('#bottom-left').hide().fadeIn(5000)
    // initialize semantic dropdown
    $('.ui.dropdown')
        .dropdown();
    $('ui.dropdown').css('cursor', './pointer.png')
    // turnYourLightsDownLow function
    //        * dims page *
    let turnYourLightsDownLow = () => {
        animating = true
        // button.disabled = true
        $('.ui.dropdown').addClass("disabled");
        $('.ui.button').addClass("disabled");
        title.style.opacity = '0.25'
        scoreBox.style.opacity = '0.1'
        document.body.style.backgroundColor = "#010106"
    }

    // letThereBeLight function
    // * reverses dim effect *
    let letThereBeLight = () => {
        $('.ui.dropdown').removeClass("disabled");
        $('.ui.button').removeClass("disabled");
        title.style.opacity = '1'
        scoreBox.style.opacity = '1'
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
    let scoreBox = document.querySelector('#scoreBox')
    let womp = document.querySelector('#womp')
    let drip = document.querySelector('#drip')
    let mute = document.querySelector('#mute')




    // assign required variables
    let color = '#0c1522'
    let ripple = getRandomColor()
    let randomAnimation = true
    let randomRipple = true
    let random = true
    let animating = false
    let hovering = false
    let animations = ['spin', 'bounce', 'move', 'wrapAround']
    let animation = animations[Math.floor(Math.random() * animations.length)];
    let score = 0
    let highScore = false
    let pitch = 1
    let modifier = 5
    let winner = 0
    let fibula = []
    let chosenValue
    let chosenAudio = 'assets/audio/womp.wav'
    let muting = false
    let winningScore = 33

    womp.addEventListener('click', () => {
        drip.classList.remove('active')
        mute.classList.remove('mute')
        womp.classList.add('active')
        muting = false
        chosenAudio = 'assets/audio/womp.wav'
    })

    drip.addEventListener('click', () => {
        womp.classList.remove('active')
        mute.classList.remove('mute')
        drip.classList.add('active')
        muting = false
        chosenAudio = 'assets/audio/drip.wav'
    })

    mute.addEventListener('click', () => {
        womp.classList.remove('active')
        drip.classList.remove('active')
        mute.classList.add('active')
        muting = true
        chosenAudio = ''
    })

    document.body.addEventListener('mousemove', e => {

        pitch = Math.ceil(e.clientY / 100)
        modifier = Math.ceil(e.clientX / 100)
    })

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
        square.style.backgroundColor = random ? getRandomColor() : color
        ripple = randomRipple ? getRandomColor() : ripple
        setTimeout(() => {
            if (animation == 'wrapAround') {
                setTimeout(() => {
                    letThereBeLight()
                    square.classList.remove(animation)
                }, 6000)
            } else {
                letThereBeLight()
                square.classList.remove(animation)
            }
        }, 4000)
    })

    // ---------------------
    // ripple event listener
    // ---------------------

    let fib = (num) => num <= 1 ? 1 : fib(num - 1) + fib(num - 2)
    let fibMinusOne

    $("body").click(function (e) {
        if (score === winningScore) {
            chosenValue = Math.random() < 0.5 ? 'assets/audio/homerun.wav' : 'assets/audio/tony.wav';
            winner++

        }
        if (score == 10) {
            $('#scoreBox').css('font-size', '1.1em')
        }
        if (score == 20) {
            $('#scoreBox').css('font-size', '1.2em')
        }
        if (score == 30) {
            $('#scoreBox').css('font-size', '1.3em')
        }
        if (!hovering && !highScore && !muting) {
            play(pitch / modifier)
        }
        if (highScore) return
        // Remove any old one
        // $(".ripple").remove();

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

            if (winner >= 2) {
                winner++
                $('#scoreBox').effect('shake', {
                    times: 4,
                    distance: 2,
                }, 400)

            }

            if (winner) {
                winner++
                if (winner == 2) {
                    Math.random() < 0.5 ? getSoundAndFadeAudio('goodTimes') : getSoundAndFadeAudio('works')
                    turnYourLightsDownLow()
                    highScore = true
                    animating = true
                    winner++
                    scoreBox.innerHTML = 'HIGH SCORE!!'
                    scoreBox.style.color = 'yellow'
                    $('#scoreBox').css('font-size', '1.5em')
                    $('#square').css('opacity', '0')
                    $('#square').css('border-color', 'black')
                    $('#square').addClass('moveUp')
                    $('#defaultCanvas0').css('opacity', '1')
                    $('#scoreBox').addClass('hover')
                    $('#scoreBox').css('opacity', '1')
                    setIntervalX((e) => {
                        $('body').css('background-color', getRandomColor())
                    }, 1000, 13)
                    setTimeout(() => {
                        highScore = false
                        winner = 0
                        score = 0
                        $('#square').css('opacity', '1')
                        $('#scoreBox').removeClass('hover')
                        letThereBeLight()
                        animating = true
                        $('#defaultCanvas0').css('border-color', 'black')
                        $('#square').css('border-color', 'aliceblue')
                        $('#square').css('background-color', '#0c1522')
                        $('#defaultCanvas0').css('opacity', '0.1')
                        $('#defaultCanvas0').css('border-color', '#0c1522')
                        scoreBox.style.color = 'aliceblue'
                        $('#scoreBox').css('font-size', '1em')
                    }, 14000)
                    setTimeout(() => {
                        $('body').css('background-color', '#0c1522')
                        $('#square').removeClass('moveUp')
                        animating = false

                    }, 20000)
                    setTimeout(() => {
                        $('#defaultCanvas0').css('opacity', '0')
                    }, 17000)
                }
            } else {
                $('#scoreBox').effect('shake', {
                    times: 4,
                    distance: 3,
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


        }
    });
    // dots is an array of Dot objects,
    // mouse is an object used to track the X and Y position
    // of the mouse, set with a mousemove event listener below
    var dots = [],
        mouse = {
            x: 0,
            y: 0
        };

    // The Dot object used to scaffold the dots
    var Dot = function () {
        this.x = 0;
        this.y = 0;
        this.node = (function () {
            var n = document.createElement("div");
            n.className = "trail";
            document.body.appendChild(n);
            return n;
        }());
    };
    // The Dot.prototype.draw() method sets the position of 
    // the object's <div> node
    Dot.prototype.draw = function () {
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
    };

    // Creates the Dot objects, populates the dots array
    for (var i = 0; i < 12; i++) {
        var d = new Dot();
        dots.push(d);
    }

    // This is the screen redraw function
    function draw() {
        // Make sure the mouse position is set everytime
        // draw() is called.
        var x = mouse.x,
            y = mouse.y;

        // This loop is where all the 90s magic happens
        dots.forEach(function (dot, index, dots) {
            var nextDot = dots[index + 1] || dots[0];

            dot.x = x;
            dot.y = y;
            dot.draw();
            x += (nextDot.x - dot.x) * .6;
            y += (nextDot.y - dot.y) * .6;

        });
    }

    addEventListener("mousemove", function (event) {
        //event.preventDefault();
        mouse.x = event.pageX + 13.25
        mouse.y = event.pageY + 13.25;
    });

    // animate() calls draw() then recursively calls itself
    // everytime the screen repaints via requestAnimationFrame().
    function animate() {
        if (!hovering) {
            draw();
            $('.trail').css('visibility', 'visible')
            requestAnimationFrame(animate);
        } else {
            $('.trail').css('visibility', 'hidden')
            requestAnimationFrame(animate);
        }
    }

    // And get it started by calling animate().
    animate()

    function playSound(file, speed = 1, pitchShift = 1, loop = false, autoplay = true) {
        /*
        Use the play() method to start the audio. if pitchShift is true
        use the stop() method to stop the audio and destroy the object.
        If pitchShift is false use the pause() method to pause and set
        the attribute currentTime to 0 to reset the time.
        */
        if (muting) return
        if (pitchShift) {
            /*
            After weeks of searching, I have finally found a way to pitch shift audio.
            Thank you Mozilla.
            2018/03/31:
                https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/playbackRate
                https://github.com/mdn/webaudio-examples/tree/master/decode-audio-data
                https://www.w3schools.com/jsref/prop_audio_loop.asp
            Original comments:
                use XHR to load an audio track, and
                decodeAudioData to decode it and stick it in a buffer.
                Then we put the buffer into the source
            */
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

        source = score === winningScore ? playSound(chosenValue, 1) : playSound(chosenAudio, pitch)
    }

    function stop() {
        source.stop(0);
        document.getElementById('play').href = ''
        document.getElementById('play').innerHTML = 'Refresh to play again'
    }

    function getSoundAndFadeAudio(audiosnippetId) {
        if (muting) return
        var sound = document.getElementById(audiosnippetId);

        // Set the point in playback that fadeout begins. This is for a 2 second fade out.
        var fadePoint = sound.duration - 2;

        var fadeAudio = setInterval(function () {

            // Only fade if past the fade out point or not at zero already
            console.log(sound.volume)
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



// Round Two


//Based on https://www.youtube.com/watch?v=CKeyIbT3vXI

var fireworks = [];
var gravity;


function setup() {
    var cnv = createCanvas(1260, 420);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 4;
    cnv.position(x, y);
    stroke(10);
    strokeWeight(1);

    gravity = createVector(0, .2);
}


function draw() {
    colorMode(RGB, 100, 500, 10, 255);
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



function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

        callback();

        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}