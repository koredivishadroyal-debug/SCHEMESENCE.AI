import { Scheme, Language, RequiredDocument, ApplicationStep, RuleEvaluationResult } from '../types';
import { getTranslation } from './translations';

// Common document name translations across Indian languages
export const DOCUMENT_NAMES: Record<string, Partial<Record<Language, string>>> = {
  'Aadhaar Card': {
    Hindi: 'आधार कार्ड',
    Telugu: 'ఆధార్ కార్డు',
    Tamil: 'ஆதார் அட்டை',
    Kannada: 'ಆಧಾರ್ ಕಾರ್ಡ್',
    Malayalam: 'ആധാർ കാർഡ്',
    Marathi: 'आधार कार्ड',
    Bengali: 'আধার কার্ড',
    Gujarati: 'આધાર કાર્ડ',
    Punjabi: 'ਆਧਾਰ ਕਾਰਡ',
    Odia: 'ଆଧାର କାର୍ଡ',
    Assamese: 'আধাৰ কাৰ্ড',
    Urdu: 'آدھار کارڈ',
  },
  'Ration Card (BPL / Antyodaya / Food Security Card)': {
    Hindi: 'राशन कार्ड (बीपीएल / अंत्योदय / खाद्य सुरक्षा कार्ड)',
    Telugu: 'రేషన్ కార్డు (బీపీఎల్ / అంత్యోదయ / ఆహార భద్రత కార్డు)',
    Tamil: 'குடும்ப அட்டை (வறுமைக் கோட்டிற்கு கீழ் / உணவுப் பாதுகாப்பு அட்டை)',
    Kannada: 'ಪಡಿತರ ಚೀಟಿ (ಬಿಪಿಎಲ್ / ಅಂತ್ಯೋದಯ / ಆಹಾರ ಭದ್ರತೆ)',
    Malayalam: 'റേഷൻ കാർഡ് (ബിപിഎൽ / ഭക്ഷ്യ സുരക്ഷ കാർഡ്)',
    Marathi: 'रेशन कार्ड (दारिद्र्यरेषेखालील / अन्न सुरक्षा कार्ड)',
    Bengali: 'রেশন কার্ড (বিপিএল / খাদ্য সুরক্ষা কার্ড)',
    Gujarati: 'રેશન કાર્ડ (બીપીએલ / અન્ન સુરક્ષા કાર્ડ)',
    Punjabi: 'ਰਾਸ਼ਨ ਕਾਰਡ (ਬੀਪੀਐਲ / ਅੰਤੋਦਿਆ / ਖੁਰਾਕ ਸੁਰੱਖਿਆ)',
    Odia: 'ରାସନ କାର୍ଡ (ବିପିଏଲ / ଅନ୍ତ୍ୟୋଦୟ)',
    Assamese: 'ৰেচন কাৰ্ড (বিপিএল / খাদ্য সুৰক্ষা)',
    Urdu: 'راشن کارڈ (بی پی ایل / فوڈ سیکیورٹی کارڈ)',
  },
  'Active Bank Passbook seeded with NPCI / Aadhaar': {
    Hindi: 'बैंक पासबुक (एनपीसीआई / आधार से लिंक)',
    Telugu: 'బ్యాంక్ పాస్‌బుక్ (ఎన్‌పీసీఐ / ఆధార్ అనుసంధానం)',
    Tamil: 'வங்கி கணக்கு புத்தகம் (ஆதார் இணைக்கப்பட்டது)',
    Kannada: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ಆಧಾರ್ ಲಿಂಕ್)',
    Malayalam: 'ബാങ്ക് പാസ്ബുക്ക് (ആധാർ ലിങ്ക്ഡ്)',
    Marathi: 'बँक पासबुक (आधार जोडलेले)',
    Bengali: 'ব্যাঙ্ক পাসবই (আধার যুক্ত)',
    Gujarati: 'બેંક પાસબુક (આધાર લિંક્ડ)',
    Punjabi: 'ਬੈਂਕ ਪਾਸਬੁੱਕ (ਆਧਾਰ ਲਿੰਕ)',
    Odia: 'ବ୍ୟାଙ୍କ ପାସବହି (ଆଧାର ଲିଙ୍କ)',
    Assamese: 'বেংক পাছবুক (আধাৰ লিংক)',
    Urdu: 'بینک پاس بک (آدھار لنک)',
  },
  'Income Certificate': {
    Hindi: 'आय प्रमाण पत्र',
    Telugu: 'ఆదాయ ధ్రువీకరణ పత్రం',
    Tamil: 'வருமானச் சான்றிதழ்',
    Kannada: 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ',
    Malayalam: 'വരുമാന സർട്ടിഫിക്കറ്റ്',
    Marathi: 'उत्पन्नाचा दाखला',
    Bengali: 'আয়ের শংসাপত্র',
    Gujarati: 'આવકનો દાખલો',
    Punjabi: 'ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ',
    Odia: 'ଆୟ ପ୍ରମାଣପତ୍ର',
    Assamese: 'আয়ৰ প্ৰমাণপত্ৰ',
    Urdu: 'آمدنی کا سرٹیفکیٹ',
  },
  'Caste / Community Certificate': {
    Hindi: 'जाति प्रमाण पत्र',
    Telugu: 'కుల ధ్రువీకరణ పత్రం',
    Tamil: 'சாதிச் சான்றிதழ்',
    Kannada: 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ',
    Malayalam: 'ജാതി സർട്ടിഫിക്കറ്റ്',
    Marathi: 'जातीचा दाखला',
    Bengali: 'জাতি শংসাপত্র',
    Gujarati: 'જાતિનો દાખલો',
    Punjabi: 'ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ',
    Odia: 'ଜାତି ପ୍ରମାଣପତ୍ର',
    Assamese: 'জাতিৰ প্ৰমাণপত্ৰ',
    Urdu: 'ذات کا سرٹیفکیٹ',
  },
  'Land Ownership Document / Patta Passbook / RoR (Record of Rights)': {
    Hindi: 'भूमि स्वामित्व दस्तावेज / पट्टा पासबुक / खतौनी',
    Telugu: 'పట్టాదారు పాస్ పుస్తకం / భూమి యాజమాన్య పత్రం (RoR 1B)',
    Tamil: 'நில உரிமை ஆவணம் / பட்டா புத்தகம்',
    Kannada: 'ಭೂಮಿ ಮಾಲೀಕತ್ವದ ದಾಖಲೆ / ಪಟ್ಟಾ ಪಾಸ್‌ಬುಕ್',
    Malayalam: 'ഭൂ ഉടമസ്ഥാവകാശ രേഖ / പട്ടയം',
    Marathi: 'जमीन मालकी हक्क दस्तऐवज / सातबारा / पट्टा',
    Bengali: 'জমির পাট্টা / খতিয়ান',
    Gujarati: 'જમીન માલિકી દસ્તાવેજ / ૭/૧૨ નો ઉતારો',
    Punjabi: 'ਜਮੀਨ ਮਾਲਕੀ ਰਿਕਾਰਡ / ਪੱਟਾ',
    Odia: 'ଜମି ପଟ୍ଟା / ଅଧିକାର ଅଭିଲେଖ (RoR)',
    Assamese: 'মাটিৰ পট্টা / জমিন নথি',
    Urdu: 'زمین کی ملکیت کا دستاویز / پٹہ',
  },
  'Domicile / Residence Certificate': {
    Hindi: 'मूल निवास / अधिवास प्रमाण पत्र',
    Telugu: 'స్థానిక నివాస ధ్రువీకరణ పత్రం (Domicile)',
    Tamil: 'இருப்பிடச் சான்றிதழ்',
    Kannada: 'ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ',
    Malayalam: 'താമസ സർട്ടിഫിക്കറ്റ്',
    Marathi: 'अधिवास दाखला / रहिवासी दाखला',
    Bengali: 'স্থায়ী বাসিন্দা শংসাপত্র',
    Gujarati: 'રહેઠાણનો દાખલો',
    Punjabi: 'ਰਿਹਾਇਸ਼ ਸਰਟੀਫਿਕੇਟ',
    Odia: 'ବାସସ୍ଥାନ ପ୍ରମାଣପତ୍ର',
    Urdu: 'رہائشی سرٹیفکیٹ',
  },
  'Electricity Bill / Consumer Connection Number': {
    Hindi: 'नवीनतम बिजली बिल / उपभोक्ता संख्या',
    Telugu: 'తాజా విద్యుత్ బిల్లు / కన్స్యూమర్ సర్వీస్ నంబర్',
    Tamil: 'மின் கட்டண ரசீது / இணைப்பு எண்',
    Kannada: 'ವಿದ್ಯುತ್ ಬಿಲ್ / ಗ್ರಾಹಕ ಸಂಖ್ಯೆ',
    Malayalam: 'വൈദ്യുതി ബിൽ / ഉപഭോക്തൃ നമ്പർ',
    Marathi: 'विज बिल / ग्राहक क्रमांक',
    Bengali: 'বিদ্যুৎ বিল / উপভোক্তা নম্বর',
    Gujarati: 'વીજળી બિલ / ગ્રાહક નંબર',
    Punjabi: 'ਬਿਜਲੀ ਦਾ ਬਿੱਲ / ਖਪਤਕਾਰ ਨੰਬਰ',
    Urdu: 'بجلی کا بل / کنزیومر نمبر',
  },
  'Business Registration Certificate / Trade License / Udyam': {
    Hindi: 'उद्यम आधार / व्यापार पंजीकरण प्रमाण पत्र',
    Telugu: 'ఉద్యమ్ రిజిస్ట్రేషన్ / వ్యాపార లైసెన్స్ పత్రం',
    Tamil: 'உத்யம் பதிவு / வணிக உரிமச் சான்றிதழ்',
    Kannada: 'ಉದ್ಯಮ್ ನೋಂದಣಿ / ವ್ಯಾಪಾರ ಪರವಾನಗಿ',
    Malayalam: 'ഉദ്യം രജിസ്ട്രേഷൻ / ട്രേഡ് ലൈസൻസ്',
    Marathi: 'उद्यम नोंदणी / व्यापार परवाना',
    Bengali: 'উদ্যম রেজিস্ট্রেশন / ট্রেড লাইসেন্স',
    Gujarati: 'ઉદ્યમ રજીસ્ટ્રેશન / વેપાર લાયસન્સ',
    Urdu: 'ادیم رجسٹریشن / تجارتی لائسنس',
  },
  'Disability Certificate / UDID Card (Minimum 40% Disability)': {
    Hindi: 'दिव्यांगता प्रमाण पत्र / यूडीआईडी कार्ड (न्यूनतम 40%)',
    Telugu: 'దివ్యాంగుల ధ్రువీకరణ పత్రం / సదరం / యూడీఐడీ కార్డు (కనీసం 40%)',
    Tamil: 'மாற்றுத்திறனாளி சான்றிதழ் / UDID அட்டை (குறைந்தது 40%)',
    Kannada: 'ಅಂಗವೈಕಲ್ಯ ಪ್ರಮಾಣಪತ್ರ / UDID ಕಾರ್ಡ್',
    Malayalam: 'ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് / UDID കാർഡ്',
    Marathi: 'दिव्यांग प्रमाणपत्र / युडीआयडी कार्ड',
    Bengali: 'প্রতিবন্ধী শংসাপত্র / UDID কার্ড',
    Gujarati: 'દિવ્યાંગતા પ્રમાણપત્ર / UDID કાર્ડ',
    Urdu: 'معذوری سرٹیفکیٹ / یو ڈی آئی ڈی کارڈ',
  },
  'School / College Bonafide Certificate & Fee Receipt': {
    Hindi: 'बोनाफाइड प्रमाण पत्र एवं वर्तमान सत्र की फीस रसीद',
    Telugu: 'బోనఫైడ్ సర్టిఫికెట్ మరియు ప్రస్తుత ఫీజు రసీదు',
    Tamil: 'கல்லூரி போனாஃபைட் சான்றிதழ் & கல்விக் கட்டண ரசீது',
    Kannada: 'ಬೋನಫೈಡ್ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಶುಲ್ಕ ರಸೀದಿ',
    Malayalam: 'ബോണഫൈഡ് സർട്ടിഫിക്കറ്റും ഫീസ് രസീതും',
    Marathi: 'बोनाफाईड प्रमाणपत्र व फी पावती',
    Bengali: 'বোনাফাইড শংসাপত্র এবং ফি রসিদ',
    Gujarati: 'બોનાફાઇડ સર્ટિફિકેટ અને ફી રસીદ',
    Urdu: 'بونافائیڈ سرٹیفکیٹ اور فیس کی رسید',
  }
};

// Scheme Plain Summaries & Descriptions in Regional Languages
export const SCHEME_TRANSLATIONS: Record<string, Partial<Record<Language, {
  name?: string;
  plainSummary?: string;
  mainBenefit?: string;
  targetBeneficiary?: string;
}>>> = {
  'pm-kisan': {
    Hindi: {
      name: 'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)',
      plainSummary: 'यदि आपके परिवार के पास कृषि योग्य भूमि है और आप किसान के रूप में पंजीकृत हैं, तो केंद्र सरकार बीज, खाद और खेती के खर्चों के लिए हर 4 महीने में ₹2,000 (सालाना ₹6,000) सीधे आपके बैंक खाते में जमा करती है।',
      mainBenefit: '₹6,000 / वर्ष (3 किश्तों में प्रत्यक्ष बैंक खाता अंतरण)',
      targetBeneficiary: 'कृषि भूमिधारक किसान परिवार'
    },
    Telugu: {
      name: 'పీఎం కిసాన్ సమ్మాన్ నిధి యోజన (PM-KISAN)',
      plainSummary: 'మీ కుటుంబానికి సాగుభూమి ఉండి, రైతుగా నమోదై ఉంటే, విత్తనాలు, ఎరువులు మరియు వ్యవసాయ ఖర్చుల కోసం కేంద్ర ప్రభుత్వం ప్రతి 4 నెలలకు ₹2,000 (ఏడాదికి మొత్తం ₹6,000) నేరుగా మీ బ్యాంక్ ఖాతాలో జమ చేస్తుంది.',
      mainBenefit: '₹6,000 / ఏడాది (3 విడతల్లో నేరుగా బ్యాంక్ ఖాతాలో నగదు)',
      targetBeneficiary: 'సాగుభూమి కలిగిన రైతు కుటుంబాలు'
    },
    Tamil: {
      name: 'பிரதமர் கிசான் சம்மான் நிதி திட்டம் (PM-KISAN)',
      plainSummary: 'உங்கள் குடும்பத்திற்கு விவசாய நிலம் இருந்து நீங்கள் விவசாயியாகப் பதிவு செய்திருந்தால், மத்திய அரசு ஆண்டுக்கு ₹6,000 (ஒவ்வொரு 4 மாதங்களுக்கும் ₹2,000) நேரடியாக உங்கள் வங்கிக் கணக்கில் செலுத்துகிறது.',
      mainBenefit: '₹6,000 / ஆண்டு (நேரடி வங்கிக் கணக்கு பரிமாற்றம்)',
      targetBeneficiary: 'விவசாய நிலம் உள்ள விவசாயிகள்'
    },
    Kannada: {
      name: 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ ಯೋಜನೆ (PM-KISAN)',
      plainSummary: 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಕೃಷಿ ಭೂಮಿ ಇದ್ದು ರೈತರಾಗಿ ನೋಂದಾಯಿಸಿಕೊಂಡಿದ್ದರೆ, ಕೇಂದ್ರ ಸರ್ಕಾರವು ಬಿತ್ತನೆ ಬೀಜ, ಗೊಬ್ಬರಕ್ಕೆ ಪ್ರತಿ 4 ತಿಂಗಳಿಗೆ ₹2,000 (ವರ್ಷಕ್ಕೆ ₹6,000) ನೇರವಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಜಮೆ ಮಾಡುತ್ತದೆ.',
      mainBenefit: '₹6,000 / ವರ್ಷ (ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ)',
      targetBeneficiary: 'ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳು'
    },
    Malayalam: {
      name: 'പിഎം കിസാൻ സമ്മാൻ നിധി യോജന (PM-KISAN)',
      plainSummary: 'കൃഷിഭൂമിയുള്ള കർഷക കുടുംബങ്ങൾക്ക് വിത്തും വളവും വാങ്ങാൻ വർഷത്തിൽ 6,000 രൂപ മൂന്ന് ഗഡുക്കളായി കേന്ദ്ര സർക്കാർ നേരിട്ട് അക്കൗണ്ടിൽ നൽകുന്നു.',
      mainBenefit: '₹6,000 / വർഷം (നേരിട്ടുള്ള ബാങ്ക് കൈമാറ്റം)',
      targetBeneficiary: 'കൃഷിഭൂമിയുള്ള കർഷകർ'
    },
    Marathi: {
      name: 'प्रधानमंत्री किसान सन्मान निधी योजना (PM-KISAN)',
      plainSummary: 'शेतकरी कुटुंबांना शेतीच्या खर्चासाठी केंद्र सरकारकडून दर चार महिन्यांनी ₹२,००० (वर्षाला एकूण ₹६,०००) थेट बँक खात्यात दिले जातात.',
      mainBenefit: '₹६,००० / वर्ष (३ हप्त्यांमध्ये बँक खात्यात थेट जमा)',
      targetBeneficiary: 'जमीनधारक शेतकरी कुटुंबे'
    },
    Bengali: {
      name: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি যোজনা (PM-KISAN)',
      plainSummary: 'চাষযোগ্য জমির অধিকারী কৃষক পরিবারগুলিকে বছরে ₹৬,০০০ (প্রতি ৪ মাসে ₹২,০০০) সরাসরি ব্যাঙ্ক অ্যাকাউন্টে আর্থিক সহায়তা দেওয়া হয়।',
      mainBenefit: '₹৬,০০০ / বছর (সরাসরি ব্যাঙ্ক ট্র্যান্সফার)',
      targetBeneficiary: 'কৃষিজমির মালিক কৃষক পরিবার'
    }
  },
  'ayushman-bharat': {
    Hindi: {
      name: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
      plainSummary: 'आपके पूरे परिवार के लिए 27,000 से अधिक सरकारी और निजी अस्पतालों में सर्जरी, उपचार, जांच और दवाओं के लिए प्रति वर्ष ₹5 लाख तक का पूर्णतः निःशुल्क और कैशलेस इलाज प्रदान करता है।',
      mainBenefit: '₹5,00,000 / वर्ष प्रति परिवार कैशलेस स्वास्थ्य बीमा',
      targetBeneficiary: 'आर्थिक रूप से कमजोर एवं 70+ वरिष्ठ नागरिक'
    },
    Telugu: {
      name: 'ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన (PM-JAY)',
      plainSummary: 'దేశవ్యాప్తంగా 27,000కు పైగా ప్రభుత్వ మరియు ప్రైవేట్ నెట్‌వర్క్ ఆసుపత్రులలో శస్త్రచికిత్సలు, చికిత్సలు, పరీక్షలు మరియు మందుల కోసం మీ కుటుంబం మొత్తానికి సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత నగదు రహిత వైద్య చికిత్సను అందిస్తుంది.',
      mainBenefit: '₹5,00,000 / ఏడాది కుటుంబానికి ఉచిత నగదు రహిత చికిత్స',
      targetBeneficiary: 'పేద కుటుంబాలు మరియు 70 ఏళ్లు పైబడిన వృద్ధులు'
    },
    Tamil: {
      name: 'ஆயுஷ்மான் பாரத் - பிரதம மந்திரி ஜன் ஆரோக்கிய திட்டம்',
      plainSummary: 'நாடு முழுவதும் உள்ள 27,000+ அரசு மற்றும் தனியார் மருத்துவமனைகளில் உங்கள் குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை இலவச பணமில்லா மருத்துவ சிகிச்சை வழங்குகிறது.',
      mainBenefit: '₹5,00,000 / ஆண்டு குடும்பத்திற்கு பணமில்லா மருத்துவக் காப்பீடு',
      targetBeneficiary: 'பொருளாதாரத்தில் பின்தங்கிய குடும்பங்கள்'
    },
    Kannada: {
      name: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ',
      plainSummary: 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ 27,000+ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ವರ್ಷಕ್ಕೆ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ನಗದು ರಹಿತ ಚಿಕಿತ್ಸೆ ನೀಡಲಾಗುತ್ತದೆ.',
      mainBenefit: '₹5,00,000 / ವರ್ಷ ಕುಟುಂಬಕ್ಕೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ',
      targetBeneficiary: 'ಬಡ ಕುಟುಂಬಗಳು ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರು'
    },
    Marathi: {
      name: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
      plainSummary: 'कुटुंबासाठी देशभरातील २७,०००+ रुग्णालयांमध्ये दरवर्षी ₹५ लाखांपर्यंत मोफत आणि कॅशलेस उपचार मिळतात.',
      mainBenefit: '₹५,००,००० / वर्ष मोफत आरोग्य विमा',
      targetBeneficiary: 'पात्र कुटुंबे व ज्येष्ठ नागरिक'
    }
  },
  'post-matric-scholarship': {
    Hindi: {
      name: 'पोस्ट-मैट्रिक छात्रवृत्ति योजना (Post-Matric Scholarship)',
      plainSummary: 'यदि आप 10वीं के बाद (इंटर, डिप्लोमा, डिग्री, इंजीनियरिंग, मेडिकल या पीजी) की पढ़ाई कर रहे हैं और परिवार की आय ₹2.5 लाख से कम है, तो सरकार आपकी कॉलेज फीस भरती है और मासिक भत्ता देती है।',
      mainBenefit: '100% ट्यूशन फीस प्रतिपूर्ति + ₹13,500/वर्ष तक भत्ता',
      targetBeneficiary: '11वीं से पीएचडी तक के पात्र विद्यार्थी'
    },
    Telugu: {
      name: 'పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ పథకం (Post-Matric Scholarship)',
      plainSummary: 'మీరు 10వ తరగతి తర్వాత (ఇంటర్, డిప్లొమా, డిగ్రీ, ఇంజనీరింగ్, మెడిసిన్ లేదా పీజీ) చదువుతుంటే మరియు కుటుంబ ఆదాయం ₹2.5 లక్షల లోపు ఉంటే, ప్రభుత్వం మీ కాలేజీ ఫీజులను చెల్లిస్తుంది మరియు నెలవారీ ఉపకార వేతనం ఇస్తుంది.',
      mainBenefit: 'పూర్తి ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + నెలకు నిర్వహణ భత్యం',
      targetBeneficiary: 'ఇంటర్ నుండి పీహెచ్‌డీ చదువుతున్న విద్యార్థులు'
    },
    Tamil: {
      name: 'பத்தாம் வகுப்புக்கு பிந்தைய கல்வி உதவித்தொகை திட்டம்',
      plainSummary: '10ஆம் வகுப்புக்கு பிறகு படிக்கும் மாணவர்களுக்கு (டிப்ளமோ, பட்டப்படிப்பு, பொறியியல்) முழுக் கல்விக் கட்டண தள்ளுபடி மற்றும் மாதாந்திர உதவித்தொகை வழங்கப்படுகிறது.',
      mainBenefit: '100% கல்விக் கட்டண திருப்பிச் செலுத்துதல் + உதவித்தொகை',
      targetBeneficiary: 'உயர்கல்வி பயிலும் மாணவர்கள்'
    },
    Kannada: {
      name: 'ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ',
      plainSummary: '೧೦ನೇ ತರಗತಿಯ ನಂತರದ ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಪೂರ್ಣ ಕಾಲೇಜು ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ಮಾಸಿಕ ನಿರ್ವಹಣಾ ಭತ್ಯೆ ನೀಡಲಾಗುತ್ತದೆ.',
      mainBenefit: '೧೦೦% ಶುಲ್ಕ ಮರುಪಾವತಿ + ಮಾಸಿಕ ಭತ್ಯೆ',
      targetBeneficiary: 'ಕಾಲೇಜು ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿಗಳು'
    }
  },
  'telangana-rythu-bharosa': {
    Hindi: {
      name: 'तेलंगाना रैतु भरोसा निवेश सहायता योजना',
      plainSummary: 'तेलंगाना के भूमिधारक किसानों और वास्तविक काश्तकारों को फसल के मौसम में प्रति एकड़ ₹15,000 की वार्षिक सहायता सीधे बैंक खाते में दी जाती है।',
      mainBenefit: '₹15,000 / एकड़ / वर्ष (दो फसल सत्रों में बैंक अंतरण)',
      targetBeneficiary: 'तेलंगाना के किसान एवं पट्टाधारक'
    },
    Telugu: {
      name: 'తెలంగాణ రైతు భరోసా పెట్టుబడి సహాయ పథకం',
      plainSummary: 'తెలంగాణలోని పట్టాదారు రైతులకు మరియు కౌలు రైతులకు పంటల సాగు ఖర్చుల కోసం ఎకరాకు ఏడాదికి ₹15,000 పెట్టుబడి సహాయాన్ని (వానకాలం మరియు యాసంగి విడతల్లో) నేరుగా బ్యాంక్ ఖాతాలో జమ చేస్తారు.',
      mainBenefit: 'ఎకరాకు ₹15,000 / ఏడాది (రెండు విడతల్లో పెట్టుబడి సాయం)',
      targetBeneficiary: 'తెలంగాణ రైతులు & పట్టాదారులు'
    }
  },
  'pm-surya-ghar': {
    Hindi: {
      name: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
      plainSummary: 'अपने घर की छत पर सोलर पैनल लगवाने पर सरकार की ओर से ₹78,000 तक की सीधी सब्सिडी और हर महीने 300 यूनिट तक मुफ्त बिजली का लाभ।',
      mainBenefit: '₹78,000 तक सीधी सब्सिडी + 300 यूनिट मासिक मुफ्त बिजली',
      targetBeneficiary: 'आवासीय छत वाले घरेलू उपभोक्ता'
    },
    Telugu: {
      name: 'పీఎం సూర్య ఘర్: ఉచిత విద్యుత్ యోజన',
      plainSummary: 'మీ ఇంటి పైకప్పుపై సోలార్ ప్యానెళ్లు అమర్చుకుంటే కేంద్ర ప్రభుత్వం నుండి ₹78,000 వరకు నేరుగా సబ్సిడీ మరియు ప్రతి నెలా 300 యూనిట్ల వరకు ఉచిత విద్యుత్ లభిస్తుంది.',
      mainBenefit: '₹78,000 వరకు నేరుగా సబ్సిడీ + నెలకు 300 యూనిట్ల ఉచిత కరెంట్',
      targetBeneficiary: 'సొంత ఇల్లు / పైకప్పు ఉన్న గృహ విద్యుత్ వినియోగదారులు'
    },
    Tamil: {
      name: 'பிஎம் சூர்ய கர்: இலவச மின்சாரத் திட்டம்',
      plainSummary: 'வீட்டு கூரையில் சோலார் பேனல் அமைப்பதற்கு ₹78,000 வரை அரசு மானியம் மற்றும் மாதம் 300 யூனிட் வரை இலவச மின்சாரம்.',
      mainBenefit: '₹78,000 மானியம் + மாதம் 300 யூனிட் இலவச மின்சாரம்',
      targetBeneficiary: 'வீட்டு உரிமையாளர்கள்'
    }
  },
  'mudra-yojana': {
    Hindi: {
      name: 'प्रधानमंत्री मुद्रा योजना (PMMY) - सूक्ष्म व्यापार ऋण',
      plainSummary: 'छोटा व्यवसाय, दुकान, सेवा केंद्र या विनिर्माण इकाई शुरू करने या बढ़ाने के लिए बिना किसी बैंक गारंटी (कोलेटरल) के ₹20 लाख तक का सस्ता व्यापार ऋण।',
      mainBenefit: 'बिना गारंटी ₹50,000 से ₹20 लाख तक व्यापार ऋण',
      targetBeneficiary: 'छोटे व्यापारी, दुकानदार और उद्यमी'
    },
    Telugu: {
      name: 'ప్రధాన మంత్రి ముద్రా యోజన (PMMY) - వ్యాపార రుణాలు',
      plainSummary: 'చిన్న వ్యాపారం, దుకాణం, సర్వీస్ సెంటర్ లేదా తయారీ యూనిట్ ప్రారంభించడానికి లేదా విస్తరించడానికి ఎటువంటి తనఖా (కొలేటరల్) లేకుండా ₹20 లక్షల వరకు తక్కువ వడ్డీ వ్యాపార రుణం.',
      mainBenefit: 'ఎటువంటి గ్యారెంటీ లేకుండా ₹50,000 నుండి ₹20 లక్షల వరకు వ్యాపార రుణం',
      targetBeneficiary: 'చిరు వ్యాపారులు, దుకాణదారులు మరియు మహిళా పారిశ్రామికవేత్తలు'
    },
    Tamil: {
      name: 'பிரதமர் முத்ரா திட்டம் (PMMY) - வணிகக் கடன்',
      plainSummary: 'சொத்து அடமானம் ஏதுமின்றி சிறு தொழில் மற்றும் கடைகளுக்கு ₹20 லட்சம் வரை குறைந்த வட்டி கடன் உதவி.',
      mainBenefit: 'பிணையமில்லா வணிகக் கடன் ₹20 லட்சம் வரை',
      targetBeneficiary: 'சிறு வியாபாரிகள் மற்றும் தொழில்முனைவோர்'
    }
  },
  'pm-svanidhi': {
    Hindi: {
      name: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (PM SVANidhi)',
      plainSummary: 'सड़क किनारे दुकान लगाने वाले रेहड़ी-पटरी वालों को बिना गारंटी ₹10,000 से ₹50,000 तक का कार्यशील पूंजी ऋण एवं डिजिटल कैशबैक।',
      mainBenefit: 'बिना गारंटी ₹10,000 - ₹50,000 तक सस्ता व्यापार ऋण',
      targetBeneficiary: 'स्ट्रीट वेंडर्स, ठेले वाले व फेरीवाले'
    },
    Telugu: {
      name: 'పీఎం స్వనిధి (PM SVANidhi) - చిరు వ్యాపారుల రుణం',
      plainSummary: 'వీధి వ్యాపారులు మరియు తోపుడు బండ్ల వారికి ఎలాంటి పూచీకత్తు లేకుండా ₹10,000 నుండి ₹50,000 వరకు తక్కువ వడ్డీ రుణం మరియు డిజిటల్ క్యాష్‌బ్యాక్ లభిస్తుంది.',
      mainBenefit: 'పూచీకత్తు లేకుండా ₹10,000 - ₹50,000 వరకు వ్యాపార రుణం',
      targetBeneficiary: 'వీధి వ్యాపారులు, తోపుడు బండ్ల వ్యాపారులు'
    }
  },
  'pm-ujjwala': {
    Hindi: {
      name: 'प्रधानमंत्री उज्ज्वला योजना (PMUY 2.0)',
      plainSummary: 'गरीब ग्रामीण परिवारों की महिलाओं को निःशुल्क एलपीजी गैस कनेक्शन, पहला भरा हुआ सिलेंडर और गैस चूल्हा बिल्कुल मुफ्त प्रदान किया जाता है।',
      mainBenefit: 'मुफ्त एलपीजी गैस कनेक्शन + पहला सिलेंडर व चूल्हा मुफ्त',
      targetBeneficiary: 'बीपीएल परिवार की वयस्क महिलाएं'
    },
    Telugu: {
      name: 'ప్రధాన మంత్రి ఉజ్జ్వల యోజన (PMUY 2.0)',
      plainSummary: 'నిరుపేద కుటుంబాల్లోని మహిళలకు ఉచిత ఎల్‌పీజీ గ్యాస్ కనెక్షన్, మొదటి గ్యాస్ సిలిండర్ మరియు ఉచిత స్టౌ అందిస్తారు.',
      mainBenefit: 'ఉచిత గ్యాస్ కనెక్షన్ + మొదటి సిలిండర్ & స్టౌ ఉచితం',
      targetBeneficiary: 'బీపీఎల్ కుటుంబాలకు చెందిన మహిళలు'
    }
  }
};

/**
 * Returns a localized version of a Scheme object adapting its name, benefit,
 * summary, document checklist, and application steps according to the selected language.
 */
export function getLocalizedScheme(scheme: Scheme, language: Language): Scheme {
  if (language === 'English') return scheme;

  const langKey = language.toLowerCase();
  const directNativeName = (scheme.nativeNames as Record<string, string> | undefined)?.[langKey];
  const customData = SCHEME_TRANSLATIONS[scheme.id]?.[language];

  const localizedName = directNativeName || customData?.name || scheme.name;
  const localizedSummary = customData?.plainSummary || scheme.plainSummary;
  const localizedBenefit = customData?.mainBenefit || scheme.mainBenefit;
  const localizedBeneficiary = customData?.targetBeneficiary || scheme.targetBeneficiary || (scheme as any).targetBeneficiaries;

  // Localize documents if standard
  const localizedDocuments: RequiredDocument[] = scheme.requiredDocuments.map((doc) => {
    const docTranslation = DOCUMENT_NAMES[doc.name]?.[language];
    return {
      ...doc,
      name: docTranslation || doc.name,
      whyNeeded: getLocalizedDocReason(doc.whyNeeded, language),
      howToObtain: getLocalizedDocHowTo(doc.howToObtain, language),
    };
  });

  // Localize steps
  const localizedSteps: ApplicationStep[] = scheme.applicationSteps.map((step) => {
    return {
      ...step,
      title: getLocalizedStepTitle(step.title, language),
      description: getLocalizedStepDesc(step.description, language),
    };
  });

  // Localize custom conditions
  const localizedConditions = (scheme.eligibilityRules.customConditions || []).map((cond) => {
    return getLocalizedCondition(cond, language);
  });

  return {
    ...scheme,
    name: localizedName,
    plainSummary: localizedSummary,
    mainBenefit: localizedBenefit,
    targetBeneficiary: localizedBeneficiary,
    requiredDocuments: localizedDocuments,
    applicationSteps: localizedSteps,
    eligibilityRules: {
      ...scheme.eligibilityRules,
      customConditions: localizedConditions,
    }
  };
}

/**
 * Localizes document reason explanation
 */
export function getLocalizedDocReason(reason: string, language: Language): string {
  if (language === 'Telugu') {
    if (reason.includes('biometric verification') || reason.includes('DBT')) return 'బయోమెట్రిక్ ధ్రువీకరణ మరియు నేరుగా బ్యాంక్ ఖాతాలో నగదు జమ (DBT) కోసం తప్పనిసరి.';
    if (reason.includes('legal title') || reason.includes('agricultural land')) return 'మీ పేరు మీద సాగుభూమి యాజమాన్య హక్కులు ఉన్నట్లు ధ్రువీకరించడానికి అవసరం.';
    if (reason.includes('payment successfully lands')) return 'ప్రభుత్వ సాయం తిరస్కరణ లేకుండా నేరుగా మీ బ్యాంక్ ఖాతాలో జమ కావడానికి ఆధార్ లింక్ తప్పనిసరి.';
    if (reason.includes('income ceiling') || reason.includes('economically')) return 'కుటుంబ వార్షిక ఆదాయం ప్రభుత్వ పరిమితికి లోబడి ఉందని ధ్రువీకరించడానికి.';
    if (reason.includes('social category') || reason.includes('reservation')) return 'రిజర్వేషన్ మరియు కేటాయించిన కోటాను పొందడానికి కుల ధ్రువీకరణ అవసరం.';
    if (reason.includes('proof of residence') || reason.includes('domicile')) return 'రాష్ట్రంలో స్థానిక నివాస అర్హతను ధ్రువీకరించడానికి.';
    return reason;
  }
  if (language === 'Hindi') {
    if (reason.includes('biometric verification') || reason.includes('DBT')) return 'बायोमेट्रिक प्रमाणीकरण और प्रत्यक्ष लाभ अंतरण (DBT) लिंकिंग के लिए आवश्यक।';
    if (reason.includes('legal title') || reason.includes('agricultural land')) return 'आपके नाम पर कृषि योग्य भूमि के स्वामित्व को प्रमाणित करने के लिए।';
    if (reason.includes('payment successfully lands')) return 'सरकारी सहायता बिना रुकावट आपके खाते में जमा होने के लिए आधार से जुड़ा बैंक खाता जरूरी है।';
    if (reason.includes('income ceiling') || reason.includes('economically')) return 'परिवार की वार्षिक आय निर्धारित सीमा के भीतर होने का प्रमाण।';
    if (reason.includes('social category') || reason.includes('reservation')) return 'आरक्षित श्रेणी और सरकारी कोटे का लाभ प्राप्त करने के लिए।';
    if (reason.includes('proof of residence') || reason.includes('domicile')) return 'राज्य में मूल निवास पात्रता को प्रमाणित करने हेतु।';
    return reason;
  }
  return reason;
}

/**
 * Localizes document how-to-obtain instructions
 */
export function getLocalizedDocHowTo(howTo: string, language: Language): string {
  if (language === 'Telugu') {
    if (howTo.includes('UIDAI')) return 'UIDAI అధికారిక పోర్టల్ (eaadhaar.uidai.gov.in) నుండి డౌన్‌లోడ్ చేసుకోండి లేదా ఆధార్ సేవా కేంద్రానికి వెళ్లండి.';
    if (howTo.includes('Dharani') || howTo.includes('Meebhoomi') || howTo.includes('Bhulekh')) return 'మీ రాష్ట్ర భూ రికార్డుల పోర్టల్ (ధరణి / మీభూమి / భూలేఖ్) నుండి లేదా తహశీల్దార్ కార్యాలయం నుండి పొందండి.';
    if (howTo.includes('bank branch') || howTo.includes('NPCI')) return 'మీ బ్యాంక్ బ్రాంచ్‌ను సంప్రదించి ఖాతాకు ఆధార్ మరియు NPCI మ్యాపింగ్ చేయించండి.';
    if (howTo.includes('MeeSeva') || howTo.includes('Tahsildar')) return 'మీసేవ కేంద్రం లేదా తహశీల్దార్ కార్యాలయం ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి.';
    return howTo;
  }
  if (language === 'Hindi') {
    if (howTo.includes('UIDAI')) return 'UIDAI पोर्टल (eaadhaar.uidai.gov.in) से ई-आधार डाउनलोड करें या निकटतम आधार सेवा केंद्र जाएं।';
    if (howTo.includes('Dharani') || howTo.includes('Meebhoomi') || howTo.includes('Bhulekh')) return 'राज्य भू-अभिलेख पोर्टल (भूलेख) या स्थानीय तहसील/राजस्व कार्यालय से खतौनी/पट्टा प्राप्त करें।';
    if (howTo.includes('bank branch') || howTo.includes('NPCI')) return 'अपनी बैंक शाखा में जाकर आधार को बैंक खाते व NPCI से लिंक करवाएं।';
    if (howTo.includes('MeeSeva') || howTo.includes('Tahsildar')) return 'जन सेवा केंद्र (CSC) या तहसील कार्यालय से ऑनलाइन आवेदन कर प्रमाण पत्र प्राप्त करें।';
    return howTo;
  }
  return howTo;
}

/**
 * Localizes step titles
 */
export function getLocalizedStepTitle(title: string, language: Language): string {
  if (language === 'Telugu') {
    if (title.includes('Land Record') || title.includes('e-KYC')) return 'భూ రికార్డులు సరిచూసుకోవడం & ఈ-కేవైసీ';
    if (title.includes('Visit') || title.includes('Portal')) return 'అధికారిక ప్రభుత్వ పోర్టల్‌ను తెరవడం';
    if (title.includes('Enter Aadhaar') || title.includes('Mobile')) return 'ఆధార్ సంఖ్య మరియు మొబైల్ నమోదు';
    if (title.includes('Survey') || title.includes('Land Details')) return 'సర్వే నంబర్ మరియు భూమి వివరాలు నమోదు';
    if (title.includes('Verification') || title.includes('Officer')) return 'అధికారుల ద్వారా పత్రాల పరిశీలన';
    if (title.includes('Upload') || title.includes('Document')) return 'అవసరమైన పత్రాలను అప్‌లోడ్ చేయడం';
    if (title.includes('Payment') || title.includes('Fee')) return 'రుసుము చెల్లింపు (వర్తిస్తే)';
    if (title.includes('Download') || title.includes('Certificate')) return 'ధ్రువీకరణ పత్రం డౌన్‌లోడ్ చేసుకోవడం';
    return title;
  }
  if (language === 'Hindi') {
    if (title.includes('Land Record') || title.includes('e-KYC')) return 'भू-अभिलेख सत्यापन एवं ई-केवाईसी';
    if (title.includes('Visit') || title.includes('Portal')) return 'आधिकारिक सरकारी पोर्टल खोलें';
    if (title.includes('Enter Aadhaar') || title.includes('Mobile')) return 'आधार नंबर और विवरण दर्ज करें';
    if (title.includes('Survey') || title.includes('Land Details')) return 'भूमि खसरा/खतौनी विवरण भरें';
    if (title.includes('Verification') || title.includes('Officer')) return 'नोडल अधिकारी द्वारा सत्यापन';
    if (title.includes('Upload') || title.includes('Document')) return 'आवश्यक दस्तावेज अपलोड करें';
    if (title.includes('Download') || title.includes('Certificate')) return 'डिजिटल प्रमाण पत्र डाउनलोड करें';
    return title;
  }
  return title;
}

/**
 * Localizes step descriptions
 */
export function getLocalizedStepDesc(desc: string, language: Language): string {
  if (language === 'Telugu') {
    if (desc.includes('Ensure your land document')) return 'మీ భూమి పట్టాదారు పాస్ పుస్తకం మరియు రికార్డులు అప్‌డేట్ అయి ఉన్నాయని ధ్రువీకరించుకోండి.';
    if (desc.includes('Open verified portal')) return 'అధికారిక వెబ్‌సైట్‌ను తెరిచి, "న్యూ రిజిస్ట్రేషన్" లేదా "దరఖాస్తు" లింక్‌పై క్లిక్ చేయండి.';
    if (desc.includes('Enter Aadhaar')) return 'మీ ఆధార్ సంఖ్య, మొబైల్ నంబర్ మరియు ఓటీపీ నమోదు చేసి ముందుకు సాగండి.';
    if (desc.includes('Enter Village') || desc.includes('Survey')) return 'గ్రామం, మండలం, సర్వే నంబర్ వివరాలు నమోదు చేసి సంబంధిత పత్రం కాపీని జతచేయండి.';
    if (desc.includes('verifies land records') || desc.includes('days')) return 'సంబంధిత రెవెన్యూ లేదా వ్యవసాయ అధికారులు 15-30 రోజుల్లో ధ్రువీకరిస్తారు.';
    return desc;
  }
  if (language === 'Hindi') {
    if (desc.includes('Ensure your land document')) return 'सुनिश्चित करें कि आपका भू-अभिलेख (खतौनी/पट्टा) राज्य रिकॉर्ड में अपडेट है।';
    if (desc.includes('Open verified portal')) return 'सत्यापित आधिकारिक पोर्टल खोलें और "नया पंजीकरण" विकल्प चुनें।';
    if (desc.includes('Enter Aadhaar')) return 'आधार संख्या, मोबाइल नंबर दर्ज कर ओटीपी द्वारा सत्यापन पूरा करें।';
    if (desc.includes('Enter Village') || desc.includes('Survey')) return 'ग्राम, तहसील, खसरा नंबर दर्ज करें और आवश्यक दस्तावेज संलग्न करें।';
    if (desc.includes('verifies land records') || desc.includes('days')) return 'संबंधित नोडल अधिकारी द्वारा 15 से 30 दिनों में सत्यापन पूरा किया जाता है।';
    return desc;
  }
  return desc;
}

/**
 * Localizes individual custom condition strings
 */
export function getLocalizedCondition(condition: string, language: Language): string {
  if (language === 'Telugu') {
    if (condition.includes('Must own cultivable')) return 'దరఖాస్తుదారు పేరు మీద సాగుకు అనువైన వ్యవసాయ భూమి ఉండాలి.';
    if (condition.includes('NOT be an institutional') || condition.includes('tax payer')) return 'దరఖాస్తుదారు లేదా కుటుంబ సభ్యులు సంస్థాగత భూ యజమానులు లేదా ఆదాయపు పన్ను చెల్లింపుదారులు కారాదు.';
    if (condition.includes('Aadhaar e-KYC')) return 'పోర్టల్ లేదా సీఎస్‌సీ కేంద్రం ద్వారా ఆధార్ బయోమెట్రిక్ ఈ-కేవైసీ పూర్తి చేయాలి.';
    if (condition.includes('Annual family income') || condition.includes('ceiling')) return 'కుటుంబ వార్షిక ఆదాయం అధికారిక గరిష్ట పరిమితికి లోబడి ఉండాలి.';
    if (condition.includes('Permanent resident') || condition.includes('domicile')) return 'సంబంధిత రాష్ట్రంలో శాశ్వత స్థానిక నివాసి అయి ఉండాలి.';
    if (condition.includes('Active student enrolled')) return 'గుర్తింపు పొందిన విద్యా సంస్థలో రెగ్యులర్ విద్యార్థిగా చదువుతుండాలి.';
    if (condition.includes('Specially Abled') || condition.includes('disability')) return 'కనీసం 40% వికలాంగత్వ ధ్రువీకరణ పత్రం కలిగి ఉండాలి.';
    if (condition.includes('Age criteria') || condition.includes('years')) return 'ప్రభుత్వం నిర్దేశించిన వయోపరిమితి నిబంధనలకు లోబడి ఉండాలి.';
    return condition;
  }
  if (language === 'Hindi') {
    if (condition.includes('Must own cultivable')) return 'आवेदक के नाम पर कृषि योग्य भूमि का मालिकाना हक होना चाहिए।';
    if (condition.includes('NOT be an institutional') || condition.includes('tax payer')) return 'आवेदक या परिवार का सदस्य आयकर दाता या संस्थागत भू-स्वामी नहीं होना चाहिए।';
    if (condition.includes('Aadhaar e-KYC')) return 'पोर्टल या सीएससी के माध्यम से आधार ई-केवाईसी सत्यापन अनिवार्य है।';
    if (condition.includes('Annual family income') || condition.includes('ceiling')) return 'परिवार की कुल वार्षिक आय निर्धारित अधिकतम सीमा से कम होनी चाहिए।';
    if (condition.includes('Permanent resident') || condition.includes('domicile')) return 'संबंधित राज्य का स्थायी अधिवास/मूल निवासी होना अनिवार्य है।';
    if (condition.includes('Active student enrolled')) return 'मान्यता प्राप्त कॉलेज/स्कूल में नियमित छात्र के रूप में अध्ययनरत होना चाहिए।';
    if (condition.includes('Specially Abled') || condition.includes('disability')) return 'सक्षम चिकित्सा बोर्ड से न्यूनतम 40% दिव्यांगता प्रमाण पत्र धारक होना चाहिए।';
    return condition;
  }
  return condition;
}

/**
 * Localizes rule evaluation points (Why you match, Needs verification, Missing, Advice)
 */
export function getLocalizedEvaluation(evalResult: RuleEvaluationResult, language: Language): RuleEvaluationResult {
  if (language === 'English') return evalResult;

  const translatePoint = (text: string): string => {
    if (language === 'Telugu') {
      if (text.startsWith('Age criterion satisfied:')) {
        return text.replace('Age criterion satisfied: You are', 'వయస్సు నిబంధన సరిపోయింది: మీ వయస్సు')
          .replace('years old (required:', 'సంవత్సరాలు (అవసరమైనది:')
          .replace('years).', 'సంవత్సరాలు).');
      }
      if (text.startsWith('State domicile matched:')) {
        return text.replace('State domicile matched: Scheme is applicable in', 'రాష్ట్ర నివాస అర్హత సరిపోయింది: ఈ పథకం వర్తించే రాష్ట్రం')
          .replace(', where you reside.', ' - మీ ప్రొఫైల్ ప్రకారం సరిపోయింది.');
      }
      if (text.startsWith('Pan-India scheme:')) {
        return text.replace('Pan-India scheme: Open to eligible citizens across all States and Union Territories including', 'అఖిల భారత పథకం: దేశవ్యాప్తంగా అన్ని రాష్ట్రాల పౌరులకు మరియు')
          .replace('.', ' లోని అర్హులకు అందుబాటులో ఉంది.');
      }
      if (text.startsWith('Gender requirement matched:')) {
        return text.replace('Gender requirement matched: Designated for', 'లింగ నిబంధన సరిపోయింది: ఈ పథకం')
          .replace('applicants.', 'దరఖాస్తుదారులకు ప్రత్యేకించబడింది.');
      }
      if (text.startsWith('Occupation matched:')) {
        return text.replace('Occupation matched: Your category (', 'వృత్తి వర్గం సరిపోయింది: మీ వర్గం (')
          .replace(') is explicitly targeted.', ') ఈ పథకానికి నేరుగా లక్ష్యంగా ఎంపికైంది.');
      }
      if (text.startsWith('Income ceiling satisfied:')) {
        return text.replace('Income ceiling satisfied: Your family income (', 'ఆదాయ పరిమితి సరిపోయింది: మీ కుటుంబ వార్షిక ఆదాయం (')
          .replace('/yr) is within the maximum limit of', '/ఏడాది) గరిష్ట పరిమితి అయిన')
          .replace('/yr).', '/ఏడాది లోపు ఉంది.');
      }
      if (text.startsWith('Social category matched:')) {
        return text.replace('Social category matched: Your category (', 'సామాజిక వర్గం సరిపోయింది: మీ వర్గం (')
          .replace(') is covered under notified quotas.', ') వర్తించే కోటా పరిధిలో ఉంది.');
      }
      if (text.startsWith('Agricultural landholding confirmed:')) {
        return text.replace('Agricultural landholding confirmed: You registered', 'వ్యవసాయ భూమి వివరాలు నిర్ధారించబడ్డాయి: మీరు')
          .replace('acres of land.', 'ఎకరాల భూమిని నమోదు చేశారు.');
      }
      if (text.startsWith('Disability empowerment criterion satisfied:')) {
        return 'దివ్యాంగుల సాధికారత నిబంధన సంతృప్తి చెందింది: దివ్యాంగులు / సదరం ధ్రువీకరణగా గుర్తించబడింది.';
      }
      if (text.startsWith('Housing criteria satisfied:')) {
        return 'గృహ స్థితి నిబంధన సంతృప్తి చెందింది: అర్హత గల నివాస వర్గంలో ఉన్నారు.';
      }
      // Needs Verification
      if (text.startsWith('Occupation alignment:')) {
        return 'వృత్తి అనుసంధానం: అధికారిక నిబంధనల ప్రకారం అదనపు ధ్రువీకరణ లేదా స్వయం ఉపాధి డిక్లరేషన్ అవసరం కావచ్చు.';
      }
      if (text.startsWith('Social category quota:')) {
        return 'సామాజిక కేటగిరీ పరిశీలన: పథకం ప్రత్యేక వర్గాలను పేర్కొంది. ధ్రువీకరణ పత్రం అవసరం.';
      }
      if (text.startsWith('Land ownership verification:')) {
        return 'భూమి యాజమాన్య పరిశీలన: మీ పేరిట లేదా కుటుంబ సభ్యుల పేరిట చెల్లుబాటు అయ్యే పట్టాదారు పాస్ పుస్తకం ఉండాలి.';
      }
      // Missing
      if (text.startsWith('Age mismatch:')) {
        return text.replace('Age mismatch: You are', 'వయస్సు సరిపోలలేదు: మీ వయస్సు')
          .replace('years old, but scheme requires age between', 'సంవత్సరాలు, కానీ పథకానికి కావలసిన వయస్సు')
          .replace('and', 'నుండి')
          .replace('years.', 'సంవత్సరాలు.');
      }
      if (text.startsWith('State restriction:')) {
        return 'రాష్ట్ర పరిమితి: ఈ పథకం నిర్దిష్ట రాష్ట్ర నివాసితులకు మాత్రమే వర్తిస్తుంది.';
      }
      if (text.startsWith('Farmer status required:')) {
        return 'రైతు హోదా అవసరం: ఈ పథకం క్రియాశీల రైతులు లేదా సాగుభూమి గల కుటుంబాల కోసం మాత్రమే.';
      }
      if (text.startsWith('Income limit exceeded:')) {
        return 'ఆదాయ పరిమితి మించింది: మీ వార్షిక ఆదాయం ఈ పథకానికి నిర్దేశించిన గరిష్ట పరిమితి కంటే ఎక్కువ ఉంది.';
      }
      if (text.startsWith('Specific beneficiary scheme:')) {
        return 'ప్రత్యేక లబ్ధిదారు పథకం: కనీసం 40% దివ్యాంగత్వం గల వ్యక్తులకు మాత్రమే ప్రత్యేకించబడింది.';
      }
      // Action Advice
      if (text.includes('family member within')) {
        return 'మీ కుటుంబంలో ఈ వయస్సు పరిధిలో ఉన్న ఇతర సభ్యులు ప్రాథమిక దరఖాస్తుదారుగా దరఖాస్తు చేయగలరేమో చూడండి.';
      }
      if (text.includes('Browse equivalent Central')) {
        return 'మీ రాష్ట్రానికి సమానమైన కేంద్ర ప్రభుత్వ లేదా ఇతర సంక్షేమ పథకాలను పరిశీలించండి.';
      }
      if (text.includes('Eligible female household members')) {
        return 'కుటుంబంలోని అర్హులైన మహిళా సభ్యులు (తల్లి, భార్య, సోదరి) దరఖాస్తు చేయవచ్చు.';
      }
      if (text.includes('update your occupational status')) {
        return 'మీరు పాక్షికంగా వ్యవసాయం లేదా వ్యాపారం చేస్తున్నట్లయితే, ప్రొఫైల్ వివరాలను నవీకరించండి.';
      }
      if (text.includes('Review non-means-tested')) {
        return 'ఆదాయ పరిమితి లేని సార్వత్రిక ప్రభుత్వ పథకాలను పరిశీలించండి.';
      }
    }

    if (language === 'Hindi') {
      if (text.startsWith('Age criterion satisfied:')) {
        return text.replace('Age criterion satisfied: You are', 'आयु मानदंड पूरा हुआ: आपकी आयु')
          .replace('years old (required:', 'वर्ष है (आवश्यक:')
          .replace('years).', 'वर्ष)।');
      }
      if (text.startsWith('State domicile matched:')) {
        return text.replace('State domicile matched: Scheme is applicable in', 'राज्य निवास मानदंड पूरा हुआ: यह योजना')
          .replace(', where you reside.', ' में लागू है, जहां आप निवास करते हैं।');
      }
      if (text.startsWith('Pan-India scheme:')) {
        return text.replace('Pan-India scheme: Open to eligible citizens across all States and Union Territories including', 'अखिल भारतीय योजना: सभी राज्यों एवं केंद्र शासित प्रदेशों सहित')
          .replace('.', ' के पात्र नागरिकों के लिए खुली है।');
      }
      if (text.startsWith('Gender requirement matched:')) {
        return text.replace('Gender requirement matched: Designated for', 'लिंग पात्रता पूरी हुई: यह योजना विशेष रूप से')
          .replace('applicants.', 'आवेदकों के लिए है।');
      }
      if (text.startsWith('Occupation matched:')) {
        return text.replace('Occupation matched: Your category (', 'व्यवसाय श्रेणी मेल खाती है: आपकी श्रेणी (')
          .replace(') is explicitly targeted.', ') इस योजना के लिए लक्षित है।');
      }
      if (text.startsWith('Income ceiling satisfied:')) {
        return text.replace('Income ceiling satisfied: Your family income (', 'आय सीमा मानदंड पूरा हुआ: आपकी पारिवारिक आय (')
          .replace('/yr) is within the maximum limit of', '/वर्ष) अधिकतम सीमा')
          .replace('/yr).', '/वर्ष के भीतर है।');
      }
      if (text.startsWith('Social category matched:')) {
        return text.replace('Social category matched: Your category (', 'सामाजिक श्रेणी मेल खाती है: आपकी श्रेणी (')
          .replace(') is covered under notified quotas.', ') अधिसूचित कोटे के अंतर्गत आती है।');
      }
      if (text.startsWith('Agricultural landholding confirmed:')) {
        return text.replace('Agricultural landholding confirmed: You registered', 'कृषि भूमि स्वामित्व की पुष्टि: आपने')
          .replace('acres of land.', 'एकड़ भूमि पंजीकृत की है।');
      }
      if (text.startsWith('Disability empowerment criterion satisfied:')) {
        return 'दिव्यांगजन सशक्तिकरण मानदंड पूरा हुआ: प्रोफाइल में दिव्यांगजन के रूप में चिह्नित है।';
      }
      // Needs Verification
      if (text.startsWith('Occupation alignment:')) {
        return 'व्यवसाय श्रेणी संरेखण: योजना के दिशा-निर्देशों अनुसार अतिरिक्त प्रमाण पत्र की आवश्यकता हो सकती है।';
      }
      if (text.startsWith('Land ownership verification:')) {
        return 'भूमि स्वामित्व सत्यापन: आवेदक या परिवार के नाम वैध खतौनी/पट्टा आवश्यक है।';
      }
      // Missing
      if (text.startsWith('Age mismatch:')) {
        return 'आयु सीमा का अंतर: आपकी आयु इस योजना की निर्धारित आयु सीमा के अनुरूप नहीं है।';
      }
      if (text.startsWith('State restriction:')) {
        return 'राज्य प्रतिबंध: यह योजना केवल संबंधित राज्य के निवासियों के लिए विशेष रूप से बनाई गई है।';
      }
      if (text.startsWith('Farmer status required:')) {
        return 'किसान दर्जा अनिवार्य: यह योजना केवल सक्रिय किसानों और कृषि भूमिधारकों के लिए है।';
      }
      if (text.startsWith('Income limit exceeded:')) {
        return 'आय सीमा से अधिक: आपकी पारिवारिक आय इस योजना की तय सीमा से अधिक है।';
      }
      // Action Advice
      if (text.includes('family member within')) {
        return 'जांचें कि क्या परिवार का कोई अन्य सदस्य जो इस आयु वर्ग में है, मुख्य आवेदक के रूप में आवेदन कर सकता है।';
      }
      if (text.includes('Browse equivalent Central')) {
        return 'समान लाभ देने वाली केंद्र सरकार या अन्य राज्य कल्याणकारी योजनाओं को देखें।';
      }
      if (text.includes('Eligible female household members')) {
        return 'परिवार की पात्र महिला सदस्य (माता, पत्नी या बहन) मुख्य आवेदक बन सकती हैं।';
      }
      if (text.includes('Review non-means-tested')) {
        return 'बिना आय सीमा वाली सार्वभौमिक सरकारी योजनाओं की सूची देखें।';
      }
    }

    return text;
  };

  return {
    ...evalResult,
    whyYouMatch: evalResult.whyYouMatch.map(translatePoint),
    needsVerification: evalResult.needsVerification.map(translatePoint),
    missingRequirements: evalResult.missingRequirements.map(translatePoint),
    actionAdvice: evalResult.actionAdvice.map(translatePoint),
  };
}

/**
 * Returns localized benefit type label
 */
export function getLocalizedBenefitType(benefitType: string, language: Language): string {
  if (!benefitType) return '';
  if (language === 'Telugu') {
    if (benefitType.includes('Direct Cash')) return 'ప్రత్యక్ష నగదు బదిలీ (DBT)';
    if (benefitType.includes('Subsidy')) return 'ప్రభుత్వ సబ్సిడీ';
    if (benefitType.includes('Insurance')) return 'ఉచిత బీమా రక్షణ';
    if (benefitType.includes('Reimbursement')) return 'ఫీజు రీయింబర్స్‌మెంట్';
    if (benefitType.includes('Loan')) return 'తక్కువ వడ్డీ రుణం';
    if (benefitType.includes('Certificate')) return 'అధికారిక గుర్తింపు / ధ్రువపత్రం';
    return benefitType;
  }
  if (language === 'Hindi') {
    if (benefitType.includes('Direct Cash')) return 'प्रत्यक्ष लाभ अंतरण (DBT)';
    if (benefitType.includes('Subsidy')) return 'सरकारी सब्सिडी';
    if (benefitType.includes('Insurance')) return 'निःशुल्क बीमा सुरक्षा';
    if (benefitType.includes('Reimbursement')) return 'फीस प्रतिपूर्ति';
    if (benefitType.includes('Loan')) return 'रियायती व्यापार ऋण';
    if (benefitType.includes('Certificate')) return 'आधिकारिक प्रमाण पत्र';
    return benefitType;
  }
  if (language === 'Tamil') {
    if (benefitType.includes('Direct Cash')) return 'நேரடி பணப் பரிமாற்றம் (DBT)';
    if (benefitType.includes('Subsidy')) return 'மானியம்';
    if (benefitType.includes('Insurance')) return 'காப்பீடு';
    if (benefitType.includes('Reimbursement')) return 'கட்டணத் திருப்பம்';
    if (benefitType.includes('Loan')) return 'கடன் உதவி';
    return benefitType;
  }
  if (language === 'Kannada') {
    if (benefitType.includes('Direct Cash')) return 'ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT)';
    if (benefitType.includes('Subsidy')) return 'ಸರಕಾರಿ ಸಬ್ಸಿಡಿ';
    if (benefitType.includes('Insurance')) return 'ವಿಮೆ ರಕ್ಷಣೆ';
    if (benefitType.includes('Reimbursement')) return 'ಶುಲ್ಕ ಮರುಪಾವತಿ';
    if (benefitType.includes('Loan')) return 'ಕಡಿಮೆ ಬಡ್ಡಿ ಸಾಲ';
    return benefitType;
  }
  return benefitType;
}

/**
 * Returns speech synthesis language code for Web Speech API
 */
export function getSpeechSynthesisLang(language: Language): string {
  switch (language) {
    case 'Hindi': return 'hi-IN';
    case 'Telugu': return 'te-IN';
    case 'Tamil': return 'ta-IN';
    case 'Kannada': return 'kn-IN';
    case 'Malayalam': return 'ml-IN';
    case 'Marathi': return 'mr-IN';
    case 'Bengali': return 'bn-IN';
    case 'Gujarati': return 'gu-IN';
    case 'Punjabi': return 'pa-IN';
    case 'Urdu': return 'ur-IN';
    default: return 'en-IN';
  }
}

