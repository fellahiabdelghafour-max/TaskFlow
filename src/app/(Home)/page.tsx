import { Box } from "@mui/material";
import NavBar from "../../../components/Home/navBar/navBar";
import Hero from "../../../components/Home/Hero/Hero";
import LatestUpdates from "../../../components/Home/LatestUpdates/LatestUpdates";
import OverView from "../../../components/Home/OverView/OverView";
import Working from "../../../components/Home/Working/Working";
import Reviews from "../../../components/Home/Reviews/reviews";
import Footer from "../../../components/Home/Footer/footer";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <NavBar />
      <Hero />
      <LatestUpdates />
      <OverView />
      <Working />
      <Reviews />
      <Footer />
    </Box>
  );
}
