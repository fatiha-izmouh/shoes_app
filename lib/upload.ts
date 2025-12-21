import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function uploadImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${uuidv4()}${path.extname(file.name)}`

    // Ensure public/uploads exists (create if not, though we just ran mkdir)
    // For simplicity/robustness we assume public/uploads exists from setup step

    await writeFile(path.join(process.cwd(), 'public/uploads', filename), buffer)

    return `/uploads/${filename}`
}
