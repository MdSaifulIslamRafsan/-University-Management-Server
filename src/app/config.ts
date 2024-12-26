import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    NODE_ENV : process.env.NODE_ENV,
    port : process.env.PORT,
    db_url : process.env.MONGO_DB_URL,
    default_password : process.env.DEFAULT_PASSWORD,
    access_token : process.env.ACCESS_TOKEN,
    refresh_token : process.env.REFRESH_TOKEN,
    access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN,
    
}

