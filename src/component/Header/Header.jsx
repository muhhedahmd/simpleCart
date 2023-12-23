import React from 'react'
import { Link } from 'react-router-dom'


import { UseProductContext, productContext } from '../../contexts/productContext'
import { PATHS } from '../Router/Paths'
import { useAuth } from '../../contexts/Authcontext'

const Header = () => {
  const {logout} = useAuth()

  const {state ,totalCount }  =UseProductContext()

  const HandleLogOut = ()=>{
    window.localStorage.removeItem("token")
    return logout()
  }
  return (
    <header>
      <div className="logo">
        Logo
        
      </div>
      <nav>
      <ul>
        <li>
          <Link to={PATHS.home}>Home</Link>
        </li>
        <li>
          <Link to={PATHS.cart}>cart</Link>
        </li>
        <li>
          {state.count??state.count}
        </li>
        <li >
        <Link to={PATHS.Todo}>
          Todo

        </Link>
        </li>
        <li style={{padding:"2px 8px", borderRadius:"50%" , backgroundColor:"red"}}>
          {totalCount}
        </li>
        {window.localStorage.getItem("token") !== null ?  
        <li >
          <button onClick={()=>HandleLogOut()}>Log out</button>
        </li>
        : 
          ""
        
        }
     
      </ul>
      </nav>
    </header>
  )
}

export default Header
