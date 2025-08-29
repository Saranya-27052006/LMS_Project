import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

class AuthService {
    generateToken(user: any): string {
        try{
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
            };
            return jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });
        } catch (error) {
           throw new Error("Error while generating token")
        }
    }

    verifyToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
            return decoded;
        } catch (error) {
            return null;
        }
    }
}
export default new AuthService();
