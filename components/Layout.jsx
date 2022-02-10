import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Template for</span>
              <span>contentful</span>
            </h1>
            <h2>All about CMS (and cats)</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 Samuel Le May</p>
      </footer>
    </div>
  )
}