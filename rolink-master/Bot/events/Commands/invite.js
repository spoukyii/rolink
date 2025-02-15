import WaitingForVerification from '../../Database/Models/WaitingForVerification.js'
import {
    Client,
    Embed,
    User
} from 'guilded.js'
import Userdata from '../../Database/Models/Userdata.js';
import ServerInfo from '../../Database/Models/ServerInfo.js'
import AssignRole from '../../Actions/AssignRole.js'
import axios from 'axios'

const name = "/invite"

async function invoke(message, args, client) {
    message.reply({
        "embeds": [{
            "title": "Invite",
            "description": "Invite Rolink to your server [Invite](https://www.guilded.gg/b/ab408bb7-a5ee-47aa-a85c-96c2d5157465)"
        }]
    }).catch(error => {console.log(error)})
}

export {
    name,
    invoke
}