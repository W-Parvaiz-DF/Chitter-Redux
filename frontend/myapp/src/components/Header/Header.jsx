
import logo from '../../images/chitterlogo.jpg';
import './Header.css'
//import { Link } from 'react-router-dom'

const Header = ({ currentUser, logOut }) => {


    return (
        // <header className="page-header bg-dark text-white">
        <nav className="navbar navbar-expand navbar-dark bg-dark">

            {currentUser &&
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <p>{currentUser.username}</p>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link" onClick={logOut}>Log Out</a>
                    </li>
                </div>


            }
        </nav>



        //</header>
    )
}

export default Header