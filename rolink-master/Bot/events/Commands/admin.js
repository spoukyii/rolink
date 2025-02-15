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


const name = "/admiubipyvbhpjin"

async function invoke(message, args, client) {
    
try{

    if(!args) return message.reply({
        "embeds": [{
            "title": "Error",
            "description": `Empty`
        }]
    }).catch(error=>{return})

    axios.request({
        method: "GET",
        url: `https://www.guilded.gg/api/v1/servers/${message.serverId}`,
        headers: {
            Authorization: "Bearer",
            "Content-Type": "application/json"
        }
    }).then(async response23 => {

        if (!response23 && response23.data && response23.data.server) {
                return message.reply({
                    "embeds": [{
                        "title": "Error",
                        "description": `An error has occurred, Attempted to get server info`
                    }]
                }).catch(error=>{return})
        }

        const UserId = message.createdById

        const ServerOwnerId = response23.data.server.ownerId

        if (ServerOwnerId != UserId) {
                
                return message.reply({
                    "embeds": [{
                        "title": "Error",
                        "description": `You are not the owner of this guild`
                    }]

                }).catch(error=>{return})

        }

        const ServerRegisteredAlready = await ServerInfo.findOne({
            ServerId: message.serverId
        }).catch(error=>{
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": `Failed to fetch Serverinfo`
                }]

            }).catch(error=>{return})
        })

        if (!ServerRegisteredAlready) return message.reply({
            "embeds": [{
                "title": "Error",
                "description": "Please do `/setup` first"
            }]}).catch(error=>{return})



        const ServerId = await new ServerInfo({
            ServerId: message.serverId,
            VerifiedRole: ServerRegisteredAlready.VerifiedRole,
            AdminRole: args
        }).save().catch(error=>{
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": "Failed to save ServerInfo"
            }]})
        })

        await ServerRegisteredAlready.deleteOne({
            ServerId: message.serverId
        }).catch(error=>{return})
        

            message.reply({
                "embeds": [{
                    "title": "Rolink Setup",
                    "description": "Successfully set admin role to <@" + args + ">"
                }]
            }).catch(error=>{return})
    }).catch(error=>{
        message.reply({
            "embeds": [{
                "title": "Error",
                "description": "Failed to fetch API"
            }]
        }).catch(error=>{return})
    })
} catch (error){
    message.reply({
        "embeds": [{
            "title": "Error",
            "description": "Unable to handle error"
        }]
    }).catch(error=>{return})
}

};

export {
    name,
    invoke
}
