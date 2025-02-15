import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const WaitingForVerification = new Schema({
    GuildedUserId: {
        type: String
    },
    RobloxUser: {
        type: String
    },
    GuildedUser: {
        type: String
    },
    GuildedServer: {
        type: String
    }
});


export default mongoose.model('waitingforverification', WaitingForVerification);