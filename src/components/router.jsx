import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import About from "../pages/about";
import LPChart from "../pages/lpChart";
import PriceChart from "../pages/PriceChart";
import NFTCollection from "./NFTCollection";

/**
 * The router is imported in app.jsx
 *
 * Our site just has two routes in it–Home and About
 * Each one is defined as a component in /pages
 * We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
 */

export default () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/emhChart" component={LPChart} />
    <Route path="/priceChart" component={PriceChart} />
    <Route path="/nfts/:account/:count/:location" component={NFTCollection} />
  </Switch>
);
