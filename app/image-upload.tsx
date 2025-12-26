'use client'

import { useRef, useState } from 'react'

export function ImageUpload() {
    const [preview, setPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                if (typeof ev.target?.result === 'string') {
                    setPreview(ev.target.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const clearImage = () => {
        setPreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="input-group">
            <div style={{
                border: preview ? 'none' : '2px dashed var(--border)',
                borderRadius: 'var(--radius)',
                padding: preview ? 0 : '1.5rem',
                textAlign: 'center',
                background: preview ? '#f8fafc' : 'var(--background)',
                cursor: 'pointer',
                position: 'relative',
                height: '300px', // Fixed height for consistency
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
            }} onClick={() => fileInputRef.current?.click()}>

                <input
                    ref={fileInputRef}
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {preview ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        {/* Blurred Background for aesthetic fill */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${preview})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(20px)',
                            opacity: 0.5,
                            transform: 'scale(1.1)'
                        }} />

                        {/* Main Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                position: 'relative',
                                zIndex: 1,
                                filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))'
                            }}
                        />

                        {/* Controls Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '1rem',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                            zIndex: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            height: '100px'
                        }}>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                className="btn"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    color: '#ef4444',
                                    border: 'none',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                Ganti Foto
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ opacity: 0.6, transition: 'opacity 0.2s', transform: 'scale(1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>
                            Klik untuk Upload Foto
                        </span>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>
                            Format JPG atau PNG (Max 10MB)
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
