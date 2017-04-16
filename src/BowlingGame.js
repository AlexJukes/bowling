function Game() {

  ALLPINS = 10;

  RESET = 0;

  this.isStrike = false;

  this.isSpare = false;

  this.pins = ALLPINS;

  this.frame = 1;

  this.bonus = 0;

  this.score = 0;

  this.players = [];

}

Game.prototype.addPlayer = function(name) {
    player = new Player(name);
    this.players.push(player);
};

Game.prototype._calculateRoll = function() {
    return Math.floor((Math.random() * 11));
};

Game.prototype.firstRollOpen = function(roll) {
    if(this.isSpare) {
        this.bankBonus(roll);
        this.addBonus();
    }
      this.pins -= roll;
      this.isSecondRoll = true;
};

Game.prototype.bankBonus = function(score) {
    this.bonus += score;
};

Game.prototype.reset = function() {
    this.bonus = RESET;
    this.isSpare = false;
    this.isStrike = false;
};

Game.prototype.addBonus = function() {
    this.score += this.bonus;
    this.reset();
};

Game.prototype.scoredSpare = function() {
          this.bankBonus(ALLPINS);
          this.isSpare = true;
          this.newFrame();
};

Game.prototype.scoredOpen = function(roll) {
        if(this.isSpare) {
            this.bankBonus(roll);
            this.addBonus();
        }
        this.score += ((ALLPINS - this.pins) + roll);
        this.newFrame();
};

Game.prototype.scoredStrike = function() {
      this.isStrike = true;
      this.newFrame();
};

Game.prototype.roll = function() {
    var roll = this._calculateRoll();
    console.log(roll);
    console.log(this);
    if(this.isSecondRoll) {
      if(roll >= this.pins) {
        this.scoredSpare();
      } else
        this.scoredOpen(roll);
    } else
      if(roll === ALLPINS) {
        this.scoredStrike();
    } else
      this.firstRollOpen(roll);
};

Game.prototype.newFrame = function() {
    this.isSecondRoll = false;
    this.frame += 1;
    this.pins = ALLPINS;
};

