import React, { useEffect, useRef } from 'react'

const Alert = (props) => {
    // const {type, msg, tag} = props
    // const closeRef = useRef(null)
    // useEffect(() => {
    //     setTimeout(() => {
    //         closeRef.current.click()            
    //     }, 5000);
      
    // }, [props])
    
  return (
    <>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}  role="alert">
            <strong>{props.alert.tag}! </strong> {props.alert.msg}
            <button type="button"  className="close d-none" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>}
    </>
  )
}

export default Alert