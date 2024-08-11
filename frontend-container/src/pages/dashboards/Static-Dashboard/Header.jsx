import React from "react";
import "./inc/css/style.css";
import "./inc/css/theme.css";
const Header = () => (
    <header>
        <a href="" class="menuIcon" onclick="openMenu()">
            <img src="images/menu-icon.svg" alt="menu-icon"/>
        </a>
        <section className="pageTitle">
            <h1>Dash<span>board</span>
                <span className="searchBox">
                 <input type="text" placeholder="Search Project"/>
                </span>
            </h1>
        </section>
    </header>
)

export default Header;