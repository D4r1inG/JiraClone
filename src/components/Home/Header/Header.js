import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <NavLink className="navbar-brand" to="#">Navbar</NavLink>
    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/about">Link</NavLink>
        </li>
        <li className="nav-item dropdown">

          <NavLink className="nav-link" to="/contact">Contact</NavLink>

        </li> */}
        {!localStorage.getItem('access_token') ?
          <div className='d-flex'>
            <li className="nav-item dropdown">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link" to="/signup">Sign up</NavLink>
            </li>
          </div>
          :
          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/projectManagement">Jira project</NavLink>
          </li>
        }
        {/* <li className="nav-item dropdown">
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link" to="/demoHOCModal">HOC modal</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link" to="/dragDrop">Demo drag drop</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">To do líst</a>
          <div className="dropdown-menu">
            <NavLink className="nav-link dropdown-item" to="/toDoListRCC">toDoListRCC</NavLink>
            <NavLink className="nav-link dropdown-item" to="/toDoListRFC">toDoListRFC</NavLink>
            <NavLink className="nav-link dropdown-item" to="/toDoListRedux">toDoListRedux</NavLink>
            <NavLink className="nav-link dropdown-item" to="/toDoListSaga">toDoListSaga</NavLink>
            <NavLink className="nav-link dropdown-item" to="/dragDropDnd">Drag and Drop DnD</NavLink>
          </div>
        </li> */}

      </ul>

      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>

}

