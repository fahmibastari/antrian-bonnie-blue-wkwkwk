'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '1rem', opacity: pending ? 0.7 : 1 }}
            disabled={pending}
        >
            {pending ? 'Mendaftar...' : 'Ambil Antrian'}
        </button>
    )
}
