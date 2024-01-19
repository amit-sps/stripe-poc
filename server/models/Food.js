const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: true,
    },
    image: {
        type: String, // This could be a URL pointing to the food image
    },
    // Other properties related to food, e.g., ingredients, allergens, etc.
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
