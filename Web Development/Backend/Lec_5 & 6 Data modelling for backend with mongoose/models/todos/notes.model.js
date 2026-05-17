import mongoose, {Schema} from "mongoose";

const notesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pinned:{
        type: Boolean,
        default: false
    },
    archived:{
        type: Boolean,
        default: true
    },
    labels:{
        type: String
    }
},{timestamps: true})