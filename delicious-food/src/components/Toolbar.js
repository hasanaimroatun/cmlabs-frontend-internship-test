import React from 'react'

function Toolbar({homeContentContainer, fdContentContainer, iContentContainer, unhide}) {
  return (
    <div>
        <div className="container my-4">
            <nav className="navbar navbar-expand-lg bg-light custom-nav bg-transparent">
                <div className="container-fluid">
                <a className="navbar-brand" href="#home" onClick={() => {unhide(homeContentContainer); unhide(fdContentContainer); unhide(iContentContainer)}}>
                    <span>mealapp</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#home" onClick={() => {unhide(homeContentContainer); unhide(fdContentContainer); unhide(iContentContainer)}}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#foods" onClick={() => {unhide(homeContentContainer); unhide(fdContentContainer); unhide(iContentContainer)}}>Foods</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#ingredients" onClick={() => {unhide(homeContentContainer); unhide(fdContentContainer); unhide(iContentContainer)}}>Ingredients</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#localCulinary" onClick={() => {unhide(homeContentContainer); unhide(fdContentContainer); unhide(iContentContainer)}}>Local Culinary</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Toolbar