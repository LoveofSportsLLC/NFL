import React from "react";
import "./inc/css/style.css";
import "./inc/css/theme.css";
const Menu = () => (
    <div>
        <section className="navMenu">

            <section className="menuWrapper">
                <nav className="leftMenu">
                    <ul>
                        <li className="sap"><h6>Pages</h6></li>
                        <li>
                            <a href="" className="dashboardMenu">
                                <i className="dashboardIcon"></i>
                                <span>Dashboard</span><label>Customize</label>
                            </a>
                        </li>

                        <ul className="submenu">
                            <li>
                                <a href="">
                                    <i className="presetNFL"></i>
                                    <span>Preset NFL</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="presetMLB"></i>
                                    <span>Preset MLB</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="liveGames"></i>
                                    <span>Live Games</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="myTeams"></i>
                                    <span>My Teams</span>
                                </a>
                            </li>
                        </ul>
                        <li>
                            <a href="">
                                <i className="myProfile"></i>
                                <span>Pages</span>
                            </a>
                        </li>

                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>My Profile</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>Settings</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>Analytics</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>Fantasy Draft</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>Predictions</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>About Us</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>Support</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="rightArrow"></i>
                                    <span>Blank Page</span>
                                </a>
                            </li>
                        </ul>

                        <li>
                            <a href="">
                                <i className="auth"></i>
                                <span>Auth</span>
                            </a>
                        </li>

                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a href="">
                                    <i className="iconClass"></i>
                                    <span>Sign In</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="iconClass"></i>
                                    <span>Sign Up</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="iconClass"></i>
                                    <span>Reset Password</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="iconClass"></i>
                                    <span>404 Error</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="iconClass"></i>
                                    <span>500</span>
                                </a>
                            </li>
                        </ul>
                        <li>
                            <a href="">
                                <i className="documentation"></i>
                                <span>Documentation</span>
                            </a>
                        </li>

                        <li className="sap"><h6>Tools & Components</h6></li>

                        <li>
                            <a href="">
                                <i className="mostUsedComponets"></i>
                                <span>Most Used Components</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a href="">
                                    <i className="myProfileIcon"></i>
                                    <span>Alerts</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Buttons</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Cards</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Carousel</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Embed Video</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>General</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Modal</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Offcanvas</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Tabs</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Typography</span>
                                </a>
                            </li>
                        </ul>
                        <li>
                            <a href="">
                                <i className="favoriteComponents"></i>
                                <span>Favourite Components</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Feather</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Font Awesome</span>
                                </a>
                            </li>

                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Favourite Components</span>
                                </a>
                            </li>

                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Layouts</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Basic Inputs</span>
                                </a>
                            </li>
                        </ul>

                        <li>
                            <a>
                                <i className="form"></i>
                                <span>Forms</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a>
                                    <i className=""></i>
                                    <span>Layout</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className=""></i>
                                    <span>Basic Inputs</span>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className=""></i>
                                    <span>Input Group</span>
                                </a>
                            </li>
                        </ul>

                        <li>
                            <a href="">
                                <i className="tables"></i>
                                <span>Tables</span>
                            </a>
                        </li>

                        <li className="sap"><h6>Plugins & Addons</h6></li>
                        <li>
                            <a href="">
                                <i className="formPlugins"></i>
                                <span>Form Plugins</span>
                            </a>
                        </li>

                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a>
                                    <i className="advancedInput"></i>
                                    <span>Advanced Inputs</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className=""></i>
                                    <span>Formik<a href="">New</a></span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className=""></i>
                                    <span>Editors</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className=""></i>
                                    <span>Editors</span>
                                </a>
                            </li>
                        </ul>
                        <li>
                            <a>
                                <i className="advancedTables"></i>
                                <span>Advanced Tables</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a href="">
                                    <i className="myProfileIcon"></i>
                                    <span>Pagination</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="myProfileIcon"></i>
                                    <span>Column Sorting</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="myProfileIcon"></i>
                                    <span>Column Filtering</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Row Expanding</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Row Selection</span>
                                </a>
                            </li>

                        </ul>

                        <li>
                            <a href="">
                                <i className="charts"></i>
                                <span>Charts</span><label>New</label>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="notifications"></i>
                                <span>Notifications</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="maps"></i>
                                <span>Maps</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Google Maps</span>
                                </a>
                            </li>

                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Vector Maps</span>
                                </a>
                            </li>
                        </ul>

                        <li>
                            <a>
                                <i className="calendar"></i>
                                <span>Calendar</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="multiLevel"></i>
                                <span>Multi Level</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Two Levels</span>
                                </a>
                            </li>

                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Item 1</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Item 2</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Two Levels</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Item 1</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Item 2</span>
                                </a>
                            </li>

                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Three Level</span>
                                </a>
                            </li>
                        </ul>
                        <li className="sap"><h6>NFL: Tools & Components</h6></li>
                        <li>
                            <a>
                                <i className="scores"></i>
                                <span>Scores</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="standings"></i>
                                <span>Standings</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="schedule"></i>
                                <span>Schedule</span>
                            </a>
                        </li>
                        <ul className="submenu" style={{display: 'none'}}>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Current Week</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Score Ticker</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Bye Weeks</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Team Schedule</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="myProfileIcon"></i>
                                    <span>Venue Schedule</span>
                                </a>
                            </li>
                        </ul>

                    </ul>
                </nav>
            </section>
        </section>
    </div>
)
export default Menu;