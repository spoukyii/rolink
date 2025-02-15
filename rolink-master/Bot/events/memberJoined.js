import fs from 'fs'
import ServerInfo from '../Database/Models/ServerInfo.js';

const once = false

const name = "memberJoined"

const events = fs
	.readdirSync('./events/Commands')
	.filter((file) => file.endsWith('.js'));

async function invoke(t){
   // t.member.send("d")
};

export { once, name, invoke };