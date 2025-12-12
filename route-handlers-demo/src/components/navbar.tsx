import NavLinks from "./nav-links";
import NavSearch from "./nav-search";

export default function Navbar(){
    console.log("Navbar rendered");
    return (
        <div>
            <NavLinks />
            <NavSearch />
        </div>
    );
}