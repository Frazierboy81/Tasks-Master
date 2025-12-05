const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const projectSchema = new Schema ({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

})

const Project = model("Project", projectSchema)

module.exports = Project;