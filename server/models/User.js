const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    stripeCustomer: {
        type: String,
        required: true,
    },
    addresses: [{
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        // Other address-related fields if needed
    }],
    phoneNumber: {
        type: String,
        required: true,
    },
    favoriteFoods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
    }],
    orders: [{
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
        items: [{
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
    }],
});



// Example of referencing other models (Food and Order)

const User = mongoose.model('User', userSchema);

module.exports = User;
