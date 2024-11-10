const Usermodel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const { generateToken, genereateRefreshToken, verifyRefreshToken, verifyToken } = require("../utils/jwt");

class AuthService {
    static async findUser(identifier){
        try{
            const user = await Usermodel.findOne({$or: [{email:identifier}, {username:identifier}]}); 
            return user;    
        }
        catch(err){
            throw err;
        }
    }
    static async passwordMatch(password, user){
        try{
            const isMatch = await bcrypt.compare(password, user.password);
            return isMatch;
        }
        catch(err){
            throw err;
        }
    }
    static async tokenGenerator(userName){ 
        try{
            return generateToken(userName);
        }
        catch(err){
            throw err;
        }
    }
    static async refreshTokenGenerator(userName){
        try{
            return genereateRefreshToken(userName);
        }
        catch(err){
            throw err;
        }
    }
    static async verifyRefToken(token){
        try{
            const rspns = verifyRefreshToken(token);
            return rspns; 
        }
        catch(err){
            throw err;
        }
    }
    static async saveRefreshToken(token, username){
        try{
            const user = await Usermodel.findOne({username:username});
            if (!user) {
                throw new Error('User not found');
            }
            user.refreshToken = token;
            await user.save();
        }
        catch(err){
            throw err;
        }
    }
    static async checkRefreshToken(token, username){
        try{
            const user = await Usermodel.findOne({username:username});
            if(!user){
                return false;
            }
            if(user.refreshToken === token){
                return true;
            }
            return false;
        }
        catch(err){
            throw err;
        }
    }
    static async deleteUserRefreshToken(username){
        try{
            const user = await Usermodel.findOneAndUpdate(
                { username }, 
                {refreshToken: null},
                { new: true, runValidators: true } 
            )
            if(!user){
                throw new Error("User not found");
            }
            user.refreshToken = null;
            await user.save();
            return true;
        }
        catch(err){
            throw err;
        }
    }

    static async getAllUsers() {
        try {
            const users = await Usermodel.find({});
            return users;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AuthService;