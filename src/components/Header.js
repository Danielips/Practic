import React from 'react';

const Header = () => {
  return (
    <header className="bg-tiffany text-white py-4">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-6 col-md-4 text-center">
            <div className="circle">
              <h1 className="circle-text">Le Chat</h1>
              <div className="wave"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
