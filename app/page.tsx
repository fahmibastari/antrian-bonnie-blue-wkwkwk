import { registerQueue } from './actions'
import { ImageUpload } from './image-upload'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '1000px',
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>

        {/* Poster Section */}
        <div style={{
          flex: '1 1 400px',
          background: '#f1f5f9',
          position: 'relative',
          minHeight: '300px'
        }}>
          {/* Using standard img tag for simplicity if Next Image requires config, but Image is better. 
               Assuming poster.png is in public/poster.png 
           */}
          <img
            src="/poster.png"
            alt="Welcome to Boni Blue Queue"
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
            padding: '2rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Bonnie Blue</h2>
            <p style={{ opacity: 0.9 }}>Ahli Serpis Propesional</p>
          </div>
        </div>

        {/* Form Section */}
        <div style={{ flex: '1 1 400px', padding: '2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Mau Ngantri?
            </h1>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Daftar dulu dong.
            </p>
          </div>

          <form action={registerQueue}>
            <div className="input-group">
              <label className="label" htmlFor="name">Namanya Siapa?</label>
              <input id="name" name="name" type="text" className="input" placeholder="Masukin nama beneran..." required />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="input-group">
                <label className="label" htmlFor="age">Umurnya Berapa?</label>
                <input id="age" name="age" type="number" className="input" placeholder="Contoh: 78" required />
              </div>
              <div className="input-group">
                <label className="label" htmlFor="height">Panjangnya Berapa? (cm)</label>
                <input id="height" name="height" type="number" step="0.01" className="input" placeholder="Contoh: 15" required />
              </div>
            </div>

            <div className="input-group">
              <label className="label" htmlFor="color">Warnanya Apa?</label>
              <input id="color" name="color" type="text" className="input" placeholder="Contoh: Coklat Ber Urat" required />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="styleRequest">Mau request gaya apa?</label>
              <textarea id="styleRequest" name="styleRequest" className="input" rows={2} placeholder="Pengen Bonnie Blue Gaya Apa..." required></textarea>
            </div>

            <div className="input-group">
              <label className="label" htmlFor="photo">Foto Selfie / Gaya</label>
              <ImageUpload />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <a href="/dashboard" className="btn" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                Batal
              </a>
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }}>
                Ngantri Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
