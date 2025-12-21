'use client'

import { updateStock, addStock, deleteStock } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useActionState } from 'react'
import { Check, Save, Trash2, Plus } from 'lucide-react'

export default function StockManager({ productId, initialStock }: { productId: number, initialStock: any[] }) {
    // Sort stock by size
    const sortedStock = [...initialStock].sort((a, b) => Number(a.taille) - Number(b.taille))

    return (
        <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Plus size={16} />
                    Add Stock Variant
                </h3>
                <AddStockForm productId={productId} />
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4 px-2 text-sm text-gray-400 font-medium">
                    <div>Size</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="text-right">Actions</div>
                </div>

                {sortedStock.map((stock) => (
                    <StockRow
                        key={stock.taille}
                        productId={productId}
                        stock={stock}
                    />
                ))}

                {sortedStock.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                        No stock added yet.
                    </div>
                )}
            </div>
        </div>
    )
}

function AddStockForm({ productId }: { productId: number }) {
    const [state, formAction, isPending] = useActionState(addStock, null)

    return (
        <form action={formAction} className="grid grid-cols-4 gap-4 items-end">
            <input type="hidden" name="product_id" value={productId} />

            <div className="space-y-1">
                <label className="text-xs text-gray-500">Size (EU)</label>
                <Input
                    name="size"
                    type="number"
                    step="0.5"
                    required
                    placeholder="42"
                    className="h-9 bg-gray-800 border-gray-700 text-white"
                />
            </div>

            <div className="col-span-2 space-y-1">
                <label className="text-xs text-gray-500">Quantity</label>
                <Input
                    name="quantity"
                    type="number"
                    min="0"
                    required
                    placeholder="10"
                    className="h-9 bg-gray-800 border-gray-700 text-white"
                />
            </div>

            <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="bg-amber-600 hover:bg-amber-700 text-white h-9 w-full"
            >
                {isPending ? 'Adding...' : 'Add'}
            </Button>

            {state?.error && (
                <p className="col-span-4 text-xs text-red-500 mt-2">{state.error}</p>
            )}
        </form>
    )
}

function StockRow({ productId, stock }: { productId: number, stock: any }) {
    const [isUpdatePending, setIsUpdatePending] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    async function handleUpdate(formData: FormData) {
        setIsUpdatePending(true)
        setShowSuccess(false)

        // Ensure size is passed for identification
        formData.append('size', stock.taille)

        const result = await updateStock(formData)

        setIsUpdatePending(false)
        if (result?.success) {
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2000)
        }
    }

    return (
        <div className="grid grid-cols-4 gap-4 items-center bg-gray-800/30 p-2 rounded-lg">
            <div className="text-white font-medium ml-2">EU {stock.taille}</div>

            <form action={handleUpdate} className="col-span-2 flex gap-2">
                <input type="hidden" name="product_id" value={productId} />
                <Input
                    type="number"
                    name="quantity"
                    defaultValue={stock.quantite}
                    min="0"
                    className="h-9 bg-gray-800 border-gray-700 text-white text-center w-20"
                />
                <Button
                    type="submit"
                    size="sm"
                    disabled={isUpdatePending}
                    className={`h-9 w-9 p-0 transition-colors ${showSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    {showSuccess ? <Check size={16} /> : <Save size={16} className="text-gray-300" />}
                </Button>
            </form>

            <div className="flex justify-end">
                <form action={async (formData) => {
                    await deleteStock(formData)
                }}>
                    <input type="hidden" name="product_id" value={productId} />
                    <input type="hidden" name="size" value={stock.taille} />
                    <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                        <Trash2 size={16} />
                    </Button>
                </form>
            </div>
        </div>
    )
}
