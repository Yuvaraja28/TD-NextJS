import './globals.css'
import Image from 'next/image'

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Fugaz+One&family=Righteous&family=Comfortaa&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className='topbar'>
          <Image className='logo'
            alt='logo'
            src="/mvit.png"
            width="45"
            height="45" />
          <a className='college-name'>Manakula Vinayagar Institute of Technology SCIMIT-23</a>
        </div>
        <div className='topbar'>
          <a className='project-name'>Thermodynamics Problem Solver</a>
        </div>
        <div className='container'>
          {children}
        </div>
        <footer>
          <div className='topbar'>
            <span>Created by <a href="https://yuvaraja28.me" className="link-glow" target="_blank" rel="noopener">Yuvaraja.M</a><br /><a href="https://mvit.edu.in/" className="link-glow" target="_blank" rel="noopener">⚡ MVIT ⚡</a> CSE-B</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
