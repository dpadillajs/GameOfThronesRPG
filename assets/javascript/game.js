// Character Objects
var westeros = {

    jonSnow : {
        name : "Jon Snow",
        hp : 10000,
        atkBoost : function () {
            atkPower += 2250;
            return atkPower;
        },
        counterAtk : 1750,
        updateHpText : function () {
            $('.stark-hp').text(this.hp);
        }
    },

    madQueen : {
        name : "Cersei Lannister",
        hp : 12500,
        atkBoost : function () {
            atkPower += 1750;
            return atkPower;
        },
        counterAtk : 2000,
        updateHpText : function () {
            $('.lannister-hp').text(this.hp);
        }
    },

    lastTargaryen : {
        name : "Daenerys Targaryen",
        hp : 15000,
        atkBoost : function () {
            atkPower += 1250;
            return atkPower;
        },
        counterAtk : 2250,
        updateHpText : function () {
            $('.targaryen-hp').text(this.hp);
        }
    },

    nightKing : {
        name : "The Night King",
        hp : 20000,
        atkBoost : function () {
            atkPower += 1000;
            return atkPower;
        },
        counterAtk : 2750,
        updateHpText : function () {
            $('.walker-hp').text(this.hp);
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
var assignSound = $('#bell-sound');
var attackSound = $('#atk-sound');

var battleCount = 0;
var atkPower = 0;

var attackerCard;
var defenderCard;
var $enemyDiv;
var $heroDiv;

var blockFromChoosingAttacker = false;
var blockFromChoosingDefender = false;
var ignoreAtkBtnClick = false;

function playOnAtkBtnClick() {
    attackSound[0].play();
    attackSound.prop("volume", 0.25);
}

function playIfCardIsChosen() {
    assignSound[0].play();
    assignSound.prop("volume", 0.5);
}

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
    $("[js-battleCard]").on("click", function() {
        if(!blockFromChoosingAttacker) {
            playIfCardIsChosen();      
            $atkPosition.append(this);
            $heroDiv = this;
            attackerCard = extractData(this.id);
            blockFromChoosingAttacker = true;
            $headerText.text("Declare Your Enemy");

        } else if (!blockFromChoosingDefender && !(this.parentNode.classList.contains("atk-position"))) {
            $("a").attr("href", "#iron-throne");
            playIfCardIsChosen();
            $defPosition.append(this);
            ignoreAtkBtnClick = false;    
            $enemyDiv = this;
            defenderCard = extractData(this.id);
            $atkResults.text('"The army awaits your command."');
            $defResults.text(defenderCard.name + "'s army draws near.");
            blockFromChoosingDefender = true;
        }
    });
}

function attackStage() {
    $("#attack-button").on("click", function() {
        if (!attackerCard || !defenderCard) {
            return;     
        }
        if (ignoreAtkBtnClick) {
            return;
        }
        defenderCard.hp -= attackerCard.atkBoost();
        playOnAtkBtnClick();
        if (defenderCard.hp <= 0) {
            $enemyDiv.remove();
            battleCount++;
            blockFromChoosingDefender = false;
            $atkResults.text("And the climb to the Iron Throne continues...");
            $defResults.text(defenderCard.name + "'s army has been defeated. " + defenderCard.name + " died in combat.");
            ignoreAtkBtnClick = true; 
            if (battleCount === 3) {
                blockFromChoosingDefender = true;
                ignoreAtkBtnClick = true; 
                $('#throne-seat').append($heroDiv);
                $atkResults.text("You have broken the wheel. The Iron Throne is yours.");
                $defResults.text("Power resides where men believe it resides. It's a trick. A shadow on the wall...");
                return;
            }   
        }
        defenderCard.updateHpText();
        if (attackerCard.hp > 0 && defenderCard.hp > 0) {
            attackerCard.hp -= defenderCard.counterAtk;
            if (attackerCard.hp <= 0) {
                blockFromChoosingDefender = true;
                ignoreAtkBtnClick = true;    
                attackerCard.hp = 0;
                attackerCard.updateHpText();
                $atkResults.text("When you play the game of thrones, you win or you die. There is no middle ground.");
                $defResults.text(defenderCard.name + " has wiped out your army. Press RESTART to try again.");    
            } else {
                attackerCard.updateHpText();
                $atkResults.text("You have decreased " + defenderCard.name + "'s forces by " + atkPower + ".");
                $defResults.text(defenderCard.name + " has decreased your forces by " + defenderCard.counterAtk + ".");    
            }
        }
    });
}

assignStage();
attackStage();