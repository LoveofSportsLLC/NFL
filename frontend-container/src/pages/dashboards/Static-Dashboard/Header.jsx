import React from "react";
import "./inc/css/style.css";
import "./inc/css/theme.css";
const Header = () => (
    <header>
        <a href="" class="menuIcon" onclick="openMenu()">
            <img src="/src/pages/dashboards/Static-Dashboard/images/menu-icon.svg" alt="menu-icon"/>
        </a>
        <section className="pageTitle">
            <h1>Dash<span>board</span>
                <span className="searchBox"><input type="text" placeholder="Search Project"/></span>
            </h1>
            <div className="loggedInUser">
                <span><img src="/src/pages/dashboards/Static-Dashboard/images/default_user_avtar.png"/></span>
            </div>
            <div className="notification topbarRightIcon tooltip" >
                <a href="javascript:;">
                    <i className="notificationIcon">
                        <img src="/src/pages/dashboards/Static-Dashboard/images/notification-icon.svg"/></i>
                </a>
                <span className="tooltiptext">
                    <label>->First Notifications Message</label>
                    <label>->Second Notifications Message</label>
                    <label>->Third Notifications Message</label>
                </span>
            </div>
        </section>
    </header>
)

export default Header;
