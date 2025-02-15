import WaitingForVerification from './Database/Models/WaitingForVerification.js';
import Userdata from './Database/Models/Userdata.js';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http'
import mongoose from 'mongoose';
import axios from 'axios'
import SendMessage from './Actions/SendMessage.js'
import AssignRole from './Actions/AssignRole.js'

const webhook = ''

mongoose.connect('DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

var server = http.createServer(app);


app.get('/api/getuser/:guildedId', async (req, res) => {
    if (req.params.guildedId.match(/^[a-zA-Z0-9-_]+$/)) {
        const User = await Userdata.findOne({ GuildedUserId: req.params.guildedId })
        if (!User) return res.json({ Success: false, Message: "Failed to find user" })
        res.json({ Success: true, Roblox_User: User.RobloxUser, Guilded_Id: req.params.guildedId })
    } else {
        res.json({ Success: false, Message: "stop." })
    }
})

app.get('/api/verifyuser/:guildedId/:secret', async (req, res) => {
    const { guildedId, secret } = req.params;
    if (guildedId.match(/^[a-zA-Z0-9-_]+$/)) {
        if (!secret || !guildedId) return res.status(400).json({ Success: false, Message: "Invalid parameters" })

        if (secret != "secret") return res.status(403).send("Forbidden")

        const FindUser1 = await WaitingForVerification.findOne({ GuildedUserId: guildedId })

        if (!FindUser1) return res.json({ Success: false, Message: "Failed to find user" })


        let createUser = await new Userdata({
            GuildedUserId: FindUser1.GuildedUserId,
            RobloxUser: FindUser1.RobloxUser,
        })

        await createUser.save().then(async () => {
            await WaitingForVerification.deleteOne({ GuildedUserId: guildedId })
            //Send request to get username
            const username = axios.get(`https://www.guilded.gg/api/users/${FindUser1.GuildedUserId}`).then(
                response => {

                }
            ).catch(error => {
                console.log(error)
            })

            res.json({ Success: true, Message: "Successfully verified user" })
        })

    } else {
        res.json({ Success: false, Message: "stop." })
    }

})

app.get('/api/getuserf/:robloxuser', async (req, res) => {
    //Search for user
    if (req.params.robloxuser.match(/^[a-zA-Z0-9-_]+$/)) {
        const FindUser = await WaitingForVerification.findOne({ RobloxUser: req.params.robloxuser })

        if (!FindUser) return res.json({ Success: false, Message: "Unable to find user" })

        //Send Request
        const username = axios.get(`https://www.guilded.gg/api/users/${FindUser.GuildedUserId}`).then(
            response => {
                res.json({ Success: true, User: response.data.user.name, GuilderUserId: FindUser.GuildedUserId })
            }
        ).catch(error => {
            res.json({ Success: false, Message: "Failed to GET" })
        })
    } else {
        res.json({ Success: false, Message: "stop." })
    }
})

app.use('*', async (req, res) => {
    res.status(404).json({ Success: false, Message: "404 Not Found" })
})

server.listen(3040)
const webhookData = {
    embeds: [
        {
            title: "API Server",
            description: "Started up successfully\n\n**Time:** " + new Date().toISOString(),
            color: 0xf3c40b
        }
    ]
}
axios.post(webhook, webhookData)
