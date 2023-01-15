import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth-reducer";

const Navbar = ({ isAuth, accessGroup, logout }) => {
  return <div className="sidebar">
    {isAuth &&
      <div className="navbarLink">
        <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'activeLink' : ''}>
          Dashboard
        </NavLink>
      </div>
    }
    {isAuth &&
      <div className="navbarLink">
        <NavLink to='/profile' className={({ isActive }) => isActive ? 'activeLink' : ''}>
          Profile
        </NavLink>
      </div>
    }
    {isAuth && accessGroup === 1 &&
      <div className="navbarLink">
        <NavLink to='/log' className={({ isActive }) => isActive ? 'activeLink' : ''}>
          Log
        </NavLink>
      </div>
    }
    {isAuth && accessGroup === 1 &&
      <div className="navbarLink">
        <NavLink to='/newMember' className={({ isActive }) => isActive ? 'activeLink' : ''}>
          New User
        </NavLink>
      </div>
    }
    <div className="navbarLink">
      {isAuth
        ? <div className='' onClick={logout}>Logout</div>
        : <NavLink to='/login' className=''>Login</NavLink>
      }
    </div>
  </div>
}

let mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, accessGroup: state.auth.accessGroup })

export default connect(mapStateToProps, { logout })(Navbar)