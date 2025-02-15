import fs from 'fs'
const once = false

const name = "messageCreated"

const events = fs
	.readdirSync('./events/Commands')
	.filter((file) => file.endsWith('.js'));

async function invoke(client,message){
    for (let event of events) {
        const eventFile = await import(`./Commands/${event}`);
        if(message.content.startsWith(eventFile.name)){
            eventFile.invoke(message,message.content.slice(eventFile.name.length + 1), client)
        }
    }

}
;
export { once, name, invoke };