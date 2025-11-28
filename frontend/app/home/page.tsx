
import BannerCarousel from "../components/Banner";
import ServicesAndTeam from "../components/OurServices";
import MissionSection from "../components/Mission";
import NationalProjects from "../components/Ayojana";
import GallerySection from "../components/Gallery";
import NewsHighlightSection from "../components/NewsHighlightSection";
import Footer from "../components/Footer";
// import HomeContent from "../../components/Header";

// interface PageProps {
//   params: { lang: string };
// }

export default function Home() {
  return (
    <>
      <BannerCarousel/>
      <ServicesAndTeam/>
      <MissionSection/>
      <NationalProjects/>
      <NewsHighlightSection/>
      <GallerySection/>
      <Footer/>
      {/* <HomeContent lang={params.lang} />; */}
    </>
  );
}
