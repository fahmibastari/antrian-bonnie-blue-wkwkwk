import { prisma } from '@/lib/prisma'
import { AutoRefresh } from './auto-refresh'
import { QueueCard } from '@/app/components/QueueCard'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const queue = await prisma.queueItem.findMany({
        where: {
            status: {
                in: ['WAITING', 'PROCESSING', 'COMPLETED']
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const current = queue.find((item: any) => item.status === 'PROCESSING')
    const waiting = queue.filter((item: any) => item.status === 'WAITING')
    // Get last 6 completed items, reversed to show newest first
    const completed = queue
        .filter((item: any) => item.status === 'COMPLETED')
        .reverse()
        .slice(0, 6)

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #ffffff)', padding: '2rem 1rem' }}>
            <AutoRefresh />
            <div className="container" style={{ maxWidth: '1000px' }}>

                {/* POSTER HEADER */}
                <div className="card" style={{
                    padding: 0,
                    overflow: 'hidden',
                    marginBottom: '2rem',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    height: '300px',
                    position: 'relative'
                }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/poster.png"
                        alt="Promo Poster"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem 2rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        color: 'white'
                    }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Bonnie Blue</h2>
                    </div>
                </div>

                {/* HEADER & CONTROLS */}
                <header style={{
                    marginBottom: '2rem',
                    paddingBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-1px', lineHeight: 1.2 }}>
                            Status Antrian
                        </h1>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem' }}>Harus Ngantri Loh Ya</p>
                    </div>
                    <a href="/" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                        + Aku Mau Ngantri
                    </a>
                </header>

                <div style={{ display: 'grid', gap: '3rem' }}>
                    {/* NOW SERVING - Main Focus */}
                    <section>
                        {current ? (
                            <div className="card" style={{
                                background: 'white',
                                border: '1px solid var(--primary)',
                                boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '2rem',
                                borderRadius: '1.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '0.5rem 2rem',
                                    fontWeight: 700,
                                    borderBottomRightRadius: '1rem',
                                    fontSize: '1.2rem'
                                }}>
                                    SEDANG DILAYANI
                                </div>

                                <div style={{ flex: '0 0 150px', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        border: '6px solid white',
                                        boxShadow: '0 0 0 4px var(--primary)',
                                        overflow: 'hidden'
                                    }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={current.photoUrl || 'https://via.placeholder.com/200'}
                                            alt={current.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ flex: 1, minWidth: '200px', marginTop: '1rem' }}>
                                    <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 0.9, marginBottom: '0.5rem' }}>
                                        #{current.id}
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
                                        {current.name}
                                    </h2>

                                    {/* Detailed Info Grid */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                        gap: '1rem',
                                        background: '#f8fafc',
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Umur</span>
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{current.age} Tahun</span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Panjang (cm)</span>
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{current.height} cm</span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Warna</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ width: '16px', height: '16px', background: current.color, borderRadius: '50%', border: '1px solid #ddd' }}></span>
                                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{current.color}</span>
                                            </div>
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Request Gaya</span>
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{current.styleRequest}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card" style={{ padding: '4rem', textAlign: 'center', background: '#f8fafc', borderStyle: 'dashed' }}>
                                <h2 style={{ fontSize: '1.5rem', color: '#94a3b8' }}>Menunggu pelanggan berikutnya...</h2>
                            </div>
                        )}
                    </section>

                    {/* WAITING LIST */}
                    <section>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            color: '#64748b',
                            letterSpacing: '1px'
                        }}>
                            Daftar Tunggu ({waiting.length})
                        </h3>

                        {waiting.length === 0 ? (
                            <p style={{ color: '#94a3b8' }}>Antrian kosong.</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                {waiting.map((item: any, i: number) => (
                                    <QueueCard key={item.id} item={item} index={i} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* HISTORY LIST */}
                    {completed.length > 0 && (
                        <section>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                color: '#10b981',
                                letterSpacing: '1px',
                                marginTop: '2rem'
                            }}>
                                Riwayat Layanan Terakhir
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                {completed.map((item: any) => (
                                    <QueueCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
