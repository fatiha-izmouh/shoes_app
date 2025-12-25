'use client'

import { useActionState, useState } from 'react'
import { updateProduct } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

const IMAGE_FIELDS = ['image', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'] as const

export default function ProductEditForm({ product }: { product: any }) {
    const updateProductWithId = updateProduct.bind(null, product.id_produit)
    const [state, formAction, isPending] = useActionState(updateProductWithId, null)
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

    return (
        <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Product Name</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={product.nom}
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
                        defaultValue={product.prix}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="shipping" className="text-gray-200">Shipping Cost</Label>
                <Input
                    id="shipping"
                    name="shipping"
                    type="number"
                    step="0.01"
                    defaultValue={product.frais_livraison || 0}
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
                    defaultValue={product.description}
                />
            </div>

            <div className="space-y-4">
                <Label className="text-gray-200">Product Images (Up to 7)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {IMAGE_FIELDS.map((field, index) => (
                        <div key={field} className="space-y-2">
                            <Label htmlFor={field} className="text-xs text-gray-400">
                                {index === 0 ? 'Main Image' : `Image ${index + 1}`}
                            </Label>
                            <div className="relative aspect-square w-full rounded-md overflow-hidden bg-gray-800 border border-gray-700 hover:border-amber-600 transition-colors">
                                {imagePreviews[field] ? (
                                    <Image src={imagePreviews[field]!} alt={`New ${field}`} fill className="object-cover" />
                                ) : product[field] ? (
                                    <img src={product[field]} alt={`Current ${field}`} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-[10px] text-center p-2">
                                        No image
                                    </div>
                                )}
                                <input
                                    id={field}
                                    name={field}
                                    type="file"
                                    accept="image/*"
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

            {state?.success && (
                <div className="text-green-500 text-sm font-medium">
                    Product updated successfully
                </div>
            )}

            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8"
                    disabled={isPending}
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    )
}
