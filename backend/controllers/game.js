/**
 * A singleton game instance class.
 * - Clients hold the playing players. The number indicates their current score.
 * - Questions is a dictionary of (player, [question, answer]) relations.
 * - Pairs is a list of names forming a linked list
 */

class Game {
    constructor() {
        this.state = {
            clients: {},
            questions: {},
            pairs: null,
        };
    }

    reset() {
        let score = this.state.clients;
        this.state = {
            clients: {},
            questions: {},
            pairs: null,
        };
        return score;
    }

    addClient(data) {
        if (this.state.pairs) return false;
        const { username, question, answer } = data;
        this.state.clients[username] = 0;
        this.state.questions[username] = [question, answer];
    }

    removeClient(username) {
        let { clients, questions, pairs } = this.state;

        if (pairs) return false;
        return delete clients[username] &&
            delete questions[username];
    }

    // Match the clients
    match() {
        // Shuffle
        let names = Object.keys(this.state.clients);
        for (let i = names.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = names[i];
            names[i] = names[j];
            names[j] = temp;
        }
        this.state.pairs = names;
        return names;
    }

    similar(ans1, ans2) {
        return ans1 == ans2;
    }

    submitAnswer(username, answer) {
        let { clients, questions, pairs } = this.state;

        if (!pairs) return false; // Check we have pairs already
        let pairInd = pairs.indexOf(username);
        if (pairInd < 0) return false; // Check if pair exists in Array
        let pair = pairs[(pairInd + 1) % pairs.length]
        if (!this.similar(answer, questions[pair][1])) return false;
        else {
            clients[username] = 1;
            return true;
        }
    }
}

module.exports = (function() {
    const game = new Game();

    return {
        getState: () => game.state,
        addClient: (data) => game.addClient(data),
        removeClient: (username) => game.removeClient(username),
        start: () => game.match(),
        submit: (username, answer) => game.submitAnswer(username, answer),
        end: () => game.reset()
    }
})()