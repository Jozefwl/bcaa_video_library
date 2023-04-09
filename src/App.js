
import "./App.css";
import VideoList from "./bricks/VideoList";
import NavbarMenu from "./bricks/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    
    <div className="App">
      <NavbarMenu />
      <VideoList />
      
    </div>
  );
}

export default App;