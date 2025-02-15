import fetch from 'node-fetch'
import {
    type
} from 'os'
import WaitingForVerification from '../../Database/Models/WaitingForVerification.js';
const name = "/reset"

async function invoke(message, args) {
    try{
    //Checking if the server is in the database already

    const FindUser = await WaitingForVerification.findOne({
        GuildedUserId: message.createdById
    }).catch(console=>{return})

    if (!FindUser) return message.reply({
        "embeds": [{
            "title": "Error",
            "description": "You do not have a pending verification prompt, Please do `/verify {username}`"
        }]
    }).catch(error=>{return})


    const DeleteVerificationPrompt = await WaitingForVerification.deleteOne({
        GuildedUserId: message.createdById
    }).catch(error => message.reply({
        "embeds": [{
            "title": "Error",
            "description": "Failed to delete entry"
        }]
    })).catch(error=>{return})


    message.reply({
        "embeds": [{
            "title": "Error",
            "description": "Successfully reset your verification prompt"
        }]
    }).catch(erorr => {
        try {
            message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "Failed to send `Successfully reset your verification prompt` Message"
                }]
            })
        } catch (error) {
            console.log(error)
        }


    })
    }catch(error){return}

}

export {
    name,
    invoke
}