import mongoose, {Schema} from "mongoose";

const commentSchema =  new Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export const Comment = mongoose.model("Comment", commentSchema)