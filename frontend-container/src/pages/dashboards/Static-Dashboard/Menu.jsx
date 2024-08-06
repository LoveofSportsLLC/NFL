import React from "react";

const Menu = () => (
    // <h1>This is Left Menu Panel component</h1>
<section class="navMenu">
    <div class="clientLogo">
        <a href="dashboard.php">
            <img id="full" src="images/logo.png" style="max-width:70px;"/>
            <img id="intial" src="images/logo-intial.png" style="display:none;"/>
        </a>
    </div>

    <section class="menuWrapper">
        <nav class="leftMenu">
            <ul>
                <li class="sap"><h6>Pages</h6></li>
                <li>
                    <a href="dashboard.php" class="dashboardMenu">
                        <i class="dashboardIcon"></i>
                        <span>Dashboard</span><label>Customize</label>
                    </a>
                </li>

                <ul class="submenu">
                    <li>
                        <a href="">
                            <i class="presetNFL"></i>
                            <span>Preset NFL</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="presetMLB"></i>
                            <span>Preset MLB</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="liveGames"></i>
                            <span>Live Games</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="myTeams"></i>
                            <span>My Teams</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a href="">
                        <i class="myProfile"></i>
                        <span>Pages</span>
                    </a>
                </li>

                <ul class="submenu" style="display:none;">
                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>My Profile</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>Settings</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>Analytics</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>Fantasy Draft</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>Predictions</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>About Us</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>Support</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class="rightArrow"></i>
                            <span>Blank Page</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a href="">
                        <i class="auth"></i>
                        <span>Auth</span>
                    </a>
                </li>

                <ul class="submenu" style="display:none;">

                    <li>
                        <a href="">
                            <i class="iconClass"></i>
                            <span>Sign In</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="iconClass"></i>
                            <span>Sign Up</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="iconClass"></i>
                            <span>Reset Password</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="iconClass"></i>
                            <span>404 Error</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="iconClass"></i>
                            <span>500</span>
                        </a>
                    </li>
                </ul>
                <li>
                    <a href="">
                        <i class="documentation"></i>
                        <span>Documentation</span>
                    </a>
                </li>


                <li class="sap"><h6>Tools & Components</h6></li>

                <li>
                    <a href="">
                        <i class="mostUsedComponets"></i>
                        <span>Most Used Components</span>
                    </a>
                </li>
                <ul class="submenu" style="display:none;">

                    <li>
                        <a href="">
                            <i class="myProfileIcon"></i>
                            <span>Alerts</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Buttons</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cards</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Carousel</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Embed Video</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>General</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Modal</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Offcanvas</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Tabs</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Typography</span>
                        </a>
                    </li>
                </ul>
                <li>
                    <a href="">
                        <i class="favoriteComponents"></i>
                        <span>Favourite Components</span>
                    </a>
                </li>
                <ul class="submenu" style="display:none;">
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Feather</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Font Awesome</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Favourite Components</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Layouts</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Basic Inputs</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="form"></i>
                        <span>Forms</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class=""></i>
                            <span>Layout</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class=""></i>
                            <span>Basic Inputs</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <i class=""></i>
                            <span>Input Group</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a href="">
                        <i class="tables"></i>
                        <span>Tables</span>
                    </a>
                </li>

                <li class="sap"><h6>Plugins & Addons</h6></li>
                <li>
                    <a href="">
                        <i class="formPlugins"></i>
                        <span>Form Plugins</span>
                    </a>
                </li>

                <ul class="submenu" style="display:none;">
                    <li>
                        <a>
                            <i class="advancedInput"></i>
                            <span>Advanced Inputs</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class=""></i>
                            <span>Formik<a href="">New</a></span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class=""></i>
                            <span>Editors</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class=""></i>
                            <span>Editors</span>
                        </a>
                    </li>
                </ul>
                <li>
                    <a>
                        <i class="advancedTables"></i>
                        <span>Advanced Tables</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a href="">
                            <i class="myProfileIcon"></i>
                            <span>Pagination</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="myProfileIcon"></i>
                            <span>Column Sorting</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="myProfileIcon"></i>
                            <span>Column Filtering</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Row Expanding</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Row Selection</span>
                        </a>
                    </li>

                </ul>

                <li>
                    <a href="">
                        <i class="charts"></i>
                        <span>Charts</span><label>New</label>

                    </a>
                </li>
                <li>
                    <a>
                        <i class="notifications"></i>
                        <span>Notifications</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="maps"></i>
                        <span>Maps</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Google Maps</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Vector Maps</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="calendar"></i>
                        <span>Calendar</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="multiLevel"></i>
                        <span>Multi Level</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Two Levels</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Item 1</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Item 2</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Two Levels</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Item 1</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Item 2</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Three Level</span>
                        </a>
                    </li>
                </ul>
                <li class="sap"><h6>NFL: Tools & Components</h6></li>
                <li>
                    <a>
                        <i class="scores"></i>
                        <span>Scores</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="standings"></i>
                        <span>Standings</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="schedule"></i>
                        <span>Schedule</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Current Week</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Score Ticker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Bye Weeks</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Team Schedule</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Venue Schedule</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="nFLStats"></i>
                        <span>NFL Stats</span>
                    </a>
                </li>

                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Team</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Offense</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Passing</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Rushing</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Receiving</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Efficiency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Explosive Plays</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Defense</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Play Frequency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Play Frequency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Play Frequency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Defense</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Special Teams</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Personnel Groupings</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Weekly Analysis</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Seasonal Analysis</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Strength of Schedule</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Boxscore</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Play by Play</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Drive Summaries</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Logs</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Stats</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Stats</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Stats</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Trends</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Splits</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Efficiency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Explosiveness</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Play Frequency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game Snap Rates</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Game No Huddle Analysis</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player Stats</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player Trends</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player Splits</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player Efficiency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                        <i class="myProfileIcon"></i>
                            <span>Player Explosiveness</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player Play Frequency</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player Snap Rates</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Player No Huddle Analysis</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Coach</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Coach Stats</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Coach Trends</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Coach Play Tendencies</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="nFLDraft"></i>
                        <span>NFL Draft</span>
                    </a>
                </li>
                <ul class="submenu" style="display:none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Draft Prospects</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Draft Tracker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Draft History</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Draft Grades</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Draft Tools</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="contractsCapSpace"></i>
                        <span>Contracts & Cap Space</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>NFL Teams</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Active Contracts</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Salaries by Year</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Positional Spending</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>2024 Salary Cap Table</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>2024 Free Agents</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Transactions</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cap Tracker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cap Tracker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cap Tracker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Positional Spending</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Contracts</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Active Contracts</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cumulative Cash</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Remaining Cash</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Dead Cap</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Dead Cap</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Top Salaries</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Leaderboard</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cap Hits</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Total Cash</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Average Salaries</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Guaranteed Money</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Career Earnings</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Average Salaries</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Free Agents</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Extensions</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Tools</span>
                        </a>
                    </li>


                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>IR Tracker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Fines & Suspensions</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Cap Management</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Draft Tracker</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Depth Chart Tools</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Best Values</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Transactions</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>NFL Transactions</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Expanded Transactions</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Recent Extensions</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Restructures</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a href="">
                        <i class="betting"></i>
                        <span>Betting</span><label>New</label>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Games & Lines</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Props</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Parlays</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="fantasy"></i>
                        <span>Fantasy</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Leaders</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Leaders</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>My teams</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Injuries</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Starts Sit</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Trade Analyzer</span>
                        </a>
                    </li>
                </ul>

                <li>
                    <a>
                        <i class="news"></i>
                        <span>News</span>
                    </a>
                </li>
                <ul class="submenu" style="display: none;">

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Injuries</span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Socia</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Articles</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Podcast</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="myProfileIcon"></i>
                            <span>Videos</span>
                        </a>
                    </li>
                </ul>
            </ul>
        </nav>
    </section>
</section>

)

export default Menu;