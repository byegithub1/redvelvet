'use client'

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <hr />
      <h2>
        &copy; {new Date().getFullYear()}&nbsp;
        <a href="mailto:re@redvelvet.me">redvelvet.me</a>
      </h2>
    </div>
  )
}

export default Footer
