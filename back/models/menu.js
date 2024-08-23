import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
        item_name: {
            type: String,
            required: true,
            unique:true
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true
        }
        
    });

export const Menu = mongoose.model("Menu", menuSchema);