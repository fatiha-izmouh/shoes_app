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

const IMAGE_FIELDS = ['image', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'] as const
type ImageField = typeof IMAGE_FIELDS[number]

export default function NewProductPage() {
    const [state, formAction, isPending] = useActionState(createProduct, null)
    const [imagePreviews, setImagePreviews] = useState<Record<string, string | null>>({
        image: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        image6: null,
        image7: null,
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
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
        <div className="max-w-4xl mx-auto space-y-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Label className="text-gray-200">Product Images (Up to 7)</Label>
                        <p className="text-xs text-gray-400">Main image is required. You can add up to 6 secondary images.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {IMAGE_FIELDS.map((field, index) => (
                                <div key={field} className="space-y-2">
                                    <Label htmlFor={field} className="text-xs text-gray-400">
                                        {index === 0 ? 'Main Image *' : `Image ${index + 1}`}
                                    </Label>
                                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-gray-700 hover:border-amber-600 transition-colors bg-gray-800">
                                        {imagePreviews[field] ? (
                                            <Image
                                                src={imagePreviews[field]!}
                                                alt={`Preview ${field}`}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-600 text-[10px] text-center p-2">
                                                Click to upload
                                            </div>
                                        )}
                                        <input
                                            id={field}
                                            name={field}
                                            type="file"
                                            accept="image/*"
                                            required={index === 0}
                                            onChange={(e) => handleImageChange(e, field)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            ))}
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
                            className="bg-amber-600 hover:bg-amber-700 text-white px-8"
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
