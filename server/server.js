const Path = require("path") // Module containing utilities for working with filepaths
const Http = require("http") // Module for building/creating HTTP servers
const Express = require("express") // Module for spinning up a powerful HTTP server
const WebSocketServer = require("socket.io") // Module for spinning up a websocket server
const { manageState } = require("./gameState") // function to handle the state of the game

const port = process.env.PORT || 80 // Will use the host's PORT environment variable or 3000 for development purposes
const express_app = Express() // Creating an Express application
const express_server = Http.createServer(express_app) // Spinning up the Express server

/**
 * Telling Express that all our static files are found in 'client/'
 */
express_app.use(Express.static("client"))

/**
 * - Making a route for the root directory
 */
express_app.get("/", function (_, res) {
	res.sendFile(Path.resolve("client/index.html"))
})

express_server.listen(port, function () {
	console.log(`\nExpress server listening on port ${port}\n`)
})

const serverStartedPromise = new Promise((startManagingState) => {
	/**
	 * Spins up a websocket server that works with the Express server
	 * - You can think of it as starting a conference call alone
	 * - Listens to the default namespace `'/'` and connects to it by default
	 * - `'/'` has nothing to do with the URL—it is just a name
	 * - `io` handles the namespace connection which allows us to communicate with the client
	 */
	var io = WebSocketServer(express_server)
	startManagingState(io)
})

serverStartedPromise.then((io) => {
	console.log("Websocket server started")
	manageState(io)
})