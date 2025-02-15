import fetch from 'node-fetch'
import {
    type
} from 'os'
import ServerInfo from '../../Database/Models/ServerInfo.js'
import axios from 'axios'

const name = "/setup"

async function invoke(message, args, client) {

    axios.request({
        method: "GET",
        url: `https://www.guilded.gg/api/v1/servers/${message.serverId}`,
        headers: {
            Authorization: "Bearer",
            "Content-Type": "application/json"
        }
    }).then(response23 => {

        if (!response23 && response23.data && response23.data.server) {
            try {
                return message.reply({
                    "embeds": [{
                        "title": "Error",
                        "description": `An error has occurred, Attempted to get server info`
                    }]
                })
            } catch (error) {
                console.log(error)
            }
        }

        const UserId = message.createdById

        const ServerOwnerId = response23.data.server.ownerId

        if (ServerOwnerId != UserId) {
            try {
                return message.reply({
                    "embeds": [{
                        "title": "Error",
                        "description": `You are not the owner of this guild`
                    }]

                })
            } catch (error) {
                console.log(error)
            }

        }
        if (!args) {
            try {
                return message.reply({
                    "embeds": [{
                        "title": "Error",
                        "description": "Missing role"
                    }]
                })
            } catch (error) {
                console.log(error)
            }
        }

        axios.request({
            method: "GET",
            url: `https://www.guilded.gg/api/v1/servers/${message.serverId}/members/mpOaYWQd/roles`,
            headers: {
                Authorization: "Bearer",
                "Content-Type": "application/json"
            }
        }).then(response1 => {



            axios.request({
                method: "PUT",
                url: `https://www.guilded.gg/api/v1/servers/${message.serverId}/members/mpOaYWQd/roles/${args}`,
                headers: {
                    Authorization: "Bearer",
                    "Content-Type": "application/json"
                }
            }).then(async response => {

                const ServerRegisteredAlready = await ServerInfo.findOne({
                    ServerId: message.serverId
                })

                if (ServerRegisteredAlready) {
                    await ServerRegisteredAlready.deleteOne({
                        ServerId: message.serverId
                    })
                }

                const ServerId = new ServerInfo({
                    ServerId: message.serverId,
                    VerifiedRole: args
                }).save()

                try {

                    message.reply({
                        "embeds": [{
                            "title": "Rolink Setup",
                            "description": "Successfully set verified role to <@" + args + ">"
                        }]
                    })

                } catch (error) {
                    console.log(error)
                }

                if (!response1.data.roleIds.includes(Number(args))) {

                    axios.request({
                        method: "DELETE",
                        url: `https://www.guilded.gg/api/v1/servers/${message.serverId}/members/mpOaYWQd/roles/${args}`,
                        headers: {
                            Authorization: "Bearer",
                            "Content-Type": "application/json"
                        }
                    }).catch(error1 => console.log(error1))
                }


            }).catch(error => {
                try {
                    if (error.response && error.response.data) return message.reply({
                        "embeds": [{
                            "title": "Error",
                            "description": `An error has occurred ,  \`${error.response.data.message}\``
                        }]
                    })
                    message.reply({
                        "embeds": [{
                            "title": "Error",
                            "description": `An error has occurred`
                        }]
                    })
                } catch (error) {
                    console.log(error)
                }
            })


        }).catch(error => {
            try {
                return message.reply({
                    "embeds": [{
                        "title": "Error",
                        "description": `An error has occurred ,  \`${error.response.data.message}\``
                    }]
                })
            } catch (error) {
                console.log(error)
            }

        })



    }).catch(error => {
        try {
            return message.reply({
                "embeds": [{
                    "title": "Error",
                    "description": `An error has occurred ,  \`${error.response.data.message}\``
                }]
            })
        } catch (error) {
            console.log(error)
        }

    })

}


export {
    name,
    invoke
}
