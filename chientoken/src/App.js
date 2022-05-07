import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Redirect } from "react-dom";
import Wallet from "./Wallet.js";
import Login_UI from "./Login";
import Register_UI from "./Register/index.js";
import Profile from "./Profile/index.js";
function App() {
  

  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Wallet />} />
          <Route path="/login" element={<Login_UI />} />
          <Route path='/register' element={<Register_UI />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
