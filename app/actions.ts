'use server'

import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerQueue(formData: FormData) {
    const name = formData.get('name') as string
    const age = parseInt(formData.get('age') as string)
    const height = parseFloat(formData.get('height') as string)
    const color = formData.get('color') as string
    const styleRequest = formData.get('styleRequest') as string

    // Check for either file or base64 string
    const photoFile = formData.get('photo') as File
    const photoBase64 = formData.get('photoBase64') as string

    if (!name || !age || !height || (!photoFile && !photoBase64)) {
        throw new Error('Missing required fields')
    }

    // 1. Upload Photo
    let uploadBody: File | Buffer
    let fileExt: string
    let contentType: string

    if (photoBase64) {
        // Handle Base64
        // Format: data:image/jpeg;base64,/9j/4AAQSk...
        const matches = photoBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 string')
        }

        contentType = matches[1]
        const buffer = Buffer.from(matches[2], 'base64')
        uploadBody = buffer
        fileExt = 'jpg' // Assuming webcam uses jpeg or matching contentType
        if (contentType === 'image/png') fileExt = 'png'
    } else {
        // Handle File
        uploadBody = photoFile
        fileExt = photoFile.name.split('.').pop() || 'jpg'
        contentType = photoFile.type
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `entries/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, uploadBody, {
            contentType: contentType,
            upsert: true
        })

    if (uploadError) {
        console.error('Upload Error:', uploadError)
        // throw new Error('Failed to upload photo')
    }

    const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath)

    // 2. Create DB Entry
    await prisma.queueItem.create({
        data: {
            name,
            age,
            height,
            color,
            styleRequest,
            photoUrl: publicUrl,
            status: 'WAITING'
        }
    })

    revalidatePath('/dashboard')
    revalidatePath('/admin')
    redirect('/dashboard')
}
