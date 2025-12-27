import { prisma } from '@/lib/prisma'
import { updateStatus, deleteItem, resetQueue } from './actions'
import { ResetButton } from './reset-button'
import { QueueCard } from '@/app/components/QueueCard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const queue = await prisma.queueItem.findMany({
        orderBy: { createdAt: 'asc' }
    })

    const waiting = queue.filter((item: any) => item.status === 'WAITING')
    const processing = queue.filter((item: any) => item.status === 'PROCESSING')
    const completed = queue.filter((item: any) => item.status === 'COMPLETED')



    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '900px', paddingTop: '2rem' }}>

                {/* Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem',
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>Admin Dashboard</h1>
                        <p style={{ color: '#64748b', margin: 0 }}>Kelola antrian dengan mudah</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {processing.map((item: any) => (
                                    <QueueCard key={item.id} item={item}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                            <form action={updateStatus.bind(null, item.id, 'COMPLETED')}>
                                                <button className="btn" style={{ background: '#10b981', color: 'white', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Selesai</button>
                                            </form>
                                            <form action={deleteItem.bind(null, item.id)}>
                                                <button className="btn" style={{ background: 'white', color: '#ef4444', border: '1px solid #ef4444', padding: '0.5rem', fontSize: '0.9rem' }} title="Hapus">Hapus</button>
                                            </form>
                                        </div>
                                    </QueueCard>
                                ))}
                            </div>
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {waiting.map((item: any) => (
                                    <QueueCard key={item.id} item={item}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                            <form action={updateStatus.bind(null, item.id, 'PROCESSING')}>
                                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Panggil</button>
                                            </form>
                                            <form action={deleteItem.bind(null, item.id)}>
                                                <button className="btn" style={{ background: 'white', color: '#ef4444', border: '1px solid #ef4444', padding: '0.5rem', fontSize: '0.9rem' }} title="Hapus">Hapus</button>
                                            </form>
                                        </div>
                                    </QueueCard>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Completed Section */}
                    {completed.length > 0 && (
                        <section style={{ opacity: 0.7 }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669', marginBottom: '1rem', marginTop: '1rem' }}>
                                Selesai
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {completed.map((item: any) => (
                                    <QueueCard key={item.id} item={item}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                            <form action={deleteItem.bind(null, item.id)}>
                                                <button className="btn" style={{ background: 'white', color: '#ef4444', border: '1px solid #ef4444', padding: '0.5rem', fontSize: '0.9rem' }} title="Hapus">Hapus</button>
                                            </form>
                                        </div>
                                    </QueueCard>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    )
}
