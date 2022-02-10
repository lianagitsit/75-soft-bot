// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const { token, devChannelId } = require('./config.json');
const firebaseConfig = require("./firebaseConfig");

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Create a new client instance
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', async (reaction, users) => {
	if (reaction.message.channelId !== devChannelId) return;

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}

	const username = reaction.message.author.username;
	const cache = reaction.message.reactions.cache;
	console.log(users);

	// see if user is already added to the table for that day

	const whitelist = ['💧', '🏋️‍♀️', '🥗', '📖'];
	let key = whitelist.find(emoji => emoji === reaction.emoji.name);

	if (!key) return;

	// set(ref(database, 'completed/' + date), {
	// 	username: username,
	// 	[key]: true
	//   });
// four reaction adds. find the entry for the user and date. 
// if it's there, update the row to tick the entry
}) 



// Login to Discord with your client's token
client.login(token);