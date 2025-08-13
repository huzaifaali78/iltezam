const mongoose = require("mongoose");


const accountAccessSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    notification: { type: Boolean, default: false }
});
const paymentMethodSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Mastercard", "Visa", "Other"], 
        required: true
    },
    cardNumber: { type: String }, 
    expiryDate: { type: String }, 
    default: { type: Boolean, default: false }
});


const accountManagementSchema = new mongoose.Schema({
    deactivateAccount: { type: Boolean, default: false },
    logout: { type: Boolean, default: false }
});


const myAccountSchema = new mongoose.Schema({
    accountAccess: { type: accountAccessSchema, required: true },
    paymentMethods: { type: [paymentMethodSchema], default: [] },
    accountManagement: { type: accountManagementSchema, default: {} }
}, { timestamps: true });


const MyAccount = mongoose.model("MyAccount", myAccountSchema);

module.exports = MyAccount;

