import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="author">
          <span>Created by <a href="https://mybio.msc-bot.tech" className="link-glow" target="_blank" rel="noopener">Yuvaraja.M</a> CSE-B <a href="https://mvit.edu.in/" className="link-glow" target="_blank" rel="noopener">MVIT</a></span>
        </footer>
      </body>
    </html>
  )
}
