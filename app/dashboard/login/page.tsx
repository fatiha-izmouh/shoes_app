'use client'

import { useActionState } from 'react'
import { login } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Sign in to manage your store</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-200">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="admin@example.com"
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-amber-600 focus:border-amber-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-200">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-amber-600 focus:border-amber-600"
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm text-center font-medium">
                            {state.error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        disabled={isPending}
                    >
                        {isPending ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
