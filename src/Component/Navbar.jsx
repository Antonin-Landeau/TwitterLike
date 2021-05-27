import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './../Style/Navbar.css'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import {auth} from './../Firebase'

function Navbar() {
    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setconnect(!connect)
            }else {
                setconnect(connect)
            }
          });
    }, [])

    const LogOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            console.log('disconnected');
          }).catch((error) => {
            // An error happened.
          });
    } 

    const [connect,setconnect] = useState(false)
    return (
        <nav className="Navbar">
            <Link className="Navbar_logo" to='/Feed'>Feed</Link>
            {!connect ? '' : <div className="Navbar_connect menu"><Link className="Navbar_disconnect_btn" to='/SignIn'><PowerSettingsNewIcon onClick={LogOut}>LogOut</PowerSettingsNewIcon></Link></div> }
            {connect ? '' : <div className="Navbar_disconnect menu"><Link to ='/SignIn'>Sign In</Link><Link to ='/SignUp'>Sign Up</Link></div> }


        </nav>
    )
}

export default Navbar
