const game = require('../controllers/game');

describe('game class', () => {
  test('adding clients', () => {
    game.addClient({username:'wer2213', question: 'age?', answer: 21});
    game.addClient({username:'bianca', question: 'food?', answer: 'taco'});
    game.addClient({username:'jim', question: 'sport?', answer: 'baske'});
    expect(game.getState()).toEqual({
      clients: {'wer2213': 0, 'bianca': 0, 'jim': 0},
      questions: {'wer2213': ['age?',21],'bianca': ['food?','taco'],'jim': ['sport?','baske']},
      pairs: null});
  });

  test('reset game', () => {
    game.end();
    expect(game.getState()).toEqual({
      clients: {},
      questions: {},
      pairs: null});
  });

  test('removing clients', () => {
    game.removeClient({username:'wer2213'});
    expect(game.getState()).toEqual({
      clients: {},
      questions: {},
      pairs: null});
  });

  test('starting game', () => {
    game.addClient({username:'wer2213', question: 'age?', answer: 'taco'});
    game.addClient({username:'bianca', question: 'food?', answer: 'taco'});
    game.start();
    expect(game.getState().pairs).not.toBe(null);
  });

  test('submitting game', () => {
    game.submit('wer2213', 'taco');
    game.submit('wer2213', 'taco');
    game.submit('bianca', 'taco');
    expect(game.getState().clients).toEqual({'wer2213':1,'bianca':1});
  });
});