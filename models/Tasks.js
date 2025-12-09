const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
})

const Tasks = model("Tasks", taskSchema)

module.exports = Tasks;