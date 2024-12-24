
import { JwtPayload } from "jsonwebtoken";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


 // Adjust the path to your User model if necessary


/*  import User from './../modules/user/user.model';
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
 */