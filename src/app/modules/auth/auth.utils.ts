import jwt  from 'jsonwebtoken';
const createJwtToken = (
    JwtPayload : {role :string , id : string},
    secreteToken : string,
    expiresIn : string
    

) => {
    return jwt.sign(JwtPayload, secreteToken , {
        expiresIn
    })

}

export default createJwtToken