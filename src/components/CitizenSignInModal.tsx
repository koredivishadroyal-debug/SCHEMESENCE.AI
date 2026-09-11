import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Wheat, 
  Store, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  User,
  Fingerprint,
  Check
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface CitizenSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  language: Language;
}

interface PersonaOption {
  id: string;
  name: string;
  role: string;
  state: string;
  age: number;
  income: number;
  icon: any;
  demographics: string;
  description: string;
  profile: UserProfile;
}

export const CitizenSignInModal: React.FC<CitizenSignInModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectProfile,
}) => {
  const [customName, setCustomName] = useState(currentProfile.name || 'Citizen');
  const [customState, setCustomState] = useState(currentProfile.state || 'Telangana');
  const [customOccupation, setCustomOccupation] = useState(currentProfile.occupation || 'Student');

  if (!isOpen) return null;

  const personas: PersonaOption[] = [
    {
      id: 'student_telangana',
      name: 'Priya Sharma',
      role: 'Student, Telangana',
      state: 'Telangana',
      age: 20,
      income: 180000,
      icon: GraduationCap,
      demographics: 'OBC • Female • Annual Income: ₹1.8L',
      description: 'Undergraduate scholar seeking NSP Post-Matric, TS ePASS, and tuition fee reimbursement.',
      profile: {
        ...currentProfile,
        name: 'Priya Sharma',
        state: 'Telangana',
        age: 20,
        gender: 'Female',
        occupation: 'Student',
        annualIncome: 180000,
        socialCategory: 'OBC',
        educationLevel: 'Undergraduate',
        isStudent: true,
        isFarmer: false,
      }
    },
    {
      id: 'farmer_karnataka',
      name: 'Ramesh Gowda',
      role: 'Small Farmer, Karnataka',
      state: 'Karnataka',
      age: 44,
      income: 120000,
      icon: Wheat,
      demographics: 'General • Male • 2.5 Acres Land • Income: ₹1.2L',
      description: 'Cultivator qualifying for PM-KISAN, PM Surya Ghar solar pump, and crop insurance.',
      profile: {
        ...currentProfile,
        name: 'Ramesh Gowda',
        state: 'Karnataka',
        age: 44,
        gender: 'Male',
        occupation: 'Farmer',
        annualIncome: 120000,
        socialCategory: 'General',
        educationLevel: 'Secondary (10th Pass)',
        isStudent: false,
        isFarmer: true,
        landOwnedAcres: 2.5,
        hasBplCard: true,
      }
    },
    {
      id: 'entrepreneur_bihar',
      name: 'Sunita Devi',
      role: 'Rural Entrepreneur, Bihar',
      state: 'Bihar',
      age: 36,
      income: 90000,
      icon: Store,
      demographics: 'SC • Female • SHG Leader • Income: ₹0.9L',
      description: 'Self-help group micro-entrepreneur eligible for Lakhpati Didi, Mudra Shishu, and PMEGP.',
      profile: {
        ...currentProfile,
        name: 'Sunita Devi',
        state: 'Bihar',
        age: 36,
        gender: 'Female',
        occupation: 'Self-Employed / Business',
        annualIncome: 90000,
        socialCategory: 'SC',
        educationLevel: 'Below 10th',
        isStudent: false,
        isFarmer: false,
        hasBplCard: true,
      }
    },
    {
      id: 'senior_ap',
      name: 'Ramchandra Rao',
      role: 'Senior Citizen, Andhra Pradesh',
      state: 'Andhra Pradesh',
      age: 72,
      income: 80000,
      icon: HeartHandshake,
      demographics: 'General • Male • Age 72 • BPL Cardholder',
      description: 'Senior citizen qualifying for Ayushman Bharat (70+) Vay Vandana Card and state social security.',
      profile: {
        ...currentProfile,
        name: 'Ramchandra Rao',
        state: 'Andhra Pradesh',
        age: 72,
        gender: 'Male',
        occupation: 'Retired',
        annualIncome: 80000,
        socialCategory: 'General',
        educationLevel: 'Secondary (10th Pass)',
        isStudent: false,
        isFarmer: false,
        hasBplCard: true,
      }
    }
  ];

  const handleApplyPersona = (p: PersonaOption) => {
    onSelectProfile(p.profile);
    onClose();
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectProfile({
      ...currentProfile,
      name: customName.trim() || 'Citizen',
      state: customState,
      occupation: customOccupation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        id="citizen-signin-modal"
        className="bg-[#FAF9F5] rounded-3xl border border-[#DFDACD] shadow-2xl max-w-2xl w-full overflow-hidden animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-[#08110D] text-white p-6 sm:p-7 relative border-b border-[#155C45]/30">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D88932] bg-[#D88932]/10 border border-[#D88932]/30 px-2 py-0.5 rounded">
              e-Pramaan Authentication
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Digital Identity Verification</span>
            </span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Citizen Digital Profile Authentication
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 font-light max-w-lg">
            Switch between authentic citizen archetypes to test real-world eligibility calculations across diverse income, caste, state, and landholding scenarios.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Preset Demo Personas Styled Like Official Credentials */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E]">
                AUTHENTIC CITIZEN ARCHETYPES
              </span>
              <span className="text-[11px] font-mono text-[#155C45]">Instant 1-Click Dossier Switch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personas.map((persona) => {
                const Icon = persona.icon;
                const isSelected = currentProfile.name === persona.name;
                return (
                  <div
                    key={persona.id}
                    className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#155C45] bg-white ring-2 ring-[#155C45]/20 shadow-md'
                        : 'border-[#DFDACD] bg-white hover:border-[#155C45]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-[#DFDACD] flex items-center justify-center text-[#155C45]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <strong className="font-editorial text-base font-bold text-[#08110D] block leading-tight">
                              {persona.name}
                            </strong>
                            <span className="text-[11px] font-mono text-[#6C746E] block">
                              {persona.role}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-[#155C45] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DB] mb-3">
                        <span className="text-[10px] font-mono text-[#545B56] block">
                          {persona.demographics}
                        </span>
                      </div>

                      <p className="text-xs text-[#6C746E] font-light leading-relaxed">
                        {persona.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyPersona(persona)}
                      className={`mt-4 w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#155C45] text-white'
                          : 'bg-[#08110D] hover:bg-[#155C45] text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Currently Authenticated' : 'Authenticate as this Citizen'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Profile Input Option */}
          <div className="pt-5 border-t border-[#EAE6DB]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block mb-3">
              OR DEFINE CUSTOM PROFILE SPECIFICATION
            </span>

            <form onSubmit={handleSaveCustom} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#08110D] mb-1">Citizen Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFDACD] bg-white text-xs text-[#08110D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#08110D] mb-1">State / UT</label>
                <input
                  type="text"
                  value={customState}
                  onChange={(e) => setCustomState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFDACD] bg-white text-xs text-[#08110D]"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white font-bold text-xs transition cursor-pointer"
                >
                  Save Custom Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
