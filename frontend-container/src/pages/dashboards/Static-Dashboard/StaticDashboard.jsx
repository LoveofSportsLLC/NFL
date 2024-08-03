import React from "react";
import "./inc/css/style.css";
import "./inc/css/theme.css";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
const StaticDashboard = () => (
    <React.Fragment>
    <Header />
    <div>
        <Menu/>
    </div>
    <section className="">
        <ul className="cardState grid4">
            <li className="card grid2 dashboardMenu">
                <div className="cardHeader">
                    <span>Welcome!<br/>John B.</span>
                </div>
                <div className="">
                    <span className="iconClass"><img src="images/home-icon.svg"/></span>
                </div>
            </li>

            <li className="card grid2">
                <div className="cardHeader">
                    <h3>$ 24.300</h3>
                    <span>Total Earning</span>
                    <label className=""><a href="" className="numbertext">+5.35%</a>Since last week</label>
                </div>
                <div className="">
                    <span className="iconClass"><img src="images/earning-icon.svg"/></span>
                </div>
            </li>

            <li className="card grid2">
                <div className="cardHeader">
                    <h3>43</h3>
                    <span>Pending Orders</span>
                    <label className=""><a href="" className="numbertext">+5.35%</a>Since last week</label>
                </div>
                <div className="">
                    <span className="iconClass"><img src="images/pending-order.svg"/></span>
                </div>
            </li>

            <li className="card grid2">
                <div className="cardHeader">
                    <h3>$ 18.700</h3>
                    <span>Total Revenue</span>
                    <label className=""><a href="" className="numbertext">+5.35%</a>Since last week</label>
                </div>
                <div className="">
                <span className="iconClass">
                    <img src="/src/pages/dashboards/Static-Dashboard/images/total-revenue.svg" />
                </span>
                </div>
            </li>
        </ul>
    </section>
        </ React.Fragment>
        )

        export default StaticDashboard;