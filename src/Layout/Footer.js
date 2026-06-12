import React from 'react';
import '../Css/Footer.css';

const Footer = () => {
  const footerData = {
    Solutions: ['Marketing', 'Analytics', 'Automation', 'Commerce', 'Insights'],
    Support: ['Submit ticket', 'Documentation', 'Guides'],
    Company: ['About', 'Blog', 'Jobs', 'Press'],
    Legal: ['Terms of service', 'Privacy policy', 'License'],
  };

  return (
    <footer id="About-section" className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6366f1"/>
              <path d="M2 17L12 22L22 17" stroke="#6366f1" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="#6366f1" strokeWidth="2"/>
            </svg>
          </div>
          <p className="footer-desc">
            Making the world a better place through constructing elegant hierarchies.
          </p>
          <div className="footer-socials">
            <a href="#">f</a> <a href="#">i</a> <a href="#">x</a> <a href="#">g</a> <a href="#">y</a>
          </div>
        </div>

        
        <div className="footer-links-grid">
          {Object.entries(footerData).map(([title, items]) => (
            <div key={title} className="footer-column">
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Your Company, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;