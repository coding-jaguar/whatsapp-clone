import { Route, Routes } from "react-router-dom";
import Main from "./pages/chat/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div className="bg-[url(./assets/img3.png)] bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-30 backdrop-blur-md w-10/12 h-5/6 flex items-center justify-center rounded-3xl border border-white border-opacity-20 shadow-lg">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
