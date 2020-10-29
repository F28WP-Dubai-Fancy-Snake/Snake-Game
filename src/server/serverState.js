// Server needs to send data about the state of the game back to the players

const IO = require("socket.io")

function manageState(server){
    
    const io = IO(server,{})

    // connect event listener

    io.sockets.on('connection', clientSocket => {​​
        // Print to the server's terminal that a user connected
        console.log('A user connected with ID:'+clientSocket.id);
    }​​);
    
}

exports.manageState = manageState
