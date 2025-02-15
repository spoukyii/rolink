import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserData = new Schema({
    GuildedUserId: {
        type: String
    },
    RobloxUser: {
        type: String
    }
});


export default mongoose.model('userdata', UserData);