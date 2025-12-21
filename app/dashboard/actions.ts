'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Hardcoded credentials as requested
    if (email === 'valkyleather@gmail.com' && password === 'Medsoui2002@') {
        // Set a session cookie
        const cookieStore = await cookies()
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

        redirect('/dashboard')
    }

    return { error: 'Invalid credentials' }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/dashboard/login')
}
