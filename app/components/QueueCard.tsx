'use client'

import { useState } from 'react'

export type QueueItem = {
    id: number
    name: string
    age: number
    height: number
    color: string
    styleRequest: string
    photoUrl: string | null
    status: string
    createdAt: Date
}

export function QueueCard({ item, index, children }: { item: QueueItem, index?: number, children?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    // Use ID directly as requested by user
    const displayId = item.id

    return (
        <>
            <div
                className="card queue-layout"
                onClick={() => setIsOpen(true)}
                style={{
                    padding: '1.25rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    height: '100%',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    position: 'relative'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', background: '#f1f5f9', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.photoUrl || 'https://via.placeholder.com/60'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                            #{displayId}
                        </div>
                        {item.status === 'COMPLETED' && (
                            <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: 700 }}>
                                SELESAI
                            </span>
                        )}
                        {item.status === 'PROCESSING' && (
                            <span style={{ fontSize: '0.7rem', background: '#dbeafe', color: '#1e40af', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: 700 }}>
                                DIPROSES
                            </span>
                        )}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{item.name}</div>

                    <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Umur:</span> <strong>{item.age} Th</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Panjang:</span> <strong>{item.height} cm</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Warna:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span style={{ width: '10px', height: '10px', background: item.color, borderRadius: '50%', border: '1px solid #ddd' }}></span>
                                <strong>{item.color}</strong>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.1rem' }}>Request Gaya:</span>
                            <strong style={{ display: 'block', lineHeight: 1.2, color: '#334155' }}>"{item.styleRequest}"</strong>
                        </div>
                    </div>
                </div>
                {/* Prevent click propagation for action buttons if any */}
                {children && (
                    <div className="queue-actions" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                )}
            </div>

            {/* MODAL */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setIsOpen(false)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'white',
                            borderRadius: '1.5rem',
                            width: '100%',
                            maxWidth: '500px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            animation: 'scaleIn 0.2s ease-out'
                        }}
                    >
                        {/* Image Section */}
                        <div style={{ width: '100%', height: '300px', position: 'relative', background: '#000' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.photoUrl || 'https://via.placeholder.com/400'}
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Details Section */}
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{item.name}</h2>
                                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>#{displayId}</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Umur</label>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.age} Tahun</div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Panjang</label>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.height} cm</div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Warna</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ width: '20px', height: '20px', background: item.color, borderRadius: '50%', border: '1px solid #ddd' }}></span>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.color}</div>
                                    </div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Request Gaya</label>
                                    <div style={{ fontSize: '1.1rem', background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.25rem', border: '1px solid #e2e8f0' }}>
                                        "{item.styleRequest}"
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style jsx global>{`
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </>
    )
}
