import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
        menu_items: {
            type: [],
            required: true,
            unique:true
        },

        menu_status: {
            type: String,
            required: true,
        },

        total_price: {
            type: Number,
            required: true
        },
        ordered_by: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true

        }
        
    });

export const Order = mongoose.model("Order", orderSchema);