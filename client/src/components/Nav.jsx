import React from 'react'
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/">Cloud-Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="">
                <label htmlFor="sort" className='nav-link'>Sort</label>
          </li>          
            <li>
          <select id='sort' className='nav-link text-dark'>
                   
                        <option className="text-dark">Date added &uarr;</option>
                        <option className="text-dark">Date added &darr;</option>
                        <option className="text-dark">Date updated &uarr;</option>
                        <option className="text-dark">Date updated &darr;</option>
                    </select>
                  
                </li>
              <li className="nav-item ml-5">
                <Link className= "nav-link"  aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 d-flex">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            
          </div>
        </div>

        </nav>

        </>
    )
}

export default Nav