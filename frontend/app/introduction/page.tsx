
export const metadata = {
    title: "पृष्टभूमि / परिचय - ज्वालामूखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड",
    description: "ज्वालामूखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड",
  };

import Footer from "../components/Footer";
import Introduction from "../components/Introduction/Introduction";
import Background from "../components/Background/Background";

export default function () {
    return (
        <>
        <Introduction/>
        <Background/>
        <Footer/>
        </>
    );
}