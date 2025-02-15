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

const name = "/getrole"

async function invoke(message, args, client) {
  
  
  
  const FindNewUser = await Userdata.findOne({
    GuildedUserId: message.createdById
  }).catch(error=>{
    return message.reply({
      "embeds": [{
        "title": "Error",
        "description": "Failed to fetch userdata"
        }]
    }).catch(error1=>{return})
  })
  
  
  if (!FindNewUser) return message.reply({
      "embeds": [{
        "title": "Error",
        "description": "You are not verified please try `/verify {Roblox_User}`"
        }]
    
      }).catch(error=>{error})
  
  await WaitingForVerification.deleteOne({
      GuildedUserId: message.createdById
    }).catch(error => message.reply({
      "embeds": [{
        "title": "Error",
        "description": "Failed to delete entry"
        }]
    })).catch(error1=>{return})
  
  const Server = await ServerInfo.findOne({
    ServerId: message.serverId
  }).catch(error=>{return})
  
  if (!Server) return message.reply({
      "embeds": [{
        "title": "Error",
        "description": "This server hasn't setup Rolink, Please message the server owner"
        }]
    }).catch(error=>{return})
  
    
  axios.request({
      method: "PUT",
      url: `https://www.guilded.gg/api/v1/servers/${message.serverId}/members/${message.createdById}/roles/${Server.VerifiedRole}`,
      headers: {
        Authorization: "Bearer",
        "Content-Type": "application/json"
      }
    })
    .then(response120 => {
      try {
        
        const username = axios.get(`https://www.guilded.gg/api/users/${message.createdById}`)
          .then(
            response1 => {
              axios.request({
                  method: "PUT",
                  url: `https://www.guilded.gg/api/v1/servers/${message.serverId}/members/${message.createdById}/nickname`,
                  headers: {
                    Authorization: "Bearer"
                  },
                  data: {
                    "nickname": `${response1.data.user.name} (${FindNewUser.RobloxUser})`
                  }
                })
                .then(response => console.log(response))
                .catch(err => console.log())
              
              
            }
          )
          .catch(error => {
            console.log(error)
          })
        
        message.reply({
            "embeds": [{
              "title": "Success",
              "description": `Successfuly Verified`
                }]
          }).catch(error=>{return})

        

      } catch (error) {
        console.log(error)
      }

    })
    .catch(error => {
      try {
        if (error.response && error.response.data) return message.reply({
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
