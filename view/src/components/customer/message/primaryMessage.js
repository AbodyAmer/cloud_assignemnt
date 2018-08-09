import React from 'react'
 const PrimaryMessage = (props) => 
 
<div className="alert alert-primary " role="alert">
{props.message}
<button 
onClick={e => props.closee()}
type="button" className="close"  aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>

export default PrimaryMessage