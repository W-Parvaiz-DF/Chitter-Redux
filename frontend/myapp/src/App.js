import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home';
import PostedModal from './components/PostedModal';


function App() {
  return (
    <div className="App container-fluid ">
      <div className='row'>

        {/* <Login /> */}
        <Home />
        {/* <Footer /> */}

        {/* <PostedModal message="Hello" handleClose={() => console.log("fhhfdkjhfd")} /> */}


      </div>


    </div>
  );
}

export default App;
