'use client'

import { useActionState } from 'react'
import { createProduct } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function NewProductPage() {
    const [state, formAction, isPending] = useActionState(createProduct, null)

    if (state?.success) {
        redirect('/dashboard/products')
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/products"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Product</h1>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-200">Product Name</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price" className="text-gray-200">Price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            required
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-200">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                            placeholder="Enter product description..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-200">Images (URLs)</Label>
                        <Input
                            name="image"
                            placeholder="Main Image URL"
                            className="bg-gray-800 border-gray-700 text-white mb-2"
                        />
                        <Input
                            name="image2"
                            placeholder="Second Image URL"
                            className="bg-gray-800 border-gray-700 text-white mb-2"
                        />
                        <Input
                            name="image3"
                            placeholder="Third Image URL"
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm font-medium">
                            {state.error}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
