const express = require('express');
const router = express.Router();
const {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
} = require('../controllers/myAccountcontroller');
router.post('/', createAccount);               
router.get('/', getAllAccounts);            
router.get('/:id', getAccountById);          
router.put('/:id', updateAccount);           
router.delete('/:id', deleteAccount);         

module.exports = router;