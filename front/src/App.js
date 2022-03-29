import React from "react";
import Home from "./Application";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  )
}

export default App;
