'use client'

import { updateStock } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Check, Save } from 'lucide-react'

// Standard sizes 37-47
const SIZES = Array.from({ length: 11 }, (_, i) => 37 + i)

export default function StockManager({ productId, initialStock }: { productId: number, initialStock: any[] }) {

    const getQuantity = (size: number) => {
        const stockItem = initialStock.find((s: any) => Number(s.taille) === size)
        return stockItem ? stockItem.quantite : 0
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-2 text-sm text-gray-400 font-medium">
                <div>Size</div>
                <div>Quantity</div>
                <div className="text-right">Action</div>
            </div>

            {SIZES.map((size) => (
                <StockRow
                    key={size}
                    productId={productId}
                    size={size}
                    initialQuantity={getQuantity(size)}
                />
            ))}
        </div>
    )
}

function StockRow({ productId, size, initialQuantity }: { productId: number, size: number, initialQuantity: number }) {
    const [isPending, setIsPending] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        setShowSuccess(false)

        const result = await updateStock(formData)

        setIsPending(false)
        if (result?.success) {
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2000)
        }
    }

    return (
        <form action={handleSubmit} className="grid grid-cols-3 gap-4 items-center">
            <input type="hidden" name="product_id" value={productId} />
            <input type="hidden" name="size" value={size} />

            <div className="text-white font-medium">EU {size}</div>

            <div>
                <Input
                    type="number"
                    name="quantity"
                    defaultValue={initialQuantity}
                    min="0"
                    className="h-9 bg-gray-800 border-gray-700 text-white text-center"
                />
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    size="sm"
                    disabled={isPending}
                    className={`h-9 w-9 p-0 transition-colors ${showSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    {showSuccess ? <Check size={16} /> : <Save size={16} className="text-gray-300" />}
                </Button>
            </div>
        </form>
    )
}
