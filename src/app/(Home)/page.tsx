import { Box } from "@mui/material";
import NavBar from "../../../components/navBar/navBar";
import Hero from "../../../components/Hero/Hero";
import LatestUpdates from "../../../components/LatestUpdates/LatestUpdates";
import OverView from "../../../components/OverView/OverView";
import Working from "../../../components/Working/Working";
import Reviews from "../../../components/Reviews/reviews";
import Footer from "../../../components/Footer/footer";

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
