import Navbar from "../Components/navbar";
import Toggles from "../Components/toggles";
import "../Styles/styles.css"
const MainPage = () => {
    return (
    <div className="wrapper-main">
        <div>
           <Navbar/>         
        </div>
        <div>
            <Toggles/>
        </div>
    </div>
    
);
}
 
export default MainPage;