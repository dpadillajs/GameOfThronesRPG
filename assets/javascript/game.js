// Character Objects
var westeros = {

    jonSnow : {
        name : "Jon Snow",
        hp : 100,
        atkBoost : function () {
            atkPower += 25;
            return atkPower;
        },
        counterAtk : 15,
        updateHpText : function () {
            $('.stark-hp').text("hp: " + this.hp);
        }
    },

    madQueen : {
        name : "Cersei Lannister",
        hp : 125,
        atkBoost : function () {
            atkPower += 15;
            return atkPower;
        },
        counterAtk : 10,
        updateHpText : function () {
            $('.lannister-hp').text("hp: " + this.hp);
        }
    },

    lastTargaryen : {
        name : "Daenerys Targaryen",
        hp : 150,
        atkBoost : function () {
            atkPower += 20;
            return atkPower;
        },
        counterAtk : 20,
        updateHpText : function () {
            $('.targaryen-hp').text("hp: " + this.hp);
        }
    },

    nightKing : {
        name : "The Night King",
        hp : 200,
        atkBoost : function () {
            atkPower += 10;
            return atkPower;
        },
        counterAtk : 25,
        updateHpText : function () {
            $('.walker-hp').text("hp: " + this.hp);
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

var atkPower = 0;
var attackerCard;
var defenderCard;
var defeatedOpp;
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
            defeatedOpp = this;
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
        defenderCard.hp -= attackerCard.atkBoost();
        attackerCard.hp -= defenderCard.counterAtk;
        attackerCard.updateHpText();
        defenderCard.updateHpText();
        $atkResults.text("You have decreased " + defenderCard.name + "'s soldier numbers by " + atkPower + "pts.");
        $defResults.text(defenderCard.name + " has decreased your soldier numbers by " + defenderCard.counterAtk + "pts.");
    });
}

assignStage();
attackStage();

// if (attackerCard.hp <= 0) {
//     attackerCard.hp = 0;
//     attackerCard.updateHpText();
//     $atkResults.text("When you play the game of thrones, you win or you die. There is no middle ground.");
//     $defResults.html(defenderCard.name + " has wiped out your army. Press <em>RESTART</em> to try again.");    
// }

// if (defenderCard.hp <= 0) {
//     defeatedOpp.remove();
//     flagEnemy = false;
//     $atkResults.text("And the climb to the Iron Throne continues...");
//     $defResults.text(defenderCard.name + "'s army has been defeated. " + defenderCard.name + " died in combat.");    
// }