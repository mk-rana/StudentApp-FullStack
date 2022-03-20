import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLogin, setIsLogin }) => {
  return (
    <>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/login'>
    
          </Link>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'></ul>
            {isLogin ? (
              <Link
                className='btn btn-danger'
                to='/login'
                onClick={() => {
                  setIsLogin(false);
                }}
              >
                Logout
              </Link>
            ) : (
              <Link className='btn btn-primary' to='/login'>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;