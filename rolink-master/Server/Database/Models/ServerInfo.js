import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const Serverinfo = new Schema({
    ServerId: {
        type: String
    },
    VerifiedRole: {
        type: Number
    }
});


export default mongoose.model('serverinfo', Serverinfo);