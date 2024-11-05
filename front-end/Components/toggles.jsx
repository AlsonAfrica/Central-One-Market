import '../Styles/toggle.css'
const Toggles = () => {
    return ( 
    <div className="toggle-wrapper">
        <div className="text">Featured Products</div>
            <div className="toggles">
                <div className="search-bar">         
                    <div class="search-container">
                        <input type="text" placeholder="Search..." class="search-input" />
                        <button class="search-button">🔍</button>
                    </div>
                </div>
                <div className="category">
                    <button>All</button>
                    <button>Computers</button>
                    <button>Mobile</button>
                    <button>Audio</button>
                    <button>Gaming</button>
                </div>
            </div>
    </div>

    );
}
 
export default Toggles;