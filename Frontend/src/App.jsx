import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/analytics";
import AddTrade from "./pages/addtrade";
import Login from "./components/loginpage";
function App(){
  const stats = [
  {
    title: "Total Trades",
    value: 124
  },
  {
    title: "Win Rate",
    value: "67%"
  },
  {
    title: "Profit",
    value: "+$4200"
  },
  {
    title: "Profit Factor",
    value: "1.8"
  }
];
  return(
    <Routes>
      <Route
      path="/"
      element={<LandingPage />}
      />
      <Route
      path="/dashboard"
      element={<Dashboard />}
      />

      <Route
      path="/addtrade"
      element={<AddTrade />}
      />

      <Route
      path="/analytics"
      element={<Analytics />}
      />
      <Route
     path="/loginpage"
     element={<Login />}
/>

    
    
    
    
    
    </Routes>
  )
}
export default App;