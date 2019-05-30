document.addEventListener('DOMContentLoaded', () => {
    // initialize semantic dropdown
    $('.ui.dropdown')
        .dropdown();
    $('ui.dropdown').css('cursor', './pointer.png')
    // turnYourLightsDownLow function
    //        * dims page *
    let turnYourLightsDownLow = () => {
        animating = true
        button.disabled = true
        $('.ui.dropdown').addClass("disabled");
        title.style.opacity = '0.25'
        scoreBox.style.opacity = '0.1'
        document.body.style.backgroundColor = "#010106"
    }

    // letThereBeLight function
    // * reverses dim effect *
    let letThereBeLight = () => {
        $('.ui.dropdown').removeClass("disabled");
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
    let works = document.querySelector('#works')

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
    let pitch = 1
    let modifier = 5
    let winner = 0

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
        console.log('hey')
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
    let fibMinusOne

    $("body").click(function (e) {
        fibMinusOne = fib(score - 1)
        if (fibMinusOne >= 2178309) {
            winner++
        }
        if (!hovering && !highScore) {
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
                    getSoundAndFadeAudio('works')
                    turnYourLightsDownLow()

                    winner++
                    scoreBox.innerHTML = 'HIGH SCORE!!'
                    scoreBox.style.color = 'yellow'
                    $('#scoreBox').css('font-size', '1.2em')
                    $('#square').css('opacity', '0')
                    $('#square').css('border-color', 'black')
                    $('#square').css('background-color', '#0c1522;')
                    $('#defaultCanvas0').css('opacity', '1')
                    highScore = true
                    $('#scoreBox').addClass('hover')
                    $('#scoreBox').css('opacity', '1')

                    setTimeout(() => {
                        $('#square').css('opacity', '1')
                        $('#scoreBox').removeClass('hover')
                        highScore = false
                        letThereBeLight()
                        $('#square').css('border-color', 'aliceblue')
                        $('#defaultCanvas0').css('opacity', '0')
                    }, 14000)
                }
            } else {
                $('#scoreBox').effect('shake', {
                    times: 4,
                    distance: 3,
                }, 100)
                score++
                $('#scoreBox').prop('Counter', fib(Number(score - 1))).animate({
                    Counter: fib(Number(score))
                }, {
                    duration: 500,
                    easing: 'swing',
                    step: function (now) {
                        $('#scoreBox').text(Math.ceil(now));
                    },
                    queue: false
                });
                scoreBox.innerHTML = fib(Number(score))
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
    var cnv = createCanvas(840, 420);
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

function getSoundAndFadeAudio(audiosnippetId) {

    var sound = document.getElementById(audiosnippetId);
    console.log(sound.duration)

    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = sound.duration - 2;

    var fadeAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime >= fadePoint) && (sound.volume != 0.0)) {
            sound.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume === 0.0) {
            clearInterval(fadeAudio);
        }
    }, 200);
    sound.play()
}