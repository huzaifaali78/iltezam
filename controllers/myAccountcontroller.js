const myAccount = require('../models/myaccountmodel');

const createAccount = async (req, res) => {
    try {
        const { accountAccess, paymentMethod, accountManagement } = req.body;
        const newAccount = new myAccount({
            accountAccess,
            paymentMethods: paymentMethod,
            accountManagement
        });
        const savedAccount = await newAccount.save();
        return res.status(201).json({
            message: "Account created successfully",
            data: savedAccount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await myAccount.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Accounts fetched successfully",
            data: accounts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Account ID is required" });
        const account = await myAccount.findById(id);
        if (!account) return res.status(404).json({ message: "Account not found" });
        res.status(200).json({
            message: "Account fetched successfully",
            data: account,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await myAccount.findById(id);
        if (!account) return res.status(404).json({ message: "Account not found" });
        Object.assign(account, req.body);
        const updatedAccount = await account.save();
        res.status(200).json({
            message: "Account updated successfully",
            data: updatedAccount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await myAccount.findById(id);
        if (!account) return res.status(404).json({ message: "Account not found" });
        await myAccount.findByIdAndDelete(id);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
};
