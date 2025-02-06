const authService = require("../services/auth-service");
const Response = require("../utils/response");
exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body; 

        const user = await authService.findUser(identifier);

        if (!user) {
            return Response.notFound(res,"User not found" );
        }

        const isMatch = await authService.passwordMatch(password, user);

        if (!isMatch) {
            return Response.unauthorized(res,"Invalid credentials" );
        }
        const token = await authService.tokenGenerator(user.username);
        const refreshToken = await authService.refreshTokenGenerator(user.username);
        
        await authService.saveRefreshToken(refreshToken, user.username);

        res.json({ status: true, authToken: token, refreshToken: refreshToken });
    } catch (error) {
        console.error(error);
        return Response.error(res,"Internal server error");
       
    }
}

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return Response.unauthorized(res,'No refresh token, authorization denied');
        }

        const tokenVerify = await authService.verifyRefToken(refreshToken);

        const refreshTokenCheck = await authService.checkRefreshToken(refreshToken, tokenVerify.id); // checking if the refresh token exists in the database.

        if (!refreshTokenCheck) {
            return Response.unauthorized(res,"Invalid or expired refresh token");
        }

        if (!tokenVerify) {
            return Response.unauthorized(res,"Invalid or expired refresh token");
        }

        const token = await authService.tokenGenerator(tokenVerify.id);
        const newRefreshToken = await authService.refreshTokenGenerator(tokenVerify.id);

        await authService.saveRefreshToken(newRefreshToken, tokenVerify.id);

        res.json({ status: true, authToken: token, refreshToken: newRefreshToken });
    } catch (error) {
       
        console.error(error);
        return Response.error(res,"Internal server error",)
    }
}

exports.logout = async (req, res) => {
    try{
        const username = req.user; 
        const resp = await authService.deleteUserRefreshToken(username);
        if(resp){
            return Response.success(res,"User logged out successfully");
        }
        else{
            return Response.badRequest(res,"User logout failed");
        }

    }catch(error){
        if(error.message === "User not found"){
            return Response.notFound(res,error.message);
        }
        if(error.message === "Invalid token"){
            return Response.badRequest(res,error.message);
        }
        console.error(error);
        return Response.error( res,"Internal server error");
       
    }
}

exports.allUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsers(); 

        if(users){
            return Response.success(res,"All users profiles are fetched succcessfully",users);
        }
        
    } catch (error) {
        console.error(error);
        return Response.error(res, "Internal server error"); 
    }
}