
//import logo from '../../images/chitterlogo.jpg';
//import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({ currentUser, logOut }) => {

    console.log(`currentUser.username = ${currentUser.username}, Header.jsx line 8`)

    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark">

            {currentUser &&
                <div className="navbar-nav ml-auto">
                    <li className="nav-item text-white">
                        <p>{currentUser.username}</p>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={logOut} to="/">Log Out</Link>
                        {/* <a href="/" className="nav-link" onClick={logOut}>Log Out</a> */}
                    </li>
                </div>
            }

        </nav>



        //</header>
    )
}

export default Header