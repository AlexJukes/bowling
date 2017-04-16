'use strict';

describe('BowlingGame', function() {

  var game;
  var player;

    beforeEach(function() {
      game = new Game();
      player = new Player('AJ');
      game.addPlayer(player);
    });

    describe('new game', function() {
      it('should have 10 pins', function() {
          expect(game.pins).toEqual(10);
      });
      it('should be frame 1', function() {
          expect(game.frame).toEqual(1);
      });
      it('should have a player with score of 0', function() {
          expect(player.score).toEqual(0);
      });
    });

  describe('single frame', function() {
      it('starts a new frame after scoring an open', function() {
        spyOn(game, '_calculateRoll').and.returnValue(3);
        game.roll();
        game.roll();
        expect(game.frame).toEqual(2);
      });
    it('starts a new frame after scoring a spare', function() {
      spyOn(game, '_calculateRoll').and.returnValue(5);
      game.roll();
      game.roll();
      expect(game.frame).toEqual(2);
    });
    it('starts a new frame after scoring a strike', function() {
      spyOn(game, '_calculateRoll').and.returnValue(10);
      game.roll();
      expect(game.frame).toEqual(2);
    });
  });

  describe('scoring', function() {
    it('records the score after scoring an open', function() {
      spyOn(game, '_calculateRoll').and.returnValue(3);
      game.roll();
      game.roll();
      expect(game.score).toEqual(6);
    });
    it('properly calculates the score after a player has scored a single spare', function() {
      spyOn(game, '_calculateRoll').and.returnValue(5);
      game.roll();
      game.roll();
      game.roll();
      game._calculateRoll = jasmine.createSpy().and.returnValue(3);
      game.roll();
      expect(game.score).toEqual(23);
    });
  });
});
