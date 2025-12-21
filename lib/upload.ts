import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImage(file: File | null): Promise<string | null> {
    if (!file || !(file instanceof File) || file.size === 0) {
        return null
    }

    try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const ext = path.extname(file.name) || '.jpg'
        const filename = `${uuidv4()}${ext}`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true })

        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)

        console.log(`[Upload] Successfully saved: ${filename}`)
        return `/uploads/${filename}`
    } catch (error) {
        console.error('[Upload Error]', error)
        throw error // Re-throw to be caught by the action
    }
}
