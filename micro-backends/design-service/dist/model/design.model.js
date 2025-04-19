"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DesignSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    width: {
        type: Number,
        required: true
    },
    canvasData: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Design = mongoose_1.models.Design || (0, mongoose_1.model)("Design", DesignSchema);
exports.default = Design;
