import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { headers } from "next/headers"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params

        // Define where images are stored (project_root/uploads)
        // This is persistent and outside the .next build folder
        const uploadsDir = path.join(process.cwd(), "uploads")
        const filePath = path.join(uploadsDir, filename)

        // Security check: prevent directory traversal
        if (!filePath.startsWith(uploadsDir)) {
            return new NextResponse("Access denied", { status: 403 })
        }

        if (!fs.existsSync(filePath)) {
            return new NextResponse("Image not found", { status: 404 })
        }

        // Determine content type
        const ext = path.extname(filename).toLowerCase()
        let contentType = "application/octet-stream"

        if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg"
        else if (ext === ".png") contentType = "image/png"
        else if (ext === ".gif") contentType = "image/gif"
        else if (ext === ".webp") contentType = "image/webp"
        else if (ext === ".svg") contentType = "image/svg+xml"

        // Read file
        const fileBuffer = fs.readFileSync(filePath)

        // Return the image
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        })
    } catch (error) {
        console.error("Error serving image:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
