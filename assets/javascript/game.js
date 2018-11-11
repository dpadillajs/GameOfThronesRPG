// Character Objects
var westeros = {

    jonSnow : {
        name : "Jon Snow",
        hp : 100,
        atkPower: 25,
        grindAtkPower : function () {
            this.atkPower += 25;
        },
        counterAtk : 15,
        updateHpText : function () {
            $('.stark-hp').text("HP: " + this.hp);
        }
    },

    madQueen : {
        name : "Cersei Lannister",
        hp : 125,
        atkPower : 15,
        grindAtkPower : function () {
            this.atkPower += 15;
        },
        counterAtk : 10,
        updateHpText : function () {
            $('.lannister-hp').text("HP: " + this.hp);
        }
    },

    lastTargaryen : {
        name : "Daenerys Targaryen",
        hp : 150,
        atkPower : 20,
        grindAtkPower : function () {
            this.atkPower += 20;
        },
        counterAtk : 20,
        updateHpText : function () {
            $('.targaryen-hp').text("HP: " + this.hp);
        }
    },

    nightKing : {
        name : "The Night King",
        hp : 200,
        atkPower : 10,
        grindAtkPower : function () {
            this.atkPower += 10;
        },
        counterAtk : 25,
        updateHpText : function () {
            $('.walker-hp').text("HP: " + this.hp);
        }
    }

}

// Element Access Variables
var $headerText = $('#user-choice h1');
var $atkResults = $('#attacker-results');
var $defResults = $('#defender-results');
var $attackButton = $('#attack-button');
var $restartButton = $('#restart-button');
var $atkPosition = $('.atk-position');
var $defPosition = $('.def-position');
var attackerCard;
var defenderCard;
var flagHero = false;
var flagEnemy = false;

$restartButton.click(function() {
    location.reload();
});

function extractData(cardId) {
    var card;
    switch (cardId) {
        case "starks-card" : card = westeros.jonSnow;
            break;
        case "walkers-card" : card = westeros.nightKing;
            break;
        case "lannisters-card" : card = westeros.madQueen;
            break;
        case "targaryens-card" : card = westeros.lastTargaryen;
            break;
    }
    return card;
}

function assignStage() {
    $("[js-card-move]").on("click", function() {
        if(!flagHero) {      
            $atkPosition.append(this);
            attackerCard = extractData(this.id);
            flagHero = true;
            $headerText.text("Declare Your Enemy");

        } else if (!flagEnemy) {
            $defPosition.append(this);
            defenderCard = extractData(this.id);
            flagEnemy = true;
        }
    });
}

function attackStage() {
    $("#attack-button").on("click", function() {
        if (!attackerCard || !defenderCard) {
            return;     
        }
        attackerCard.hp -= defenderCard.counterAtk;
        defenderCard.hp -= attackerCard.atkPower;
        attackerCard.updateHpText();
        defenderCard.updateHpText();
        $atkResults.text("You have decreased " + defenderCard.name + "'s soldier numbers by " + attackerCard.atkPower + "pts.");
        $defResults.text(defenderCard.name + " has decreased your soldier numbers by " + defenderCard.counterAtk + "pts.");
    });
}

assignStage();
attackStage();
