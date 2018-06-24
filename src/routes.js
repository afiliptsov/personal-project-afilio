import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Item from "./components/Item/Item";
import Profile from "./components/Profile/Profile";
import CreateItem from "./components/Item/CreateItem";
import ItemDescription from "./components/ItemDescription/ItemDescription";
import GeneralMap from "./components/GoogleMaps/GeneralMap";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/item" component={Item} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/createItem" component={CreateItem} />
    <Route exact path="/item/:id" component={ItemDescription} />
    <Route exact path="/map" component={GeneralMap} />
    <Route path="*" render={() => <div>404 Error</div>} />
  </Switch>
);
