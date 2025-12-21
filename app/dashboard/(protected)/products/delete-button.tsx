'use client'

import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export function DeleteProductButton({ productId, productName, deleteAction }: { productId: number, productName: string, deleteAction: (formData: FormData) => void }) {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            setIsDeleting(true)
            const formData = new FormData()
            formData.append('id', productId.toString())
            await deleteAction(formData)
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
            title="Delete product"
        >
            <Trash2 size={18} />
        </button>
    )
}
