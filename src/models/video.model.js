import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
    videofile : {
        type : String, // cloudnary
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    duration : {
        type : Number, // cloudnary sends it
        required : true,
    },
    views : {
        type : Number,
        default : 0,
        required : true,
    },
    isPublished : {
        type : Boolean,
        required : true,
        default : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

},{timestamps : true})


mongoose.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video",videoSchema)