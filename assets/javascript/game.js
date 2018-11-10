// Character Objects
var jonSnow = {
    hp : 100,
    atkPower : 25,
    counterAtkPower : Math.floor(Math.random * 15 + 1)
};

var madQueen = {
    hp: 125,
    atkPower: 15,
    counterAtkPower: Math.floor(Math.random * 10 + 1)
};

var lastTargaryen = {
    hp: 150,
    atkPower: 20,
    counterAtkPower: Math.floor(Math.random * 20 + 1)
};

var nightKing = {
    hp: 200,
    atkPower: 10,
    counterAtkPower: Math.floor(Math.random * 25 + 1)
};

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

