'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AutoRefresh() {
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh()
        }, 3600000) // Refresh every 1 hour

        return () => clearInterval(interval)
    }, [router])

    return null
}
