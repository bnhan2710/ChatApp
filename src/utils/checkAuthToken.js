const jwt = require('jsonwebtoken');

const checkAuthToken = async (token) => {
    if(!token) return {statusCode: 401, message: 'Access denied'}
    try{
        const verified = await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return {statusCode: 401, message: 'Invalid token'}
        })
            const decode =jwt.decode(token)
        return { statusCode: 200, message: 'verified' , user: decode}
    }catch(err){
        // console.log(err)
        throw new Error(err.message)
    }
}

module.exports = {checkAuthToken}