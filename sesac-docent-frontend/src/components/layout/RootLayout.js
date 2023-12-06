import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      {/* <Navigation /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
