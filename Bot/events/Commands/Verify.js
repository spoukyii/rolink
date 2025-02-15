import fetch from 'node-fetch'

import WaitingForVerification from '../../Database/Models/WaitingForVerification.js'

import {
    Client,
    Embed,
    User
} from 'guilded.js'

import {
    set
} from 'mongoose'
import Userdata from '../../Database/Models/Userdata.js';
import axios from 'axios'
import ServerInfo from '../../Database/Models/ServerInfo.js'

const name = "/verify"

async function invoke(message, args, client) {

try{

    if (!args) {
        try {
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "You did not provide a username"
                }]
            });
        } catch (error) {
            console.log(error)
        }
    }

    const UserNameData = axios.request({
        method: "GET",
        url: `https://api.roblox.com/users/get-by-username?username=${args}`
    }).then(async response51 => {

        if(!response51.data.Id) return message.reply({
            "embeds": [{
                "title": "Error",
                "description": "Invalid User"
            }]
        }).catch(error=>{return}); 


    const UserVerifiedAlready = await Userdata.findOne({
        GuildedUserId: message.createdById
    }).catch(error=>{return});
    

    if (UserVerifiedAlready) {
        try {
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "You already have an account linked, Please do `/relink` to relink your account"
                }]
            });
        } catch (error) {
            console.log(error)
        }
    }

    const FindUser = await WaitingForVerification.findOne({
        GuildedUserId: message.createdById
    }).catch(error=>{return})

    if (FindUser) {
        try {
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "You already have a pending verification, Please do `/reset` to reset the prompt"
                }]
            })
        } catch (error) {
            console.log(error)
        }
    }
    if (args.length == 1 || args.length == 2) {
        try {
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "Failed to verify, Invalid user?"
                }]
            })
        } catch (error) {
            console.log(error)
        }
    }


    message.reply({
        "embeds": [{
            "title": "Rolink",
            "description": "Please join [Verification Game](https://www.roblox.com/games/11630002981/Rolink-Verification) as `" + args + "` to verify\nOnce you verify do `/getrole` after"
        }],
        isPrivate: false
    }).then((msg) => {
        const NewUser = new WaitingForVerification({
            GuildedUserId: message.createdById,

            RobloxUser: args.toLowerCase(),

            GuildedServer: message.serverId
        }).save()
    }).catch(error => {
        try {
            message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "An error has occurred, Attempted to save WAITING_FOR_VERIFICATION"
                }]
            })
        } catch (error) {
            console.log(error)
        }

    })

})
} catch(error){
    return
}
    }

export {
    name,
    invoke
}