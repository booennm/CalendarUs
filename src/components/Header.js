import { Link } from "react-router-dom";

function Header() {
    return (
      <>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/about'>About</Link>
      </>
    );
  }
  
  export default Header;