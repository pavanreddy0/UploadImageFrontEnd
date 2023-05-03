import React from "react";

//links
export const linkImageView = "/image";
export const linkStart = "/";
export const linkSignUp = "/signup";
export const linkLogin = "/login";

//linknames
export const linkNameImage = "Image";
export const linkNameStart = "Images Page";
export const linkNameSignUp = "Sign Up Page";
export const linkNameLogin = "Login Page";

// import {} "../ShowImage"

//imports
const Home = React.lazy(() => import("../ImageInput"));
const Image = React.lazy(() => import("../ShowImage"));
const SignUp = React.lazy(() => import("../SignUp"));
const Login = React.lazy(() => import("../Login"));

const routes = [
  {
    path: linkStart,
    exact: true,
    name: linkNameStart,
    component: Home,
  },
  {
    path: linkImageView,
    exact: true,
    name: linkNameImage,
    component: Image,
  },
  {
    path: linkSignUp,
    exact: true,
    name: linkNameSignUp,
    component: SignUp,
  },
  {
    path: linkLogin,
    exact: true,
    name: linkNameLogin,
    component: Login,
  },
];

// export const desktopRoutes = [...routes,];

export default routes;
