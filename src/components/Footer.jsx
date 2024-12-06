import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>E-Store</h3>
        <p>La mejor tienda online de tecnología</p>
        <div className="social-links">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
      <div className="footer-links">
        <a href="#">Acerca de</a>
        <a href="#">Soporte</a>
        <a href="#">Políticas</a>
        <a href="#">Contacto</a>
      </div>
      <div className="footer-bottom">
        <p>© 2024 E-Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
