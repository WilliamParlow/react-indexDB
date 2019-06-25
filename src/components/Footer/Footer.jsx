import React from 'react'
import './Footer.css'

const Footer = React.memo(props => (
  <div>
    <div className="footer-content-margin"></div>
    <div className="footer-wrapper">
      <p>
        {props.description}
      </p>
    </div>
  </div>
));

export default Footer
