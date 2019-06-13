import React from 'react'
import './Footer.css'

const Footer = React.memo(props => (
    <div className="footer-wrapper">
      <p>
          {props.description}
      </p>
    </div>
));

export default Footer
