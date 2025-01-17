const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // status: {
        //     type: String,
        //     enum: ["requested", "accepted", "rejected"],
        //     default: "requested",
        // },
    },
    {
        timestamps: true,
    },
);

const model = mongoose.model("Follow", schema);

module.exports = model;
