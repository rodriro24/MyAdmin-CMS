export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*", "/settings"] } // protege /dashboard y todas sus subrutas