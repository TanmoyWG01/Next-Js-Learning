export {}

export type Roles = "admin" | "moderator";

declare global {
    interface CustomeJWTSessionClaims {
        metadata: {
            roles: Roles[];
        }
    }
}