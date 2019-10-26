
let clients = {};
let questions = {}
// let io = null;

const isSimilar = (ans1, ans2) => {
  return ans1 == ans2;
}

// We import io_instance so we can have multiple channels each for a different boss
module.exports = function(io_instance, socket) {
  (function() {
    // io = io_instance; // Encapsulation
    socket.emit('test', { hello: 'world' });

    socket.on('answer', (data) => {
      const { username, answer, targetUser } = data;
      if(questions[targetUser]){
        let result = isSimilar(answer,questions[targetUser][1]);
        socket.emit('answer',{result});
        // DEBUG
        console.log(username, " is paired with: ", targetUser);  
        console.log(username, " answered ", answer, ", which is ", result);  
      } else {
        socket.in(username).emit('answer', {error: "Error user has not answered question"});
      }
    });

    socket.on('party', (data) => {
      const { username, question, answer } = data;
      // DEBUG
      console.log(username, " has joined the party");
      socket.join(username); // Joins that user's room.
      clients[username] = false;
      questions[username] = [question, answer];
    })
  })();
};

