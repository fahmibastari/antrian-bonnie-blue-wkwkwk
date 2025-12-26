import { prisma } from '@/lib/prisma'
import { updateStatus, deleteItem, resetQueue } from './actions'
import { ResetButton } from './reset-button'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const queue = await prisma.queueItem.findMany({
        orderBy: { createdAt: 'asc' }
    })

    const waiting = queue.filter((item: any) => item.status === 'WAITING')
    const processing = queue.filter((item: any) => item.status === 'PROCESSING')
    const completed = queue.filter((item: any) => item.status === 'COMPLETED')

    // Helper to render a card
    const QueueCard = ({ item }: { item: any }) => (
        <div key={item.id} className="card" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            borderLeft: item.status === 'PROCESSING' ? '5px solid var(--primary)' : '5px solid transparent',
            marginBottom: '1rem',
            transition: 'border-color 0.3s'
        }}>
            {/* Photo */}
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0, border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.photoUrl || 'https://via.placeholder.com/60'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '0.3rem',
                        fontSize: '0.8rem',
                        fontWeight: 800
                    }}>
                        #{item.id}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)' }}>
                        {item.name}
                    </h3>
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ fontWeight: 600 }}>Umur:</span> {item.age} Th
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ fontWeight: 600 }}>Tinggi:</span> {item.height}cm
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ fontWeight: 600 }}>Warna:</span> {item.color}
                    </span>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#334155', fontStyle: 'italic' }}>
                    "{item.styleRequest}"
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '100px' }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: item.status === 'PROCESSING' ? '#2563eb' : item.status === 'COMPLETED' ? '#059669' : '#64748b',
                    marginBottom: '0.25rem'
                }}>
                    {item.status}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {item.status === 'WAITING' && (
                        <form action={updateStatus.bind(null, item.id, 'PROCESSING')}>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Panggil</button>
                        </form>
                    )}
                    {item.status === 'PROCESSING' && (
                        <form action={updateStatus.bind(null, item.id, 'COMPLETED')}>
                            <button className="btn" style={{ background: '#10b981', color: 'white', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Selesai</button>
                        </form>
                    )}
                    <form action={deleteItem.bind(null, item.id)}>
                        <button className="btn" style={{
                            background: 'white',
                            color: '#ef4444',
                            border: '1px solid #ef4444',
                            padding: '0.5rem',
                            fontSize: '0.9rem'
                        }} title="Hapus">
                            Hapus
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '900px', paddingTop: '2rem' }}>

                {/* Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>Admin Dashboard</h1>
                        <p style={{ color: '#64748b', margin: 0 }}>Kelola antrian dengan mudah</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <a href="/dashboard" className="btn" style={{ background: '#f1f5f9', color: '#475569' }}>
                            Lihat Layar
                        </a>
                        <ResetButton resetAction={resetQueue} />
                    </div>
                </header>

                {/* Queue Lists */}
                <div style={{ display: 'grid', gap: '2rem' }}>

                    {/* Active Queue Section */}
                    {processing.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Sedang Dilayani
                            </h2>
                            {processing.map((item: any) => <QueueCard key={item.id} item={item} />)}
                        </section>
                    )}

                    {/* Waiting Section */}
                    <section>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#475569', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Menunggu ({waiting.length})
                        </h2>
                        {waiting.length === 0 ? (
                            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', borderStyle: 'dashed' }}>
                                Belum ada antrian.
                            </div>
                        ) : (
                            waiting.map((item: any) => <QueueCard key={item.id} item={item} />)
                        )}
                    </section>

                    {/* Completed Section (Optional, maybe collapsible or just show last few?) */}
                    {completed.length > 0 && (
                        <section style={{ opacity: 0.7 }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669', marginBottom: '1rem', marginTop: '1rem' }}>
                                Selesai
                            </h2>
                            {completed.map((item: any) => <QueueCard key={item.id} item={item} />)}
                        </section>
                    )}

                </div>
            </div>
        </div>
    )
}
