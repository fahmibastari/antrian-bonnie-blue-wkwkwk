'use client'

import { useTransition } from 'react'

export function ResetButton({ resetAction }: { resetAction: () => Promise<void> }) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            className="btn"
            style={{
                background: '#ef4444',
                color: 'white',
                fontWeight: 'bold',
                opacity: isPending ? 0.7 : 1,
                cursor: isPending ? 'not-allowed' : 'pointer'
            }}
            disabled={isPending}
            onClick={() => {
                if (confirm('BAHAYA! Yakin ingin mereset SEMUA data antrian dan mengulang dari #1?')) {
                    startTransition(async () => {
                        await resetAction()
                    })
                }
            }}
        >
            {isPending ? 'Mereset...' : 'Reset & Hapus Semua'}
        </button>
    )
}
