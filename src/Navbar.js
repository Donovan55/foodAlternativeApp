import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className = "navbar">
            <h1>The Food App</h1>
                <div className = "links">
                    <Link to="/">Home</Link>
                    <Link to="/create">Find Food Alternatives</Link>
                    <Link to="/searchResults">Results</Link>
                </div>
        </nav>
     );
}
 
export default Navbar;