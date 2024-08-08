const AccountService = require('../services/account.service');

class AccountController {
    
    register = async (req,res) =>{
        try {
            const register = await AccountService.register(req.body)
            res.status(register.statusCode).json(register.message)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
    login = async (req,res) =>{
        try {
            const login = await AccountService.login(req.body)
            res.status(login.statusCode).json(login.message)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
    
}

module.exports = new AccountController