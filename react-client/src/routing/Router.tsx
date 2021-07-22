import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MathPage from "../pages/MathPage";
import NotFoundPage from "../pages/NotFoundPage";
import PathfinderPage from "../pages/PathfinderPage";
import {
  HOME_PATH,
  MATH_PATH,
  NOT_FOUND_PATH,
  PATHFINDER_PATH,
} from "./constants/RoutePaths";

import { AppRoute } from "./types/TRoute";

const routes: AppRoute[] = [
  {
    path: HOME_PATH,
    component: HomePage,
  },
  {
    path: MATH_PATH,
    component: MathPage,
  },
  {
    path: PATHFINDER_PATH,
    component: PathfinderPage,
  },
  {
    path: NOT_FOUND_PATH,
    component: NotFoundPage,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
