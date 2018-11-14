// Character Objects
var westeros = {
  jonSnow: {
    name: "Jon Snow",
    hp: 10000,
    atkBoost: function() {
      atkPower += 2250;
      return atkPower;
    },
    counterAtk: 1750,
    updateHpText: function() {
      $(".stark-hp").text(this.hp);
    }
  },

  madQueen: {
    name: "Cersei Lannister",
    hp: 12500,
    atkBoost: function() {
      atkPower += 1750;
      return atkPower;
    },
    counterAtk: 2000,
    updateHpText: function() {
      $(".lannister-hp").text(this.hp);
    }
  },

  lastTargaryen: {
    name: "Daenerys Targaryen",
    hp: 15000,
    atkBoost: function() {
      atkPower += 1250;
      return atkPower;
    },
    counterAtk: 2250,
    updateHpText: function() {
      $(".targaryen-hp").text(this.hp);
    }
  },

  nightKing: {
    name: "The Night King",
    hp: 20000,
    atkBoost: function() {
      atkPower += 1000;
      return atkPower;
    },
    counterAtk: 2750,
    updateHpText: function() {
      $(".walker-hp").text(this.hp);
    }
  }
};

// Element Access Variables
var $headerText = $("#user-choice h1");
var $atkResults = $("#attacker-results");
var $defResults = $("#defender-results");
var $attackButton = $("#attack-button");
var $restartButton = $("#restart-button");
var $atkPosition = $(".atk-position");
var $defPosition = $(".def-position");
var assignSound = $("#bell-sound");
var attackSound = $("#atk-sound");
var autoplaySong = $("#got-music");
var autoplaySnow = $("#snow-music");

// Game-specific variables
var deadEnemies = 0;
var atkPower = 0;
var totalAttackerDeadForces;

// Variables used for OOP & DOM manipulation
var attackerCard;
var defenderCard;
var $enemyDiv;
var $heroDiv;

// Flag variables
var blockFromChoosingAttacker = false;
var blockFromChoosingDefender = false;
var ignoreAtkBtnClick = false;

// This function will play an atmospheric snow blizzard
// as well as a Game of Thrones song indefinitely once called
function autoPlay() {
  autoplaySong[0].play();
  autoplaySnow[0].play();
  autoplaySnow.prop("volume", 0.4);
}

// This function will play a sword slashing sound effect
// when the attack button is pressed.
function playOnAtkBtnClick() {
  attackSound[0].play();
  attackSound.prop("volume", 0.25);
}

// This function will play an alert sound effect when a card is chosen
function playIfCardIsChosen() {
  assignSound[0].play();
  assignSound.prop("volume", 0.5);
}

// This function will refresh the window page and reset all progress
// on the restart button
$restartButton.click(function() {
  location.reload();
});

// This function is used to link the clicked element
// to the character object by searching for a specific Id tag
function extractData(cardId) {
  var card;

  switch (cardId) {
    case "starks-card":
      card = westeros.jonSnow;
      break;
    case "walkers-card":
      card = westeros.nightKing;
      break;
    case "lannisters-card":
      card = westeros.madQueen;
      break;
    case "targaryens-card":
      card = westeros.lastTargaryen;
      break;
  }

  return card;
}

// This function allows the user to choose an attacker and a defender
function assignStage() {
  $("[js-battleCard]").on("click", function() {
    if (!blockFromChoosingAttacker) {
      autoPlay();
      playIfCardIsChosen();
      $atkPosition.append(this);
      $heroDiv = this;
      attackerCard = extractData(this.id);
      blockFromChoosingAttacker = true;
      $headerText.text("Declare Your Enemy");

      // We prevent the reassigning of attackerCard.hp within the const
      // variable and then we assign it to the global variable to be
      // accessible in the attackStage function below
      const initialAttackerHP = attackerCard.hp;
      totalAttackerDeadForces = initialAttackerHP;
    } else if (
      !blockFromChoosingDefender &&
      !this.parentNode.classList.contains("atk-position")
    ) {
      playIfCardIsChosen();
      $("a").attr("href", "#def-position");
      $defPosition.append(this);
      ignoreAtkBtnClick = false;
      $enemyDiv = this;
      defenderCard = extractData(this.id);

      $atkResults.text("The army awaits your command.");
      $defResults.text(defenderCard.name + "'s army draws near.");

      blockFromChoosingDefender = true;
    }
  });
}

// This function holds all the possible outcomes and results of an attack
function attackStage() {
  $attackButton.on("click", function() {
    if (!attackerCard || !defenderCard) {
      return;
    }

    if (ignoreAtkBtnClick) {
      return;
    }

    playOnAtkBtnClick();
    defenderCard.hp -= attackerCard.atkBoost();

    if (defenderCard.hp <= 0) {
      $enemyDiv.remove();
      deadEnemies++;
      blockFromChoosingDefender = false;

      $atkResults.text("And the climb to the Iron Throne continues...");
      $defResults.text(
        defenderCard.name +
          "'s army has been defeated. " +
          defenderCard.name +
          " died in combat."
      );

      ignoreAtkBtnClick = true;

      if (deadEnemies === 3) {
        blockFromChoosingDefender = true;
        ignoreAtkBtnClick = true;
        $("#throne-seat").append($heroDiv);

        $headerText.text("VICTORY");
        $atkResults.text(
          (totalAttackerDeadForces -= attackerCard.hp) +
            " of your men have died to break the wheel. " +
            "The Iron Throne is yours."
        );
        $defResults.text(
          "Power resides where men believe it resides. " +
            "It's a trick. A shadow on the wall..."
        );

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

        $atkResults.text(
          "When you play the game of thrones, you win or you die. " +
            "There is no middle ground."
        );
        $defResults.text(
          defenderCard.name +
            " has wiped out your army. " +
            "Press RESTART to try again."
        );
      } else {
        attackerCard.updateHpText();

        $atkResults.text(
          "You have decreased " +
            defenderCard.name +
            "'s forces by " +
            atkPower +
            "."
        );
        $defResults.text(
          defenderCard.name +
            " has decreased your forces by " +
            defenderCard.counterAtk +
            "."
        );
      }
    }
  });
}

// Function Calls
assignStage();
attackStage();
