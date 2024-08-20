import React from 'react';
import { Helmet } from 'react-helmet';
import './inc/css/style.css';
import './inc/css/theme.css';
import Header from './Header.jsx';
import Menu from './Menu.jsx';
const StaticDashboard = () => (
  <React.Fragment>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>

    <Header />
    <main>
      <div>
        <Menu />
      </div>

      <section className="">
        <ul className="cardState grid4">
          <li className="card grid2 dashboardMenu">
            <div className="cardHeader">
              <span>
                Welcome!
                <br />
                John B.
              </span>
            </div>
            <div className="">
              <span className="iconClass">
                <img src="/src/pages/dashboards/Static-Dashboard/images/home-icon.svg" />
              </span>
            </div>
          </li>

          <li className="card grid2">
            <div className="cardHeader">
              <h3>$ 24.300</h3>
              <span>Total Earning</span>
              <label className="">
                <a href="" className="numbertext">
                  +5.35%
                </a>
                Since last week
              </label>
            </div>
            <div className="">
              <span className="iconClass">
                <img src="/src/pages/dashboards/Static-Dashboard/images/earning-icon.svg" />
              </span>
            </div>
          </li>

          <li className="card grid2">
            <div className="cardHeader">
              <h3>43</h3>
              <span>Pending Orders</span>
              <label className="">
                <a href="" className="numbertext">
                  +5.35%
                </a>
                Since last week
              </label>
            </div>
            <div className="">
              <span className="iconClass">
                <img src="/src/pages/dashboards/Static-Dashboard/images/pending-order.svg" />
              </span>
            </div>
          </li>

          <li className="card grid2">
            <div className="cardHeader">
              <h3>$ 18.700</h3>
              <span>Total Revenue</span>
              <label className="">
                <a href="" className="numbertext">
                  +5.35%
                </a>
                Since last week
              </label>
            </div>
            <div className="">
              <span className="iconClass">
                <img src="/src/pages/dashboards/Static-Dashboard/images/total-revenue.svg" />
              </span>
            </div>
          </li>
        </ul>
      </section>

      <div className="timeline card">
        <h1>Appointments</h1>
        <ul>
          <li>
            <div className="circle"></div>
            <div className="content">
              <h3>Chat with Carl and Ashley</h3>
              <p>
                Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget,
                imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices
                mauris...{' '}
              </p>
            </div>
          </li>

          <li>
            <div className="circle"></div>
            <div className="content">
              <h3>The big launch</h3>
              <p>
                Sed aliquam ultrices mauris. Integer ante arcu, accumsan a,
                consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                Phasellus ullamcorper ipsum rutrum nunc...{' '}
              </p>
            </div>
          </li>

          <li>
            <div className="circle"></div>
            <div className="content">
              <h3></h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet nulla auctor, vestibulum magna sed, convallis ex.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </React.Fragment>
);

export default StaticDashboard;
