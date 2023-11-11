import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function Header() {
    const [error, setError] = useState("");

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        setError("Failed to log out")
        console.log(error);
      }
    }

    return (
      <>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/about'>About</Link>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </>
    );
  }
  
  export default Header;