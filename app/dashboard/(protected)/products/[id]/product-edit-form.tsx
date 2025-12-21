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
                <Label htmlFor="description" className="text-gray-200">JSON Description</Label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
                    defaultValue={product.description}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-gray-200">Images (URLs)</Label>
                <Input
                    name="image"
                    defaultValue={product.image || ''}
                    placeholder="Main Image URL"
                    className="bg-gray-800 border-gray-700 text-white mb-2"
                />
                <Input
                    name="image2"
                    defaultValue={product.image2 || ''}
                    placeholder="Second Image URL"
                    className="bg-gray-800 border-gray-700 text-white mb-2"
                />
                <Input
                    name="image3"
                    defaultValue={product.image3 || ''}
                    placeholder="Third Image URL"
                    className="bg-gray-800 border-gray-700 text-white"
                />
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
