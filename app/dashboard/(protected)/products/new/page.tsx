'use client'

import { useActionState, useState } from 'react'
import { createProduct } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default function NewProductPage() {
    const [state, formAction, isPending] = useActionState(createProduct, null)
    const [imagePreviews, setImagePreviews] = useState<{
        image: string | null
        image2: string | null
        image3: string | null
    }>({
        image: null,
        image2: null,
        image3: null,
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'image2' | 'image3') => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreviews(prev => ({
                    ...prev,
                    [field]: reader.result as string
                }))
            }
            reader.readAsDataURL(file)
        } else {
            setImagePreviews(prev => ({
                ...prev,
                [field]: null
            }))
        }
    }

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
                <form action={formAction} encType="multipart/form-data" className="space-y-6">
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

                    <div className="space-y-4">
                        <Label className="text-gray-200">Product Images</Label>
                        <p className="text-xs text-gray-400">Main image is required. Upload at least one product image.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Main Image */}
                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-xs text-gray-400">Main Image *</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => handleImageChange(e, 'image')}
                                    className="bg-gray-800 border-gray-700 text-white cursor-pointer file:cursor-pointer file:text-white file:bg-gray-700 file:border-0 file:rounded-md file:px-2 file:mr-2 hover:file:bg-gray-600 transition-colors"
                                />
                                {imagePreviews.image && (
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-amber-600">
                                        <Image
                                            src={imagePreviews.image}
                                            alt="Main image preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Image 2 */}
                            <div className="space-y-2">
                                <Label htmlFor="image2" className="text-xs text-gray-400">Image 2 (Optional)</Label>
                                <Input
                                    id="image2"
                                    name="image2"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image2')}
                                    className="bg-gray-800 border-gray-700 text-white cursor-pointer file:cursor-pointer file:text-white file:bg-gray-700 file:border-0 file:rounded-md file:px-2 file:mr-2 hover:file:bg-gray-600 transition-colors"
                                />
                                {imagePreviews.image2 && (
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-gray-600">
                                        <Image
                                            src={imagePreviews.image2}
                                            alt="Image 2 preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Image 3 */}
                            <div className="space-y-2">
                                <Label htmlFor="image3" className="text-xs text-gray-400">Image 3 (Optional)</Label>
                                <Input
                                    id="image3"
                                    name="image3"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image3')}
                                    className="bg-gray-800 border-gray-700 text-white cursor-pointer file:cursor-pointer file:text-white file:bg-gray-700 file:border-0 file:rounded-md file:px-2 file:mr-2 hover:file:bg-gray-600 transition-colors"
                                />
                                {imagePreviews.image3 && (
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-gray-600">
                                        <Image
                                            src={imagePreviews.image3}
                                            alt="Image 3 preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
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
