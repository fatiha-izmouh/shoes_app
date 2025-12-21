import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if we are in the dashboard section
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Check for the admin session cookie
        const session = request.cookies.get('admin_session')

        // If no session and not on login page, redirect to login
        if (!session && request.nextUrl.pathname !== '/dashboard/login') {
            return NextResponse.redirect(new URL('/dashboard/login', request.url))
        }

        // If session exists and on login page, redirect to dashboard
        if (session && request.nextUrl.pathname === '/dashboard/login') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*',
}
