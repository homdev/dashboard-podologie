import { NextRequest, NextResponse } from 'next/server'
import formidable from 'formidable'
import path from 'path'
import { Readable } from 'stream'
import { IncomingMessage } from 'http'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const uploadDir = path.join(process.cwd(), 'public', 'upload')

export async function POST(req: NextRequest): Promise<NextResponse> {
  const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true })

  return new Promise<NextResponse>((resolve) => {
    const chunks: Buffer[] = []
    req.body?.pipeTo(new WritableStream({
      write(chunk) {
        chunks.push(Buffer.from(chunk))
      },
      close() {
        const buffer = Buffer.concat(chunks)
        const stream = Readable.from(buffer)
        const fakeReq = Object.assign(stream, {
          headers: req.headers,
          method: req.method,
          url: req.url,
        }) as unknown as IncomingMessage

        form.parse(fakeReq, (err, _fields, files) => {
          if (err) {
            resolve(NextResponse.json({ error: 'Erreur lors de l\'upload du fichier.' }, { status: 500 }))
            return
          }
          const file = Array.isArray(files.file) ? files.file[0] : files.file
          if (!file) {
            resolve(NextResponse.json({ error: 'Aucun fichier n\'a été uploadé.' }, { status: 400 }))
            return
          }
          const relativePath = `/upload/${file.newFilename}`
          
          resolve(NextResponse.json({ message: 'Fichier uploadé avec succès', filePath: relativePath }))
        })
      }
    }))
  })
}