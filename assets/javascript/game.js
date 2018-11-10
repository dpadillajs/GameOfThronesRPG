// Character Objects
var jonSnow = {
    hp : 100,
    atkPower : 25,
    counterAtk : 15
};

var madQueen = {
    hp: 125,
    atkPower: 15,
    counterAtk: 10
};

var lastTargaryen = {
    hp: 150,
    atkPower: 20,
    counterAtk: 20
};

var nightKing = {
    hp: 200,
    atkPower: 10,
    counterAtk: 25
};

// Element Access Variables
var starkCard = $('.access-stark');
var lannisterCard = $('.access-lannister');
var targaryenCard = $('.access-targaryen');
var walkerCard = $('.access-walker');

var starkHP = $('.stark-hp');
var lannisterHP = $('.lannister-hp');
var targaryenHP = $('.targaryen-hp');
var walkerHP = $('.walker-hp');

var headerText = $('#user-choice h1');
var atkResults = $('#attacker-results');
var defResults = $('#defender-results');
var attackButton = $('#attack-button');
var restartButton = $('#restart-button');
var atkPosition = $('.atk-position');
var defPosition = $('.def-position');
var flagHero = false;
var flagEnemy = false;
var gotMusic = $("#got-music");

function playMusic () {
    gotMusic[0].play();
}

restartButton.click(function() {
    location.reload();
});

function moveToAttacker() {
    $(document).on("click", function (e) {
        var target = e.target.parentNode;
        if((!flagHero) && (target.classList.contains('access-stark') || 
                           target.classList.contains('access-lannister') ||
                           target.classList.contains('access-targaryen') || 
                           target.classList.contains('access-walker'))) {
            atkPosition.append(target);
            flagHero = true;
            headerText.text("Declare Your Enemy");
        }
    });
}

function moveToDefender() {
    $(document).on("click", function (e) {
        var target = e.target.parentNode;
        if (defPosition.children().length !== 4 && (target.parentNode.classList.contains('access-stark2') || 
                                                    target.parentNode.classList.contains('access-lannister2') ||
                                                    target.parentNode.classList.contains('access-targaryen2') || 
                                                    target.parentNode.classList.contains('access-walker2'))) {
            defPosition.append(target);
        }
    });
}

playMusic();
moveToDefender();
moveToAttacker();


