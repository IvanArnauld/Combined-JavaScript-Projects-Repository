//import matColours from "./matdes100colours.json" assert { type: "json" };
import moment from "moment";
import { promises as fsp } from "fs";
const names = [];
const rooms = [];
const dialogInfo = [];
const colorAdmin = "#1b5e20";

const loadColours = async () => {
	let rawData = await fsp.readFile("./matdes100colours.json");
	return JSON.parse(rawData);
};
const matColours = await loadColours();

const socketHandlers = {
	handleConnection: (socket, client) => {
		if (names.includes(client.name)) {
			socket.emit(
				"nameexists",
				`The name ${client.name} is already taken, try a different one`
			);
		}
		else{
			let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
			let colorId = matColours.colours[coloridx];
			while (colorId === "#1b5e20") {
				coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
				colorId = matColours.colours[coloridx];
			}
			socket.name = client.name;
			socket.room = client.room;
			socket.color = colorId;

			socket.join(client.room);

			names.push(client.name);
			dialogInfo.push({
				user: socket.name,
				room: socket.room,
				color: socket.color,
			});

			console.log(`${socket.name} has joined ${client.room}`);
			let clientText = `Admin says: room: ${socket.room} @${moment().format(
				"h:mm:ss a"
			)} \nWelcome ${client.name}...`;
			socket.emit("welcome", { text: clientText, color: colorAdmin });
			clientText = `Admin says: room: ${socket.room} @${moment().format(
				"h:mm:ss a"
			)} \n${socket.name} has joined the ${client.room} room!`;
			socket
				.to(client.room)
				.emit("someonejoined", { text: clientText, color: colorAdmin });
		}
	},
	handleDisconnect: (socket) => {
		let clientText = `Admin says: room: ${socket.room} @${moment().format(
			"h:mm:ss a"
		)} \n${socket.name} has left the ${socket.room} room.`;
		socket.broadcast
			.to(socket.room)
			.emit("someoneleft", { text: clientText, color: colorAdmin });
		if (socket.room !== undefined) {
		 	console.log(`${socket.name} has left ${socket.room}`);
		}
		for (let i = 0; i < names.length; i++) {
			let user = names[i];
			if (socket.name === user) {
				names.splice(i, 1);
				break;
			}
		}
		for (let i = 0; i < dialogInfo.length; i++) {
			let info = dialogInfo[i];
			if (socket.name === info.user) {
				dialogInfo.splice(i, 1);
				break;
			}
		}
	},
	handleTyping: (socket, client) => {
		socket
			.to(socket.room)
			.emit("someoneistyping", `...${socket.name} is typing`);
		//console.log(`${socket.name} is typing...`);
	},
	handleMessage: (io, socket, client) => {
		// send to everyone in the same room including sender

		let clientText = `${socket.name} says: room: ${
			socket.room
		} @${moment().format("h:mm:ss a")} \n${client.text}`;
		io.in(socket.room).emit("newmessage", {
			text: clientText,
			color: socket.color,
		});
		//console.log(`${socket.name}: ${client.text}`);
	},
	handleNewRoom: (io, room) => {
		if (!rooms.includes(room.text)) {
			let roomText = room.text;
			if (roomText !== "main") {
				rooms.push(roomText);
				console.log(`New ${room.text} room created...`);
			}
		}
		io.sockets.emit("allrooms", rooms);
		return;
	},
	handleGetRooms: (io) => {
		io.sockets.emit("allrooms", rooms);
		return;
	},
	handleGetRoomsAndUsers: (io) => {
		io.sockets.emit("roomsandusers", dialogInfo);
		return;
	},
};

export default socketHandlers;
