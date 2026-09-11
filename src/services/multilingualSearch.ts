import { Scheme, Language } from '../types';

export interface MultilingualSearchResult {
  detectedLanguage: Language;
  normalizedQuery: string;
  matchedIntent?: string;
  matchedCategory?: string;
  matchedSchemes: Scheme[];
  explanation: string;
  suggestedTerms?: string[];
  matchedPortal?: {
    name: string;
    localName?: string;
    url: string;
    description: string;
  };
}

// Multilingual intent dictionary mapping keywords across all 13 languages to standardized intent
interface IntentDefinition {
  id: string;
  category: string;
  keywords: string[];
  targetSchemeKeywords: string[];
  explanation: Partial<Record<Language, string>>;
}

const MULTILINGUAL_INTENTS: IntentDefinition[] = [
  {
    id: 'scholarship_education',
    category: 'Education',
    keywords: [
      // English
      'scholarship', 'study', 'student', 'college', 'school', 'fee reimbursement', 'laptop', 'higher education',
      // Telugu
      'స్కాలర్‌షిప్', 'విద్యార్థి', 'చదువు', 'ఫీజు రీయింబర్స్‌మెంట్', 'ల్యాప్‌టాప్', 'విద్యా దీవెన', 'వసతి దీవెన', 'ఈపాస్', 'విద్య', 'కావాలి', 'విద్యార్థులకు',
      // Hindi
      'छात्रवृत्ति', 'स्कॉलरशिप', 'छात्र', 'विद्यार्थी', 'पढ़ाई', 'कॉलेज', 'फीस प्रतिपूर्ति', 'ईपास', 'लैपटॉप', 'शिक्षा', 'चाहिए',
      // Tamil
      'உதவித்தொகை', 'மாணவர்', 'கல்வி', 'கல்லூரி', 'படிப்பு', 'கல்விக் கட்டணம்', 'மடிக்கணினி', 'வேண்டும்',
      // Kannada
      'ವಿದ್ಯಾರ್ಥಿವೇತನ', 'ವಿದ್ಯಾರ್ಥಿ', 'ಶಿಕ್ಷಣ', 'ಕಾಲೇಜು', 'ಶುಲ್ಕ', 'ಲ್ಯಾಪ್‌ಟಾಪ್', 'ಬೇಕು',
      // Malayalam
      'സ്കോളർഷിപ്പ്', 'വിദ്യാർത്ഥി', 'പഠനം', 'കോളേജ്', 'വിദ്യാഭ്യാസം', 'ഫീസ് ഇളവ്', 'വേണം',
      // Marathi
      'शिष्यवृत्ती', 'विद्यार्थी', 'शिक्षण', 'कॉलेज', 'फी सवलत', 'लॅपटॉप', 'हवी आहे',
      // Bengali
      'বৃত্তি', 'ছাত্রবৃত্তি', 'স্কলারশিপ', 'শিক্ষার্থী', 'পড়াশোনা', 'কলেজ', 'ল্যাপটপ', 'দরকার',
      // Gujarati
      'શિષ્યવૃત્તિ', 'વિદ્યાર્થી', 'શિક્ષણ', 'કોલેજ', 'ફી માફી', 'લેપટોપ', 'જોઈએ છે',
      // Punjabi
      'ਵਜ਼ੀਫ਼ਾ', 'ਸਕਾਲਰਸ਼ਿਪ', 'ਵਿਦਿਆਰਥੀ', 'ਪੜ੍ਹਾਈ', 'ਕਾਲਜ', 'ਫੀਸ ਮੁਆਫ਼ੀ', 'ਚਾਹੀਦੀ ਹੈ',
      // Odia
      'ଛାତ୍ରବୃତ୍ତି', 'ସ୍କଲାରସିପ୍', 'ଛାତ୍ର', 'ପାଠପଢ଼ା', 'କଲେଜ', 'ଫି ଛାଡ଼', 'ଦରକାର',
      // Assamese
      'বৃত্তি', 'ছাত্রবৃত্তি', 'শিক্ষাৰ্থী', 'পঢ়াশুনা', 'কলেজ', 'মাচুল ৰেহাই', 'লাগে',
      // Urdu
      'وظیفہ', 'اسکالرشپ', 'طالب علم', 'طلباء', 'تعلیم', 'کالج', 'فیس میں رعایت', 'لیپ ٹاپ', 'چاہیے',
    ],
    targetSchemeKeywords: ['scholarship', 'post-matric', 'nsp', 'education', 'epass', 'vidya', 'fee'],
    explanation: {
      English: 'Identified request for educational scholarships, student stipends, and fee waiver programs.',
      Hindi: 'छात्रवृत्ति, विद्यार्थी वजीफा और शुल्क प्रतिपूर्ति योजनाओं की पहचान की गई।',
      Telugu: 'విద్యా స్కాలర్‌షిప్‌లు, విద్యార్థి భత్యాలు మరియు ఫీజు రీయింబర్స్‌మెంట్ పథకాలు గుర్తించబడ్డాయి.',
      Tamil: 'கல்வி உதவித்தொகை, மாணவர் உதவித்தொகை மற்றும் கட்டண விலக்கு திட்டங்கள் கண்டறியப்பட்டன.',
      Kannada: 'ಶೈಕ್ಷಣಿಕ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು ಮತ್ತು ಶುಲ್ಕ ವಿನಾಯಿತಿ ಯೋಜನೆಗಳನ್ನು ಗುರುತಿಸಲಾಗಿದೆ.',
      Malayalam: 'വിദ്യാഭ്യാസ സ്കോളർഷിപ്പുകളും ഫീസ് ഇളവ് പദ്ധതികളും കണ്ടെത്തി.',
      Marathi: 'शैक्षणिक शिष्यवृत्ती आणि फी प्रतिपूर्ती योजना शोधल्या गेल्या.',
      Bengali: 'শিক্ষামূলক বৃত্তি এবং ফি মকুবের প্রকল্পগুলি শনাক্ত করা হয়েছে।',
      Gujarati: 'શૈક્ષણિક શિષ્યવૃત્તિ અને ફી માફીની યોજનાઓ શોધાઈ.',
      Punjabi: 'ਸਿੱਖਿਆ ਵਜ਼ੀਫ਼ੇ ਅਤੇ ਫੀਸ ਮੁਆਫ਼ੀ ਸਕੀਮਾਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਗਈ।',
      Odia: 'ଶିକ୍ଷାଗତ ଛାତ୍ରବୃତ୍ତି ଏବଂ ଫି ଛାଡ଼ ଯୋଜନା ଚିହ୍ନଟ ହୋଇଛି।',
      Assamese: 'শিক্ষামূলক বৃত্তি আৰু মাচুল ৰেহাই আঁচনি চিনাক্ত কৰা হৈছে।',
      Urdu: 'تعلیمی وظائف اور فیس میں رعایت کی اسکیموں کی شناخت کی گئی ہے۔',
    }
  },
  {
    id: 'farmer_agriculture',
    category: 'Agriculture',
    keywords: [
      // English
      'farmer', 'agriculture', 'kisan', 'crop', 'tractor', 'seeds', 'fertilizer', 'fasal', 'farming', 'land',
      // Telugu
      'రైతు', 'వ్యవసాయం', 'రైతు బంధు', 'రైతు భరోసా', 'పీఎం కిసాన్', 'ట్రాక్టర్', 'విత్తనాలు', 'పంట', 'భూమి',
      // Hindi
      'किसान', 'खेती', 'कृषि', 'पीएम किसान', 'फसल', 'बीज', 'ट्रैक्टर', 'खाद', 'सिंचाई', 'खेत',
      // Tamil
      'விவசாயி', 'வேளாண்மை', 'பயிர்', 'விதை', 'டிராக்டர்', 'உரம்', 'நிலம்', 'கிசான்',
      // Kannada
      'ರೈತ', 'ಕೃಷಿ', 'ಬೆಳೆ', 'ಬೀಜ', 'ಟ್ರಾಕ್ಟರ್', 'ರಸಗೊಬ್ಬರ', 'ಭೂಮಿ',
      // Malayalam
      'കർഷകൻ', 'കൃഷി', 'വിള', 'വിത്ത്', 'ട്രാക്ടർ', 'വളം', 'ഭൂമി',
      // Marathi
      'शेतकरी', 'शेती', 'कृषी', 'पीक', 'बियाणे', 'ट्रॅक्टर', 'खत', 'जमीन',
      // Bengali
      'কৃষক', 'কৃষি', 'ফসল', 'বীজ', 'ট্রাক্টর', 'সার', 'জমি', 'চাষবাস',
      // Gujarati
      'ખેડૂત', 'ખેતી', 'કૃષિ', 'પાક', 'બિયારણ', 'ટ્રેક્ટર', 'ખાતર', 'જમીન',
      // Punjabi
      'ਕਿਸਾਨ', 'ਖੇਤੀਬਾੜੀ', 'ਫ਼ਸਲ', 'ਬੀਜ', 'ਟਰੈਕਟਰ', 'ਖਾਦ', 'ਜ਼ਮੀਨ',
      // Odia
      'କୃଷକ', 'କୃଷି', 'ଚାଷୀ', 'ଫସଲ', 'ବିହନ', 'ଟ୍ରାକ୍ଟର', 'ଖତ', 'ଜମି',
      // Assamese
      'কৃষক', 'কৃষি', 'শস্য', 'বীজ', 'ট্ৰেক্টৰ', 'সাৰ', 'মাটি',
      // Urdu
      'کسان', 'زراعت', 'کھیتی', 'فصل', 'بیج', 'ٹریکٹر', 'کھاد', 'زمین',
    ],
    targetSchemeKeywords: ['pm-kisan', 'rythu', 'agriculture', 'tractor', 'smam', 'crop', 'fasal'],
    explanation: {
      English: 'Identified farmer support, agricultural subsidies, direct income transfer (DBT), and crop programs.',
      Hindi: 'किसान सहायता, कृषि सब्सिडी, प्रत्यक्ष लाभ अंतरण (पीएम-किसान) और फसल योजनाओं की पहचान की गई।',
      Telugu: 'రైతు సంక్షేమ పథకాలు, వ్యవసాయ రాయితీలు, పీఎం కిసాన్ మరియు పంట పెట్టుబడి సాయం గుర్తించబడ్డాయి.',
      Tamil: 'விவசாயிகள் நலத்திட்டங்கள், மானியங்கள் மற்றும் பயிர் காப்பீட்டுத் திட்டங்கள் கண்டறியப்பட்டன.',
      Kannada: 'ರೈತ ಬೆಂಬಲ, ಕೃಷಿ ಸಬ್ಸಿಡಿ ಮತ್ತು ಬೆಳೆ ಯೋಜನೆಗಳನ್ನು ಗುರುತಿಸಲಾಗಿದೆ.',
      Malayalam: 'കർഷക ക്ഷേമ പദ്ധതികളും സബ്സിഡികളും കണ്ടെത്തി.',
      Marathi: 'शेतकरी साहाय्य आणि पीक अनुदान योजना शोधल्या गेल्या.',
      Bengali: 'কৃষক সহায়তা এবং ফসল অনুদান প্রকল্প শনাক্ত হয়েছে।',
      Gujarati: 'ખેડૂત સહાય અને પાક સહાય યોજનાઓ શોધાઈ.',
      Punjabi: 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਅਤੇ ਫ਼ਸਲੀ ਸਕੀਮਾਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਗਈ।',
      Odia: 'କୃଷକ ସହାୟତା ଏବଂ ଫସଲ ଯୋଜନା ଚିହ୍ନଟ ହୋଇଛି।',
      Assamese: 'কৃষক সাহাৰ্য আৰু শস্য আঁচনি চিনাক্ত কৰা হৈছে।',
      Urdu: 'کسان سپورٹ اور زرعی اسکیموں کی شناخت کی گئی ہے۔',
    }
  },
  {
    id: 'healthcare_medical',
    category: 'Healthcare',
    keywords: [
      // English
      'health', 'hospital', 'treatment', 'medical', 'medicine', 'surgery', 'doctor', 'ayushman', 'insurance',
      // Telugu
      'ఆరోగ్యం', 'ఆసుపత్రి', 'చికిత్స', 'ఆరోగ్యశ్రీ', 'వైద్యం', 'మందులు', 'ఆపరేషన్', 'ఉచిత చికిత్స',
      // Hindi
      'स्वास्थ्य', 'अस्पताल', 'इलाज', 'दवा', 'सर्जरी', 'आयुष्मान', 'चिकित्सा', 'मुफ्त इलाज',
      // Tamil
      'சுகாதாரம்', 'மருத்துவமனை', 'சிகிச்சை', 'மருந்து', 'ஆயுஷ்மான்', 'இலவச சிகிச்சை',
      // Kannada
      'ಆರೋಗ್ಯ', 'ಆಸ್ಪತ್ರೆ', 'ಚಿಕಿತ್ಸೆ', 'ಔಷಧ', 'ಆಯುಷ್ಮಾನ್', 'ಉಚಿತ ಚಿಕಿತ್ಸೆ',
      // Malayalam
      'ആരോഗ്യം', 'ആശുപത്രി', 'ചികിത്സ', 'മരുന്ന്', 'ആയുഷ്മാൻ', 'സൗജന്യ ചികിത്സ',
      // Marathi
      'आरोग्य', 'दवाखाना', 'उपचार', 'औषध', 'आयुष्मान', 'मोफत उपचार',
      // Bengali
      'স্বাস্থ্য', 'হাসপাতাল', 'চিকিৎসা', 'ওষুধ', 'আয়ুষ্মান', 'বিনামূল্যে চিকিৎসা',
      // Gujarati
      'આરોગ્ય', 'હોસ્પિટલ', 'સારવાર', 'દવા', 'આયુષ્માન', 'મફત સારવાર',
      // Punjabi
      'ਸਿਹਤ', 'ਹਸਪਤਾਲ', 'ਇਲਾਜ', 'ਦਵਾਈ', 'ਆਯੁਸ਼ਮਾਨ', 'ਮੁਫ਼ਤ ਇਲਾਜ',
      // Odia
      'ସ୍ୱାସ୍ଥ୍ୟ', 'ଡାକ୍ତରଖାନା', 'ଚିକିତ୍ସା', 'ଔଷଧ', 'ଆୟୁଷ୍ମାନ', 'ମାଗଣା ଚିକିତ୍ସା',
      // Assamese
      'স্বাস্থ্য', 'চিকিৎসালয়', 'চিকিৎসা', 'ঔষধ', 'আয়ুষ্মান', 'বিনামূলীয়া চিকিৎসা',
      // Urdu
      'صحت', 'ہسپتال', 'علاج', 'دوا', 'آپریشن', 'آیوشمان', 'مفت علاج',
    ],
    targetSchemeKeywords: ['ayushman', 'aarogyasri', 'health', 'hospital', 'medical'],
    explanation: {
      English: 'Identified healthcare coverage, free hospital surgery, and secondary/tertiary medical treatment schemes.',
      Hindi: 'स्वास्थ्य सुरक्षा, मुफ्त अस्पताल सर्जरी और चिकित्सा उपचार योजनाओं की पहचान की गई।',
      Telugu: 'ఉచిత ఆసుపత్రి చికిత్స, ఆపరేషన్లు మరియు ఆరోగ్యశ్రీ / ఆయుష్మాన్ భారత్ పథకాలు గుర్తించబడ్డాయి.',
      Tamil: 'இலவச மருத்துவ சிகிச்சை மற்றும் மருத்துவக் காப்பீட்டுத் திட்டங்கள் கண்டறியப்பட்டன.',
      Kannada: 'ಉಚಿತ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಆರೋಗ್ಯ ವಿಮಾ ಯೋಜನೆಗಳನ್ನು ಗುರುತಿಸಲಾಗಿದೆ.',
      Malayalam: 'സൗജന്യ ആശുപത്രി ചികിത്സയും ആരോഗ്യ ഇൻഷുറൻസ് പദ്ധതികളും കണ്ടെത്തി.',
      Marathi: 'मोफत रुग्णालय उपचार आणि आरोग्य विमा योजना शोधल्या गेल्या.',
      Bengali: 'বিনামূল্যে হাসপাতাল চিকিৎসা এবং স্বাস্থ্য সুরক্ষা প্রকল্প শনাক্ত হয়েছে।',
      Gujarati: 'મફત હોસ્પિટલ સારવાર અને આયુષ્માન આરોગ્ય યોજનાઓ શોધાઈ.',
      Punjabi: 'ਮੁਫ਼ਤ ਹਸਪਤਾਲ ਇਲਾਜ ਅਤੇ ਸਿਹਤ ਬੀਮਾ ਸਕੀਮਾਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਗਈ।',
      Odia: 'ମାଗଣା ଡାକ୍ତରଖାନା ଚିକିତ୍ସା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ବୀମା ଯୋଜନା ଚିହ୍ନଟ ହୋଇଛି।',
      Assamese: 'বিনামূলীয়া চিকিৎসালয় চিকিৎসা আৰু স্বাস্থ্য বীমা আঁচনি চিনাক্ত কৰা হৈছে।',
      Urdu: 'مفت علاج اور ہسپتال کی سہولیات والی اسکیموں کی شناخت کی گئی ہے۔',
    }
  },
  {
    id: 'housing_solar',
    category: 'Housing',
    keywords: [
      // English
      'housing', 'house', 'pucca house', 'home', 'roof', 'solar', 'electricity', 'surya ghar', 'bijli',
      // Telugu
      'ఇల్లు', 'గృహం', 'పక్కా ఇల్లు', 'సూర్య ఘర్', 'సోలార్', 'కరెంట్', 'ఉచిత విద్యుత్', 'ఆవాస్',
      // Hindi
      'आवास', 'मकान', 'घर', 'पक्का घर', 'सोलर', 'छत', 'सूर्य घर', 'बिजली', 'मुफ्त बिजली',
      // Tamil
      'வீடு', 'வீட்டு வசதி', 'சூரிய ஒளி', 'மின்சாரம்', 'பிரதமர் வீடு',
      // Kannada
      'ಮನೆ', 'ವಸತಿ', 'ಪಕ್ಕಾ ಮನೆ', 'ಸೌರಶಕ್ತಿ', 'ವಿದ್ಯುತ್',
      // Malayalam
      'വീട്', 'ഭവനം', 'സോളാർ', 'വൈദ്യുതി',
      // Marathi
      'घर', 'गृहनिर्माण', 'पक्के घर', 'सोलर', 'वीज',
      // Bengali
      'বাড়ি', 'গৃহনির্মাণ', 'পাকা বাড়ি', 'সৌরবিদ্যুৎ', 'বিদ্যুৎ',
      // Gujarati
      'મકાન', 'ઘર', 'આવાસ', 'સોલર', 'વીજળી',
      // Punjabi
      'ਮਕਾਨ', 'ਘਰ', 'ਪੱਕਾ ਮਕਾਨ', 'ਸੋਲਰ', 'ਬਿਜਲੀ',
      // Odia
      'ଘର', 'ପକ୍କା ଘର', 'ଆବାସ', 'ସୌରଶକ୍ତି', 'ବିଜୁଳି',
      // Assamese
      'ঘৰ', 'গৃহ নিৰ্মাণ', 'পকী ঘৰ', 'সৌৰশক্তি', 'বিদ্যুৎ',
      // Urdu
      'گھر', 'مکان', 'رہائش', 'پکا مکان', 'سولر', 'شمسی توانائی', 'بجلی',
    ],
    targetSchemeKeywords: ['pmay', 'surya', 'housing', 'solar', 'awas'],
    explanation: {
      English: 'Identified residential pucca housing grants (PMAY) and PM Surya Ghar rooftop solar subsidies.',
      Hindi: 'पीएम आवास योजना पक्का मकान और पीएम सूर्य घर छत सौर योजनाओं की पहचान की गई।',
      Telugu: 'పీఎం ఆవాస్ యోజన పక్కా ఇళ్ల నిర్మాణం మరియు పీఎం సూర్య ఘర్ సోలార్ రాయితీలు గుర్తించబడ్డాయి.',
      Tamil: 'பிரதமர் வீட்டு வசதி மற்றும் சோலார் மின்சார மானியத் திட்டங்கள் கண்டறியப்பட்டன.',
      Kannada: 'ಪಿಎಂ ಆವಾಸ್ ಪಕ್ಕಾ ಮನೆಗಳು ಮತ್ತು ಸೂರ್ಯ ಘರ್ ಸೌರ ಯೋಜನೆಗಳನ್ನು ಗುರುਤಿಸಲಾಗಿದೆ.',
      Malayalam: 'പിഎംഎവൈ ഭവന പദ്ധതിയും റൂഫ്‌ടോപ്പ് സോളാർ സബ്സിഡിയും കണ്ടെത്തി.',
      Marathi: 'पीएम आवास पक्की घरे आणि रूफटॉप सोलर योजना शोधल्या गेल्या.',
      Bengali: 'পিএম আবাস যোজনা এবং সৌরবিদ্যুৎ প্রকল্প শনাক্ত হয়েছে।',
      Gujarati: 'પીએમ આવાસ અને સોલર યોજનાઓ શોધાઈ.',
      Punjabi: 'ਪੀਐਮ ਆਵਾਸ ਪੱਕੇ ਮਕਾਨ ਅਤੇ ਸੋਲਰ ਸਕੀਮਾਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਗਈ।',
      Odia: 'ପିଏମ ଆବାସ ଏବଂ ସୌର ଯୋଜନା ଚିହ୍ନଟ ହୋଇଛି।',
      Assamese: 'পিএম আৱাস আৰু সৌৰ শক্তি আঁচনি চিনাক্ত কৰা হৈছে।',
      Urdu: 'پی ایم آواس پکے مکانات اور شمسی توانائی کی اسکیموں کی شناخت کی گئی ہے۔',
    }
  },
  {
    id: 'women_child',
    category: 'Women & Child',
    keywords: [
      // English
      'women', 'girl', 'girl child', 'maternity', 'marriage', 'pregnant', 'baby', 'mother', 'female',
      // Telugu
      'మహిళ', 'స్త్రీ', 'ఆడపిల్ల', 'కళ్యాణ లక్ష్మి', 'షాదీ ముబారక్', 'గర్భిణి', 'మాతృత్వ', 'మహిళా పథకాలు',
      // Hindi
      'महिला', 'स्त्री', 'बेटी', 'मातृत्व', 'विवाह', 'गर्भवती', 'लाडली बहना', 'सुकन्या',
      // Tamil
      'பெண்கள்', 'பெண் குழந்தை', 'மகப்பேறு', 'திருமணம்',
      // Kannada
      'ಮಹಿಳೆ', 'ಹೆಣ್ಣು ಮಗು', 'ಮಾತೃತ್ವ', 'ವಿವಾಹ', 'ಭಾಗ್ಯಲಕ್ಷ್ಮಿ',
      // Malayalam
      'വനിത', 'സ്ത്രീ', 'പെൺകുട്ടി', 'പ്രസവം', 'വിവാഹം',
      // Marathi
      'महिला', 'स्त्री', 'मुलगी', 'मातृत्व', 'विवाह', 'लाडकी बहीण',
      // Bengali
      'মহিলা', 'নারী', 'কন্যা', 'মাতৃত্ব', 'বিবাহ', 'কন্যাশ্রী',
      // Gujarati
      'મહિલા', 'સ્ત્રી', 'દીકરી', 'માતૃત્વ', 'લગ્ન', 'વહાલી દીકરી',
      // Punjabi
      'ਔਰਤਾਂ', 'ਧੀ', 'ਮਾਤ੍ਰਤਾ', 'ਵਿਆਹ',
      // Odia
      'ମହିଳା', 'ଝିଅ', 'ମାତୃତ୍ୱ', 'ବିବାହ',
      // Assamese
      'মহিলা', 'নাৰী', 'কন্যা', 'মাতৃত্ব', 'বিবাহ',
      // Urdu
      'خواتین', 'عورت', 'بیٹی', 'زچگی', 'شادی', 'شادی مبارک',
    ],
    targetSchemeKeywords: ['women', 'kalyana', 'ladli', 'sukanya', 'maternity', 'pmmvy'],
    explanation: {
      English: 'Identified women empowerment, girl child support, marriage assistance, and maternity benefits.',
      Hindi: 'महिला सशक्तिकरण, बालिका सहायता, विवाह अनुदान और मातृत्व लाभ योजनाओं की पहचान की गई।',
      Telugu: 'మహిళా సాధికారత, కళ్యాణ లక్ష్మి, ఆడపిల్లల సంరక్షణ మరియు మాతృత్వ సాయం పథకాలు గుర్తించబడ్డాయి.',
      Tamil: 'மகளிர் நலம், பெண் குழந்தைகள் உதவி மற்றும் மகப்பேறு நலத்திட்டங்கள் கண்டறியப்பட்டன.',
      Kannada: 'ಮಹಿಳಾ ಸಬಲೀಕರಣ, ಹೆಣ್ಣು ಮಕ್ಕಳ ನೆರವು ಮತ್ತು ಮಾತೃತ್ವ ಯೋಜನೆಗಳನ್ನು ಗುರುತಿಸಲಾಗಿದೆ.',
      Malayalam: 'വനിതാ ശാക്തീകരണവും പ്രസവാനുകൂല്യ പദ്ധതികളും കണ്ടെത്തി.',
      Marathi: 'महिला सक्षमीकरण, कन्या साहाय्य आणि मातृत्व लाभ योजना शोधल्या गेल्या.',
      Bengali: 'নারী ক্ষমতায়ন, কন্যা সুরক্ষা এবং মাতৃত্বকালীন সুবিধা প্রকল্প শনাক্ত হয়েছে।',
      Gujarati: 'મહિલા સશક્તિકરણ અને કન્યા સહાય યોજનાઓ શોધાઈ.',
      Punjabi: 'ਔਰਤਾਂ ਦੇ ਸਸ਼ਕਤੀਕਰਨ ਅਤੇ ਧੀਆਂ ਦੀ ਭਲਾਈ ਸਕੀਮਾਂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਗਈ।',
      Odia: 'ମହିଳା ସଶକ୍ତୀକରଣ ଏବଂ କନ୍ୟା ସହାୟତା ଯୋଜନା ଚିହ୍ନଟ ହୋଇଛି।',
      Assamese: 'নাৰী সবলীকৰণ আৰু কন্যা সুৰক্ষা আঁচনি চিনাক্ত কৰা হৈছে।',
      Urdu: 'خواتین کو بااختیار بنانے، شادی کی امداد اور زچگی کے فوائد کی اسکیموں کی شناخت کی گئی ہے۔',
    }
  },
  {
    id: 'government_services_docs',
    category: 'Social Welfare',
    keywords: [
      // English
      'certificate', 'income certificate', 'caste certificate', 'ration card', 'voter id', 'pan card', 'epass portal', 'document',
      // Telugu
      'ధ్రువీకరణ పత్రం', 'ఆదాయ ధ్రువీకరణ', 'కుల ధ్రువీకరణ', 'రేషన్ కార్డు', 'ఓటర్ ఐడీ', 'పాన్ కార్డు', 'ఈపాస్ పోర్టల్', 'సర్టిఫికేట్',
      // Hindi
      'प्रमाण पत्र', 'आय प्रमाण पत्र', 'जाति प्रमाण पत्र', 'राशन कार्ड', 'वोटर आईडी', 'पैन कार्ड', 'ईपास पोर्टल', 'दस्तावेज',
      // Tamil
      'சான்றிதழ்', 'வருமானச் சான்றிதழ்', 'சாதிச் சான்றிதழ்', 'ரேஷன் அட்டை',
      // Kannada
      'ಪ್ರಮಾಣಪತ್ರ', 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ', 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ', 'ಪಡಿತರ ಚೀಟಿ',
      // Malayalam
      'സർട്ടിഫിക്കറ്റ്', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'ജാതി സർട്ടിഫിക്കറ്റ്', 'റേഷൻ കാർഡ്',
      // Marathi
      'दाखला', 'उत्पन्नाचा दाखला', 'जातीचा दाखला', 'रेशन कार्ड',
      // Bengali
      'শংসাপত্র', 'আয়ের শংসাপত্র', 'জাতি শংসাপত্র', 'রেশন কার্ড',
      // Gujarati
      'દાખલો', 'આવકનો દાખલો', 'જાતિનો દાખલો', 'રેશન કાર્ડ',
      // Punjabi
      'ਸਰਟੀਫਿਕੇਟ', 'ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ', 'ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ', 'ਰਾਸ਼ਨ ਕਾਰਡ',
      // Odia
      'ପ୍ରମାଣପତ୍ର', 'ଆୟ ପ୍ରମାଣପତ୍ର', 'ଜାତି ପ୍ରମାଣପତ୍ର', 'ରାସନ କାର୍ଡ',
      // Assamese
      'প্ৰমাণপত্ৰ', 'আয়ৰ প্ৰমাণপত্ৰ', 'জাতিৰ প্ৰমাণপত্ৰ', 'ৰেচন কাৰ্ড',
      // Urdu
      'سرٹیفکیٹ', 'آمدنی کا سرٹیفکیٹ', 'ذات کا سرٹیفکیٹ', 'راشن کارڈ', 'شناختی کارڈ',
    ],
    targetSchemeKeywords: ['income', 'caste', 'certificate', 'epass', 'ration', 'document'],
    explanation: {
      English: 'Identified citizen documentation service, certificate issuance, or official portal gateway.',
      Hindi: 'सरकारी दस्तावेज सेवा, प्रमाण पत्र निर्गमन और आधिकारिक पोर्टल की पहचान की गई।',
      Telugu: 'ప్రభుత్వ ధ్రువీకరణ పత్రాల సేవలు, ఆదాయ/కుల సర్టిఫికెట్లు మరియు అధికారిక పోర్టల్ గుర్తించబడింది.',
      Tamil: 'அரசு சான்றிதழ் சேவைகள் மற்றும் அதிகாரப்பூர்வ இணையதளம் கண்டறியப்பட்டன.',
      Kannada: 'ಸರ್ಕಾರಿ ಪ್ರಮಾಣಪತ್ರ ಸೇವೆಗಳು ಮತ್ತು ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಗುರುತಿಸಲಾಗಿದೆ.',
      Malayalam: 'സർക്കാർ സർട്ടിഫിക്കറ്റ് സേവനങ്ങളും ഔദ്യോഗിക പോർട്ടലും കണ്ടെത്തി.',
      Marathi: 'शासकीय दाखले आणि अधिकृत पोर्टल सेवा शोधल्या गेल्या.',
      Bengali: 'সরকারি শংসাপত্র পরিষেবা এবং পোর্টাল শনাক্ত হয়েছে।',
      Gujarati: 'સરકારી દાખલા સેવાઓ અને સત્તાવાર પોર્ટલ શોધાઈ.',
      Punjabi: 'ਸਰਕਾਰੀ ਸਰਟੀਫਿਕੇਟ ਸੇਵਾਵਾਂ ਅਤੇ ਪੋਰਟਲ ਦੀ ਪਛਾਣ ਕੀਤੀ ਗਈ।',
      Odia: 'ସରକାରୀ ପ୍ରମାଣପତ୍ର ସେବା ଏବଂ ପୋର୍ଟାଲ ଚିହ୍ନଟ ହୋଇଛି।',
      Assamese: 'চৰকাৰী প্ৰমাণপত্ৰ সেৱা আৰু পৰ্টেল চিনাক্ত কৰা হৈছে।',
      Urdu: 'سرکاری دستاویزات اور سرٹیفکیٹ کے اجرا کی خدمات کی شناخت کی گئی ہے۔',
    }
  }
];

// Specific Government Portals & Aliases
const PORTAL_ALIASES = [
  {
    keys: ['epass', 'ఈపాస్', 'ईपास', 'scholarship portal', 'e-pass'],
    name: 'Electronic Payment and Application System of Scholarships (ePASS)',
    localName: 'తెలంగాణ / ఆంధ్రప్రదేశ్ ఈపాస్ పోర్టల్',
    url: 'https://telanganaepass.cgg.gov.in',
    description: 'Post-Matric and Pre-Matric Scholarship Gateway for Fee Reimbursement & Hostel Maintenance.'
  },
  {
    keys: ['nsp', 'national scholarship portal', 'scholarships.gov.in'],
    name: 'National Scholarship Portal (NSP)',
    localName: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
    url: 'https://scholarships.gov.in',
    description: 'Central nodal platform for central ministry, UGC, and AICTE merit-cum-means scholarships.'
  },
  {
    keys: ['pmkisan', 'pm-kisan', 'పీఎం కిసాన్', 'पीएम किसान', 'kisan portal'],
    name: 'PM-KISAN Samman Nidhi Portal',
    localName: 'పీఎం కిసాన్ అధికారిక పోర్టల్',
    url: 'https://pmkisan.gov.in',
    description: 'Official direct benefit transfer gateway for quarterly ₹2,000 farmer financial assistance.'
  },
  {
    keys: ['ayushman', 'pmjay', 'setu', 'ఆరోగ్యశ్రీ', 'aarogyasri', 'आयुष्मान'],
    name: 'Ayushman Bharat PM-JAY / NHA Portal',
    localName: 'ఆయుష్మాన్ భారత్ నేషనల్ హెల్త్ అథారిటీ పోర్టల్',
    url: 'https://pmjay.gov.in',
    description: 'Beneficiary verification, hospital empannelment, and e-card creation portal for ₹5 Lakh health cover.'
  }
];

// Detect the predominant script of the input query
export function detectQueryLanguage(query: string, defaultLang: Language): Language {
  const trimmed = query.trim();
  if (!trimmed) return defaultLang;

  // Unicode range checks
  if (/[\u0C00-\u0C7F]/.test(trimmed)) return 'Telugu';
  if (/[\u0B80-\u0BFF]/.test(trimmed)) return 'Tamil';
  if (/[\u0C80-\u0CFF]/.test(trimmed)) return 'Kannada';
  if (/[\u0D00-\u0D7F]/.test(trimmed)) return 'Malayalam';
  if (/[\u0980-\u09FF]/.test(trimmed)) {
    // Bengali or Assamese
    if (/[\u09F0\u09F1]/.test(trimmed)) return 'Assamese';
    return 'Bengali';
  }
  if (/[\u0A80-\u0AFF]/.test(trimmed)) return 'Gujarati';
  if (/[\u0A00-\u0A7F]/.test(trimmed)) return 'Punjabi';
  if (/[\u0B00-\u0B7F]/.test(trimmed)) return 'Odia';
  if (/[\u0600-\u06FF]/.test(trimmed)) return 'Urdu';
  if (/[\u0900-\u097F]/.test(trimmed)) {
    // Could be Hindi or Marathi; default to Hindi unless explicit Marathi words
    if (/(आहे|नाही|करायचे|योजना|माहिती)/.test(trimmed)) return 'Marathi';
    return 'Hindi';
  }

  return defaultLang;
}

// Master multilingual query engine
export function executeMultilingualSearch(
  query: string,
  schemes: Scheme[],
  userLanguage: Language
): MultilingualSearchResult {
  const clean = query.trim().toLowerCase();
  const detectedLang = detectQueryLanguage(query, userLanguage);
  const activeLang = detectedLang !== 'English' ? detectedLang : userLanguage;

  if (!clean) {
    return {
      detectedLanguage: userLanguage,
      normalizedQuery: '',
      matchedSchemes: schemes,
      explanation: userLanguage === 'Telugu' 
        ? 'అన్ని ధ్రువీకరించబడిన ప్రభుత్వ సంక్షేమ పథకాలు చూపబడుతున్నాయి.' 
        : userLanguage === 'Hindi'
        ? 'सभी सत्यापित सरकारी कल्याणकारी योजनाएं दिखाई जा रही हैं।'
        : 'Displaying all verified government welfare programs and services.',
    };
  }

  // 1. Check for specific portal alias
  let matchedPortal: MultilingualSearchResult['matchedPortal'] = undefined;
  for (const portal of PORTAL_ALIASES) {
    if (portal.keys.some(k => clean.includes(k.toLowerCase()))) {
      matchedPortal = portal;
      break;
    }
  }

  // 2. Identify intent
  let matchedIntent: IntentDefinition | undefined = undefined;
  for (const intent of MULTILINGUAL_INTENTS) {
    if (intent.keywords.some(k => clean.includes(k.toLowerCase()))) {
      matchedIntent = intent;
      break;
    }
  }

  // 3. Filter schemes based on matched intent or textual match
  let matchedSchemes: Scheme[] = [];

  if (matchedIntent) {
    // Collect schemes in matching category or matching target keywords
    matchedSchemes = schemes.filter(s => {
      const matchCat = s.category.toLowerCase() === matchedIntent!.category.toLowerCase();
      const matchKeywords = matchedIntent!.targetSchemeKeywords.some(tk => 
        s.id.toLowerCase().includes(tk) ||
        s.name.toLowerCase().includes(tk) ||
        (s.keywords || []).some(t => t.toLowerCase().includes(tk))
      );
      return matchCat || matchKeywords;
    });
  }

  // Fallback / secondary pass: text search across titles, descriptions, keywords, and state
  if (matchedSchemes.length === 0) {
    const tokens = clean.split(/\s+/).filter(t => t.length > 2);
    matchedSchemes = schemes.filter(s => {
      const text = `${s.name} ${s.shortDescription} ${s.department} ${s.state} ${(s.keywords || []).join(' ')}`.toLowerCase();
      return tokens.some(tok => text.includes(tok));
    });
  }

  // Fallback to top schemes if still zero
  if (matchedSchemes.length === 0) {
    matchedSchemes = schemes.slice(0, 4);
  }

  // Construct localized explanation
  let explanation = '';
  if (matchedIntent) {
    explanation = matchedIntent.explanation[activeLang] || matchedIntent.explanation['English'];
  } else if (matchedPortal) {
    explanation = activeLang === 'Telugu'
      ? `"${matchedPortal.name}" పోర్టల్ మరియు సంబంధిత పథకాలు గుర్తించబడ్డాయి.`
      : activeLang === 'Hindi'
      ? `"${matchedPortal.name}" पोर्टल और संबंधित योजनाएं खोजी गईं।`
      : `Identified official portal gateway: "${matchedPortal.name}".`;
  } else {
    explanation = activeLang === 'Telugu'
      ? `మీ వెతుకులాటకు సరిపోలే ధ్రువీకరించబడిన ప్రభుత్వ పథకాలు లభించాయి.`
      : activeLang === 'Hindi'
      ? `आपकी खोज से संबंधित सत्यापित सरकारी योजनाएं मिलीं।`
      : `Found verified government schemes matching your search.`;
  }

  return {
    detectedLanguage: detectedLang,
    normalizedQuery: clean,
    matchedIntent: matchedIntent?.id,
    matchedCategory: matchedIntent?.category,
    matchedSchemes,
    explanation,
    matchedPortal,
    suggestedTerms: matchedIntent?.keywords.slice(0, 4),
  };
}
