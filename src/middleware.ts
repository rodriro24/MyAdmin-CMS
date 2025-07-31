export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*"] } // protege /dashboard y todas sus subrutas