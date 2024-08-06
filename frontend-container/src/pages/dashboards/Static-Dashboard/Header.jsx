import React from "react";

const Header = () => (

<header>

    <a href="javascript:;" class="menuIcon" onclick="openMenu()">
        <img src="images/menu-icon.svg" alt="menu-icon"/>
    </a>


    <section class="pageTitle">
        <h1>Dash<span>board</span>
            <span class="searchBox">
      <input type="text" placeholder="Search Project"/>
    </span>
        </h1>

        <div class="topRight">

            <div class="loggedInUser">
                <span>
          <img src="images/default_user_avtar.png"/>
        </span>
            </div>

            <div class="notification topbarRightIcon tooltip" style="top:-35px;">
                <a href="javascript:;">
                    <i class="notificationIcon"><img src="images/notification-icon.svg"/></i>
                </a>
                <span class="tooltiptext">
            <label>->First Notifications Message</label>
            <label>->Second Notifications Message</label>
            <label>->Third Notifications Message</label>
        </span>
            </div>

            <div class="tooltip">
              <a href="javascript:;" class="tooltiptext">
                <i class="notificationIcon"><img src="images/notification-icon.svg"/></i>
                <span class="tooltiptext ">New Notifications</span>
              </a>
            </div>

            <div class="country-selector topbarRightIcon contryIcon" style="top:-30px;">
                <a href="javascript:void(0);" class="country-toggle">
                    <img src="images/usa-logo.svg" id="countryIcon" style="max-width:26px; cursor:pointer; top:-3px;"/>
                </a>
                <div class="country-dropdown" style="display:none;">
                    <ul>

                        <li class="english">
                            <img src="images/usa-logo.svg" style="max-width:20px; cursor:pointer;"/>
                                <label>English</label>
                        </li>

                        <li class="german">
                            <img src="images/germany-icon.svg" style="max-width:20px; cursor:pointer;"/>
                                <label>German</label>
                        </li>

                        <li class="french">
                            <img src="images/French-icon.svg" style="max-width:20px; cursor:pointer;"/>
                                <label>French</label>
                        </li>

                        <li class="dutch">
                            <img src="images/dutch-icon.svg" style="max-width:20px; cursor:pointer;"/>
                                <label>Dutch</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</header>
)

export default Header;