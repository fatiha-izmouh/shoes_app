'use client'

import { useActionState } from 'react'
import { updateProduct } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProductEditForm({ product }: { product: any }) {
    const updateProductWithId = updateProduct.bind(null, product.id_produit)
    const [state, formAction, isPending] = useActionState(updateProductWithId, null)

    return (
        <form action={formAction} className="space-y-6">
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

            <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-200">Description</Label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                    defaultValue={(() => {
                        try {
                            const parsed = JSON.parse(product.description || '{}')
                            // If it parses as JSON object with detailed fields, maybe just show empty or try to extract something?
                            // But user wants plain text. If legacy data is there, showing raw JSON might be confusing but necessary to not lose data?
                            // OR, perhaps we just show raw string if it's not a JSON object, but if it IS, we show nothing or a specific field?
                            // Actually, let's just show the raw content so they can edit it away from JSON if they want.
                            // But wait, user said "description should not be json format".
                            // If I return simple text, I wipe out the other JSON fields on save.
                            // Given the requirement "description should not be json format", maybe I should just blank it out for new/migrating products?
                            // Let's just return the raw string. If it's JSON, they'll see JSON. They can delete it and type text.
                            return product.description
                        } catch {
                            return product.description
                        }
                    })()}
                />
            </div>

            <div className="space-y-4">
                <Label className="text-gray-200">Product Images</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-xs text-gray-400">Main Image</Label>
                        {product.image && (
                            <div className="relative aspect-square w-20 rounded-md overflow-hidden bg-gray-800 border border-gray-700 mb-2">
                                <img src={product.image} alt="Main" className="object-cover w-full h-full" />
                            </div>
                        )}
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="bg-gray-800 border-gray-700 text-white cursor-pointer file:cursor-pointer file:text-white file:bg-gray-700 file:border-0 file:rounded-md file:px-2 file:mr-2 hover:file:bg-gray-600 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image2" className="text-xs text-gray-400">Image 2</Label>
                        {product.image2 && (
                            <div className="relative aspect-square w-20 rounded-md overflow-hidden bg-gray-800 border border-gray-700 mb-2">
                                <img src={product.image2} alt="Second" className="object-cover w-full h-full" />
                            </div>
                        )}
                        <Input
                            id="image2"
                            name="image2"
                            type="file"
                            accept="image/*"
                            className="bg-gray-800 border-gray-700 text-white cursor-pointer file:cursor-pointer file:text-white file:bg-gray-700 file:border-0 file:rounded-md file:px-2 file:mr-2 hover:file:bg-gray-600 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image3" className="text-xs text-gray-400">Image 3</Label>
                        {product.image3 && (
                            <div className="relative aspect-square w-20 rounded-md overflow-hidden bg-gray-800 border border-gray-700 mb-2">
                                <img src={product.image3} alt="Third" className="object-cover w-full h-full" />
                            </div>
                        )}
                        <Input
                            id="image3"
                            name="image3"
                            type="file"
                            accept="image/*"
                            className="bg-gray-800 border-gray-700 text-white cursor-pointer file:cursor-pointer file:text-white file:bg-gray-700 file:border-0 file:rounded-md file:px-2 file:mr-2 hover:file:bg-gray-600 transition-colors"
                        />
                    </div>
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
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={isPending}
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    )
}
