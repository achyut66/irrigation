
import BannerCarousel from "../components/Banner";
import ServicesAndTeam from "../services/OurServices";
import MissionSection from "../components/Mission";
import NationalProjects from "../plan/Ayojana";
import GallerySection from "../gallery/PhotoGallery";
import NewsHighlightSection from "../components/NewsHighlightSection";
import KaryasamitiDetails from "../components/Karyasamiti";
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
      <KaryasamitiDetails/>
      <NationalProjects/>
      <NewsHighlightSection/>
      <GallerySection/>
      <Footer/>
      {/* <HomeContent lang={params.lang} />; */}
    </>
  );
}
