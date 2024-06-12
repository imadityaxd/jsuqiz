import mongoose from "mongoose";

const quizSchema  = new mongoose.Schema({
    question:{
        type:String,
        require:true,
    },
    options:{
        type:String,
        require:true,
    }
});
const Quiz = new mongoose.model("Quiz",quizSchema);

export {Quiz};
