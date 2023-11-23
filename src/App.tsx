import { useState } from "react";
import { Outlet } from "react-router-dom";
import { userCyril } from "./models/auth";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [users, setUsers] = useState([userCyril]);
  const [isConnected, setIsConnected] = useState(true);

  return (
    <AuthContext.Provider
      value={{ users, setUsers, isConnected, setIsConnected }}
    >
      <div style={{ height: "100vh", width: "100vw" }}>
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
