'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateStatus(id: number, status: 'WAITING' | 'PROCESSING' | 'COMPLETED') {
    // If setting to PROCESSING, ensure no other item is processing? 
    // Or just let admin handle it. 
    // Optionally: Set current processing to COMPLETED if any.

    if (status === 'PROCESSING') {
        // Optional logic: Auto-complete previous processing items
        // await prisma.queueItem.updateMany({
        //   where: { status: 'PROCESSING' },
        //   data: { status: 'COMPLETED' }
        // })
    }

    await prisma.queueItem.update({
        where: { id },
        data: { status }
    })

    revalidatePath('/dashboard')
    revalidatePath('/admin')
}

export async function deleteItem(id: number) {
    await prisma.queueItem.delete({
        where: { id }
    })

    revalidatePath('/dashboard')
    revalidatePath('/admin')
}

export async function resetQueue() {
    try {
        // Truncate table and restart identity to 1
        await prisma.$executeRawUnsafe('TRUNCATE TABLE "QueueItem" RESTART IDENTITY CASCADE;')
    } catch (error) {
        console.error("Reset Error:", error)
        try {
            // Fallback: Delete all if truncate fails (e.g. permissions)
            await prisma.queueItem.deleteMany({})
        } catch (e) {
            console.error("DeleteAll Error:", e)
        }
    }

    revalidatePath('/dashboard')
    revalidatePath('/admin')
    revalidatePath('/')
}
