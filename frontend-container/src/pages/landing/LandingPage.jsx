import React from "react";
import TopNavBar from "./TopNavBar";
import Home from "./Home";
import Dashboard from "./Dashboards";
import Teams from "./Statistics/Teams/Teams";
import Players from "./Statistics/Players/Players";
import Games from "./Statistics/Games/Games";
import Standings from "./Statistics/Standings/Standings";
import Stats from "./Statistics/Statistics";
import News from "./News";
import Fantasy from "./Fantasy";
import Analysis from "./Analysis";
import ModelInsights from "./ModelInsights";
import About from "./About";
import Search from "./Search";
import "./LandingPage.css"; // Style the page

const LandingPage = () => {
  return (
    <div className="landing-page">
      <TopNavBar />
      <section id="home" className="section">
        <Home />
      </section>
      <section id="dashboard" className="section">
        <Dashboard />
      </section>
      <section id="teams" className="section">
        <Teams />
      </section>
      <section id="players" className="section">
        <Players />
      </section>
      <section id="games" className="section">
        <Games />
      </section>
      <section id="standings" className="section">
        <Standings />
      </section>
      <section id="stats" className="section">
        <Stats />
      </section>
      <section id="news" className="section">
        <News />
      </section>
      <section id="fantasy" className="section">
        <Fantasy />
      </section>
      <section id="analysis" className="section">
        <Analysis />
      </section>
      <section id="model-insights" className="section">
        <ModelInsights />
      </section>
      <section id="about" className="section">
        <About />
      </section>
      <section id="search" className="section">
        <Search />
      </section>
    </div>
  );
};

export default LandingPage;
