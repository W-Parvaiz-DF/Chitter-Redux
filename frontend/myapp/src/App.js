import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home';


function App() {
  return (
    <div className="App container-fluid ">
      <div className='row'>

        {/* <Login /> */}
        <Home />
        {/* <Footer /> */}

      </div>


    </div>
  );
}

export default App;
