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

const name = "/help"

async function invoke(message, args, client) {
    message.reply({
        "embeds": [{
            "title": "Help",
            "description": "`/verify ROBLOX_USER` - Verify User,\n`/reset` - Reset verification prompt,\n`/getrole` - Get role after verification,\n`/setup VERIFIED_ROLE_ID` - Role given when a user verifies,\n`/invite` - Invite Rolink to your server"
        }]
    }).catch(error => {console.log(error)})
}

export {
    name,
    invoke
}