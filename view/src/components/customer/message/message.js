import React from 'react'
 const ErrorMessage = (props) => 
 
<div className="alert alert-danger " role="alert">
{props.message}
<button 
onClick={e => props.close()}
type="button" className="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>

export default ErrorMessage