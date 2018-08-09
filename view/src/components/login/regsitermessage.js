import React from 'react'
 const RegisterMessage = (props) => 
 
<div className="alert alert-primary " role="alert">
<strong>{props.strong}</strong> {props.message}
<button 
onClick={e => props.closeR()}
type="button" className="close"  aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>

export default RegisterMessage