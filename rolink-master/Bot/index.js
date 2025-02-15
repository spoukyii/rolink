import { Client }  from "guilded.js"
import fs from 'fs'
import mongoose from 'mongoose'
const client = new Client({ token: "token"});


const events = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));


	for (let event of events) {

		const eventFile = await import(`./events/${event}`);

		if (eventFile.once)
			client.once(eventFile.name, (...args) => {
				eventFile.invoke(...args);
			});
		else
			client.on(eventFile.name, (...args) => {
				eventFile.invoke(client,...args);
			});

		
	}

mongoose.connect('db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


client.login("token");
