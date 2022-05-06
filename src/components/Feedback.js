import Footbar from "./Footbar";
import NavBar from "./NavBar";
import SearchBar from "./Search";

export default function Feedback(){
    return(
        <>
        <NavBar/>
        <SearchBar/>
        <Footbar class="footBar-bottom"/>
        </>
    )
} 
