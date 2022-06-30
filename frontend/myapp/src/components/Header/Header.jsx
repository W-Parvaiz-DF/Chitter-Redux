
import logo from '../../images/chitterlogo.jpg';
import './Header.css'

const Header = () => {
    return (
        <header className="page-header bg-dark text-white">
            <img className='logo' alt="Logo for Chitter" src={logo}></img>

        </header>
    )
}

export default Header