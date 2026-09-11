import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  User, 
  Briefcase, 
  GraduationCap, 
  Coins, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Check, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  Landmark
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { getEligibilityStrings } from '../data/eligibilityTranslations';

interface EligibilityFormProps {
  initialProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  language: Language;
  onExploreSchemes?: () => void;
}

const INDIAN_STATES = [
  'All-India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu & Kashmir',
  'Ladakh',
  'Puducherry'
];

const OCCUPATION_KEYS: UserProfile['occupation'][] = [
  'Student',
  'Farmer',
  'Business',
  'Unemployed',
  'Employee',
  'Daily Wage / Laborer',
  'Homemaker',
  'Retired',
  'Other'
];

const EDUCATION_KEYS: UserProfile['educationLevel'][] = [
  'Below 10th',
  '10th Pass',
  '12th Pass',
  'Diploma',
  'Undergraduate',
  'Postgraduate / Higher'
];

const INCOME_BRACKETS = [
  { value: 90000, label: 'Below ₹1,00,000 / year', desc: 'BPL / Antyodaya & EWS priority' },
  { value: 180000, label: '₹1,00,000 – ₹2,50,000 / year', desc: 'Full scholarship & tuition fee waiver band' },
  { value: 450000, label: '₹2,50,000 – ₹5,00,000 / year', desc: 'PMAY housing subsidy & credit assistance' },
  { value: 750000, label: '₹5,00,000 – ₹8,00,000 / year', desc: 'Non-creamy layer OBC & welfare limit' },
  { value: 1200000, label: 'Above ₹8,00,000 / year', desc: 'MSME credit & general entrepreneurial schemes' },
];

export const EligibilityForm: React.FC<EligibilityFormProps> = ({
  initialProfile,
  onSaveProfile,
  language,
  onExploreSchemes,
}) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [showResult, setShowResult] = useState<boolean>(false);

  const strings = getEligibilityStrings(language);

  const updateField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onSaveProfile(profile);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setStep(1);
  };

  const getLocalizedOccupation = (id: UserProfile['occupation']) => {
    switch (id) {
      case 'Student':
        return {
          label: language === 'Telugu' ? 'విద్యార్థి' : language === 'Hindi' ? 'विद्यार्थी / छात्र' : language === 'Tamil' ? 'மாணவர்' : language === 'Urdu' ? 'طالب علم' : 'Student',
          desc: 'Enrolled in school, college, or university'
        };
      case 'Farmer':
        return {
          label: language === 'Telugu' ? 'రైతు / సాగుదారు' : language === 'Hindi' ? 'किसान / कृषक' : language === 'Tamil' ? 'விவசாயி' : language === 'Urdu' ? 'کسان' : 'Farmer / Cultivator',
          desc: 'Cultivates agricultural land or dairy farming'
        };
      case 'Business':
        return {
          label: language === 'Telugu' ? 'వ్యాపారం / ఎంఎస్ఎంఈ' : language === 'Hindi' ? 'व्यवसाय / उद्यमी' : 'Business / Self-Employed',
          desc: 'Micro, small or medium enterprise owner'
        };
      case 'Unemployed':
        return {
          label: language === 'Telugu' ? 'నిరుద్యోగి' : language === 'Hindi' ? 'बेरोजगार' : 'Jobseeker / Unemployed',
          desc: 'Actively looking for employment or skill training'
        };
      case 'Employee':
        return {
          label: language === 'Telugu' ? 'ఉద్యోగి' : language === 'Hindi' ? 'कर्मचारी' : 'Salaried Employee',
          desc: 'Private or government sector employee'
        };
      case 'Daily Wage / Laborer':
        return {
          label: language === 'Telugu' ? 'దినసరి కూలీ' : language === 'Hindi' ? 'दैनिक वेतन भोगी / श्रमिक' : 'Daily Wage Worker / Laborer',
          desc: 'Unorganized sector, construction or artisan worker'
        };
      case 'Homemaker':
        return {
          label: language === 'Telugu' ? 'గృహిణి' : language === 'Hindi' ? 'गृहिणी' : 'Homemaker',
          desc: 'Managing household and family welfare'
        };
      case 'Retired':
        return {
          label: language === 'Telugu' ? 'పదవీ విరమణ' : language === 'Hindi' ? 'सेवानिवृत्त' : 'Senior / Retired Citizen',
          desc: 'Eligible for senior pensions and health benefits'
        };
      default:
        return { label: id, desc: 'Other category' };
    }
  };

  const getLocalizedEducation = (id: UserProfile['educationLevel']) => {
    switch (id) {
      case 'Below 10th':
        return { label: 'Primary / Below 10th', desc: 'Basic literacy or primary schooling' };
      case '10th Pass':
        return { label: 'Secondary (10th Pass / SSC)', desc: 'Matriculation certified' };
      case '12th Pass':
        return { label: 'Higher Secondary (12th / Intermediate)', desc: 'Senior secondary certified' };
      case 'Diploma':
        return { label: 'Polytechnic / Vocational Diploma', desc: 'Technical skill certification' };
      case 'Undergraduate':
        return { label: 'Undergraduate (BA, BSc, BTech)', desc: 'Pursuing or graduated Bachelor’s' };
      case 'Postgraduate / Higher':
        return { label: 'Postgraduate / Doctorate (Master’s/PhD)', desc: 'Master’s degree or research' };
      default:
        return { label: id, desc: '' };
    }
  };

  // Results View
  if (showResult) {
    const isLikelyEligible = (profile.annualIncome <= 500000 && profile.age >= 16) || profile.isFarmer || profile.isStudent;
    
    // Dynamic Estimated Benefit computation
    const benefitAmount = profile.isFarmer 
      ? '₹24,000 – ₹60,000 / year direct subsidy'
      : profile.isStudent 
      ? '₹35,000 – ₹1,20,000 / year tuition fee waiver'
      : profile.annualIncome <= 250000
      ? '₹42,000 / year in welfare & DBT benefits'
      : 'Subsidized Credit & Healthcare coverage up to ₹5,00,000';

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div 
          id="eligibility-assessment-result"
          className="bg-white rounded-3xl border border-[#DFDACD] p-6 sm:p-10 shadow-lg"
        >
          {/* Header */}
          <div className="text-center pb-8 border-b border-[#EAE6DB]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#155C45] bg-[#FAF9F5] border border-[#EAE6DB] px-3 py-1 rounded-full">
              Assessment Protocol Completed
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl text-[#08110D] font-bold mt-4 tracking-tight">
              Based on your criteria, you qualify for 12 schemes.
            </h2>

            <p className="text-sm text-[#545B56] mt-2 max-w-lg mx-auto font-light leading-relaxed">
              We evaluated your age, residency, household income bracket, and occupation against national and state eligibility rules.
            </p>

            {/* Total Estimated Financial Benefit Banner */}
            <div className="mt-6 p-5 rounded-2xl bg-[#F4F2EB] border border-[#DFDACD] text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45]">
                  ESTIMATED FINANCIAL BENEFIT
                </span>
                <p className="font-editorial text-2xl sm:text-3xl text-[#08110D] font-bold mt-0.5">
                  {benefitAmount}
                </p>
                <p className="text-xs text-[#545B56] mt-0.5 font-mono">
                  Calculated from 12 matching DBT, scholarship, and healthcare programs
                </p>
              </div>

              <span className="px-3 py-1 text-xs font-bold font-mono rounded-lg bg-[#155C45] text-white self-start sm:self-center">
                High Match Score
              </span>
            </div>
          </div>

          {/* Matched Criteria vs Considerations */}
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matched Criteria */}
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DB]">
              <div className="flex items-center gap-2 text-[#155C45] font-bold text-xs font-mono uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#155C45]" />
                <span>Verified Match Criteria</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#545B56]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#155C45]" />
                  <span>Jurisdiction: <strong className="text-[#08110D]">{profile.state}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#155C45]" />
                  <span>Age Bracket: <strong className="text-[#08110D]">{profile.age} years</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#155C45]" />
                  <span>Occupation: <strong className="text-[#08110D]">{getLocalizedOccupation(profile.occupation).label}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#155C45]" />
                  <span>Income Bracket: <strong className="text-[#08110D]">Within qualifying limits</strong></span>
                </li>
              </ul>
            </div>

            {/* Verification Considerations */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs font-mono uppercase tracking-wider mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Prerequisites for Disbursement</span>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1" />
                  <span>Aadhaar seeded with active bank account for DBT</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1" />
                  <span>Income certificate issued within current fiscal year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1" />
                  <span>Active mobile number linked to Aadhaar for OTP verification</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#EAE6DB]">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-[#DFDACD] hover:bg-[#FAF9F5] text-[#545B56] text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Assessment Inputs</span>
            </button>

            <button
              onClick={onExploreSchemes}
              className="px-6 py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Matched Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stepper Guided Flow
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="mb-8">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#155C45] font-bold block mb-2">
          Guided Citizen Assessment
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#08110D] font-bold tracking-tight">
          Find what you qualify for.
        </h1>
        <p className="text-sm sm:text-base text-[#545B56] mt-1 font-light">
          Answer 5 quick questions to calculate your exact entitlement under state and central schemes.
        </p>
      </div>

      {/* Main Guided Interview Card */}
      <div className="bg-white rounded-3xl border border-[#DFDACD] p-6 sm:p-10 shadow-xs">
        {/* Minimal Step Counter Line */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#6C746E] mb-2.5">
            <span className="uppercase tracking-wider">Step 0{step} / 05</span>
            <span className="text-[#155C45]">
              {step === 1 && 'Jurisdiction & Domicile'}
              {step === 2 && 'Age & Gender'}
              {step === 3 && 'Primary Occupation'}
              {step === 4 && 'Education Level'}
              {step === 5 && 'Household Annual Income'}
            </span>
          </div>

          {/* Minimal 2px Progress Line */}
          <div className="w-full bg-[#EAE6DB] rounded-full h-1 overflow-hidden">
            <div
              className="bg-[#155C45] h-1 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: State */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#08110D] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#155C45]" />
                <span>Select Your State of Domicile</span>
              </h3>
              <p className="text-xs text-[#545B56] mt-1">
                Welfare schemes are customized by state administration and local territorial benefits.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#08110D] uppercase tracking-wider mb-2">
                State or Union Territory
              </label>
              <select
                value={profile.state}
                onChange={(e) => updateField('state', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#DFDACD] focus:border-[#155C45] focus:outline-hidden text-sm text-[#08110D] bg-[#FAF9F5] font-medium"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block mb-2">
                Quick Selection
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Telangana', 'Andhra Pradesh', 'Maharashtra', 'Uttar Pradesh'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => updateField('state', st)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                      profile.state === st
                        ? 'bg-[#155C45] border-[#155C45] text-white shadow-xs'
                        : 'bg-[#FAF9F5] border-[#DFDACD] text-[#545B56] hover:bg-[#F4F2EB]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Age and Gender */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#08110D] flex items-center gap-2">
                <User className="w-5 h-5 text-[#155C45]" />
                <span>Age and Gender Details</span>
              </h3>
              <p className="text-xs text-[#545B56] mt-1">
                Required to identify youth, student, women empowerment, and senior citizen pensions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#08110D] uppercase tracking-wider mb-2">
                  Your Current Age (Years) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  value={profile.age || ''}
                  onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                  placeholder="e.g. 24"
                  className="w-full px-4 py-3 rounded-xl border border-[#DFDACD] focus:border-[#155C45] focus:outline-hidden text-sm text-[#08110D] bg-[#FAF9F5] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#08110D] uppercase tracking-wider mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Male', label: 'Male' },
                    { id: 'Female', label: 'Female' },
                    { id: 'Other', label: 'Other' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => updateField('gender', g.id as any)}
                      className={`py-3 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                        profile.gender === g.id
                          ? 'bg-[#155C45] border-[#155C45] text-white shadow-xs'
                          : 'bg-[#FAF9F5] border-[#DFDACD] text-[#545B56] hover:bg-[#F4F2EB]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Occupation */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#08110D] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#155C45]" />
                <span>Primary Occupation / Livelihood</span>
              </h3>
              <p className="text-xs text-[#545B56] mt-1">
                Select your primary economic activity to map direct departmental benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OCCUPATION_KEYS.map((occId) => {
                const loc = getLocalizedOccupation(occId);
                const isSelected = profile.occupation === occId;
                return (
                  <button
                    key={occId}
                    type="button"
                    onClick={() => updateField('occupation', occId)}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#155C45] text-[#08110D] shadow-xs ring-1 ring-[#155C45]'
                        : 'bg-[#FAF9F5] border-[#DFDACD] hover:border-[#155C45] text-[#545B56]'
                    }`}
                  >
                    <div>
                      <strong className="text-xs font-bold block text-[#08110D]">{loc.label}</strong>
                      <span className="text-[11px] text-[#6C746E] mt-0.5 block leading-tight">{loc.desc}</span>
                    </div>
                    {isSelected && (
                      <span className="mt-2 text-[10px] font-mono font-bold text-[#155C45] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Education */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#08110D] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#155C45]" />
                <span>Highest Education Level</span>
              </h3>
              <p className="text-xs text-[#545B56] mt-1">
                Used to determine scholarship eligibility, free laptop schemes, and skill training programs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EDUCATION_KEYS.map((eduId) => {
                const loc = getLocalizedEducation(eduId);
                const isSelected = profile.educationLevel === eduId;
                return (
                  <button
                    key={eduId}
                    type="button"
                    onClick={() => updateField('educationLevel', eduId)}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#155C45] text-[#08110D] shadow-xs ring-1 ring-[#155C45]'
                        : 'bg-[#FAF9F5] border-[#DFDACD] hover:border-[#155C45] text-[#545B56]'
                    }`}
                  >
                    <div>
                      <strong className="text-xs font-bold block text-[#08110D]">{loc.label}</strong>
                      <span className="text-[11px] text-[#6C746E] mt-0.5 block leading-tight">{loc.desc}</span>
                    </div>
                    {isSelected && (
                      <span className="mt-2 text-[10px] font-mono font-bold text-[#155C45] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Income */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#08110D] flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#155C45]" />
                <span>Household Annual Income Ceiling</span>
              </h3>
              <p className="text-xs text-[#545B56] mt-1">
                Income caps determine subsidy eligibility across central and state welfare ministries.
              </p>
            </div>

            <div className="space-y-2.5">
              {INCOME_BRACKETS.map((inc) => {
                const isSelected = profile.annualIncome === inc.value;
                return (
                  <button
                    key={inc.value}
                    type="button"
                    onClick={() => updateField('annualIncome', inc.value)}
                    className={`w-full p-4 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#155C45] text-[#08110D] ring-1 ring-[#155C45] shadow-xs'
                        : 'bg-[#FAF9F5] border-[#DFDACD] hover:border-[#155C45] text-[#545B56]'
                    }`}
                  >
                    <div>
                      <strong className="text-xs font-bold block text-[#08110D]">{inc.label}</strong>
                      <span className="text-[11px] text-[#6C746E]">{inc.desc}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#155C45] bg-[#155C45] text-white' : 'border-[#DFDACD]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Social Category Option */}
            <div className="pt-4 border-t border-[#EAE6DB]">
              <label className="block text-xs font-mono font-bold text-[#08110D] uppercase tracking-wider mb-2">
                Social Category (Optional for Reserved Subsidies)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {(['General', 'OBC', 'SC', 'ST', 'EWS'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateField('socialCategory', cat)}
                    className={`py-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer ${
                      profile.socialCategory === cat
                        ? 'bg-[#155C45] border-[#155C45] text-white shadow-xs'
                        : 'bg-[#FAF9F5] border-[#DFDACD] text-[#545B56] hover:bg-[#F4F2EB]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stepper Footer Controls */}
        <div className="mt-8 pt-6 border-t border-[#EAE6DB] flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2.5 rounded-xl border border-[#DFDACD] hover:bg-[#FAF9F5] disabled:opacity-30 text-[#545B56] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>{step === 5 ? 'Run Eligibility Calculation' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
