
export const metadata = {
  title: "हाम्रो उदेश्य - ज्वालामूखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड",
  description: "ज्वालामूखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड",
};

import StickyLayout from "../components/StickeyLayout";
import Footer from "../components/Footer";

export default function Mission (){
    return (
        <>
        <div className="py-4 px-6 ml-10 md:px-12 lg:px-20">
        <h2 className="text-3xl font-bold mb-12 border-b-4 border-blue-500 inline-block pb-1">
          हाम्रो उद्देश्य
        </h2>
      
        {/* Mission */}
        <h3 className="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">मिशन</h3>
        <p className="relative text-gray-700 mt-2 mb-6 line-clamp-3 overflow-hidden">
          धादिङको ज्वालामूखी नगरपालिकामा आधुनिक र सशक्त सिँचाइ संस्कृतिको विकास गर्दै 
          सामुदायिक–आधारित जल व्यवस्थापन प्रणाली विस्तार गर्ने, साना तथा मध्यम 
          सिँचाइ नहरहरू सुदृढ गर्ने, र वर्षभरि भरपर्दो पानी उपलब्ध गराउने लक्ष्य हाम्रो 
          मिशन हो। यसले स्थानीय कृषिमा उत्पादकता बढाउने, किसानको जीवनस्तर सुधार गर्ने 
          तथा आधुनिक सिँचाइ प्रविधि र वैज्ञानिक जल–प्रयोग अभ्यासलाई प्रवर्द्धन गर्ने उद्देश्य राख्दछ।
        </p>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">१. सामुदायिक–आधारित जल व्यवस्थापन सुदृढ गर्ने</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>स्थानीय पानी उपभोक्ता समूहहरूलाई योजना, निर्णय तथा व्यवस्थापनमा सहभागी गराउने।</li>
          <li>सबै किसानले लाभ लिन सक्ने पारदर्शी र समावेशी सिँचाइ प्रणाली विकास गर्ने।</li>
        </ul>
        <br/>
        <h4 className="text-xl font-semibold text-gray-400 ml-18">२. सिँचाइ पूर्वाधार विकास र सुधार</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>विद्यमान साना तथा मध्यम नहरहरू सुधार गरी पानीको बहाव प्रभावकारी बनाउने।</li>
          <li>नगरपालिकाभित्रका सिँचाइ–वञ्चित क्षेत्रहरूमा सिँचाइ सेवा विस्तार गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">३. वर्षभर भरपर्दो पानी उपलब्धता सुनिश्चित गर्ने</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>जल भण्डारण, भू–गर्भीय पानी पुनर्भरण, र कुशल वितरण प्रणाली प्रवर्द्धन गर्ने।</li>
          <li>किसानहरूलाई सबै मौसममा निरन्तर पानी उपलब्ध गराई बाली चक्र सुधार गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">४. कृषि उत्पादनशीलता र किसान आम्दानी वृद्धि</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>पानीको प्रभावकारी उपयोगबाट बाली उत्पादन र विविधिकरण वृद्धि गर्ने।</li>
          <li>कुशल सिँचाइ प्रणालीमार्फत किसान परिवारको आर्थिक क्षमता सुदृढ गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">५. दिगो र वातावरण–मैत्री जल प्रयोग प्रवर्द्धन</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>जलधार संरक्षण, माटो कटान रोकथाम तथा वातावरणीय सन्तुलन कायम गर्न अभ्यास प्रवर्द्धन।</li>
          <li>दीगो वातावरणीय स्वास्थ्यकाे दीर्घकालीन लक्ष्यसँग मेल खाने सिँचाइ प्रणाली विकास।</li>
        </ul>
      
        {/* Vision */}
        <h3 className="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">भिजन</h3>
        <p className="relative text-gray-700 mt-2 mb-6 line-clamp-3 overflow-hidden">
          ज्वालामूखी नगरपालिकालाई कुशल पानी वितरण, जलवायु–सहिष्णु सिँचाइ प्रणाली र 
          वातावरण–मैत्री स्रोत व्यवस्थापनमा आधारित आदर्श कृषि क्षेत्रको रूपमा 
          रूपान्तरण गर्नु। प्रत्येक किसान परिवारलाई भरपर्दो सिँचाइ सुविधा उपलब्ध गराई 
          स्थानीय अर्थतन्त्र, खाद्य सुरक्षा, र दिगो ग्रामीण विकासमा योगदान पुर्‍याउनु नै हाम्रो भिजन हो।
        </p>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">१. ज्वालामूखीलाई आदर्श कृषि क्षेत्रका रूपमा स्थापना</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>उन्नत सिँचाइ प्रविधि र दिगो कृषि अभ्यासलाई अन्य क्षेत्रले पनि अनुकरण गर्न सकिने गरी प्रवर्द्धन गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">२. कुशल र न्यायोचित पानी वितरण सुनिश्चित गर्ने</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>सबै किसान परिवारलाई समान रूपमा पानी पुर्‍याउने र पानीको अपव्यय रोक्ने प्रणाली विकास गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">३. जलवायु–सहिष्णु सिँचाइ प्रणाली लागू गर्ने</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>जलवायु परिर्वतन, पानी कमी र प्राकृतिक जोखिमलाई सामना गर्न सक्षम प्रविधि र पूर्वाधार निर्माण गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">४. खाद्य सुरक्षा र दिगो ग्रामीण विकासमा योगदान</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>स्थानीय उत्पादन वृद्धि, समुदायको समग्र समृद्धि, र सामाजिक–आर्थिक विकासमा योगदान पुर्‍याउने।</li>
        </ul>
      
        {/* Goal */}
        <h3 className="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">लक्ष्य</h3>
        <p className="relative text-gray-700 mt-2 mb-8 line-clamp-3 overflow-hidden">
          हालको ४२–४८% प्रभावकारी कृषि जमिनमा पुगिरहेको सिँचाइ पहुँचलाई विस्तार गर्ने, 
          मनसुनका कारण बिग्रिने सिँचाइ नहरहरूको पुनर्निर्माण गर्ने, र 
          दिगो कृषि अभ्यासका लागि ड्रिप/स्प्रिंकलर प्रणाली प्रवर्द्धन गर्ने हाम्रो लक्ष्य 
          हो। साथै, किसान सहकारी सुदृढ गर्ने, जल शासन सुधार गर्ने, तथा 
          डिजिटल मनिटरिङ प्रणालीमार्फत स्रोत व्यवस्थापनलाई आधुनिक बनाउने उद्देश्य छ।
        </p>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">१. कृषि जमिनमा सिँचाइ पहुँच वृद्धि</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>४२–४८% भन्दा बढी क्षेत्रलाई सिँचाइ पहुँचमा ल्याउने।</li>
          <li>सिँचाइ वञ्चित क्षेत्रहरूलाई प्राथमिकता दिई समान पहुँच सुनिश्चित गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">२. सिँचाइ नहरको पुनर्निर्माण र सुधार</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>मनसुन, पहिरो र बाढीले क्षति पुर्‍याएका नहरहरू मर्मत र सुदृढ गर्ने।</li>
          <li>भविष्यका जलवायु जोखिम घटाउन संरचनात्मक सुरक्षा उपाय लागू गर्ने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">३. आधुनिक सिँचाइ प्रविधि प्रवर्द्धन</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>ड्रिप, स्प्रिंकलर र माइक्रो–सिँचाइ प्रणालीको व्यापक रूपमा विस्तार गर्ने।</li>
          <li>किसानलाई तालिम, सहुलियत र सहकारीमार्फत प्रविधिमा पहुँच सजिलो बनाउने।</li>
        </ul>
        <br/>
      
        <h4 className="text-xl font-semibold text-gray-400 ml-18">४. जल शासन तथा स्रोत व्यवस्थापन सुधार</h4>
        <ul className="list-disc text-sm font-semibold text-gray-800 ml-24">
          <li>पानी वितरण, नहर मर्मत तथा विवाद समाधानका लागि स्पष्ट मार्गदर्शन विकास गर्ने।</li>
          <li>उत्तरदायी, सहभागितामूलक तथा पारदर्शी स्रोत व्यवस्थापन प्रणाली स्थापना गर्ने।</li>
        </ul>
      </div>  
      <Footer/>  
      </>  
    );
}