import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, Users, ShieldCheck } from 'lucide-react';
import { Scheme, FamilyMember, Language } from '../types';
import { getTranslation } from '../services/translations';
import { getLocalizedScheme } from '../services/schemeLocalization';

interface FamilyFinderViewProps {
  schemes: Scheme[];
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
}

export const FamilyFinderView: React.FC<FamilyFinderViewProps> = ({
  schemes,
  language,
  onViewDetails,
}) => {
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Self', relation: 'Self', age: 24, occupation: 'Student' },
    { id: '2', name: 'Father', relation: 'Father', age: 52, occupation: 'Farmer' },
    { id: '3', name: 'Mother', relation: 'Mother', age: 48, occupation: 'Homemaker' },
    { id: '4', name: 'Grandfather', relation: 'Grandfather', age: 74, occupation: 'Retired' },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [newMemberAge, setNewMemberAge] = useState<number>(20);
  const [newMemberOccupation, setNewMemberOccupation] = useState('Student');

  const t = (key: string) => getTranslation(key, language);

  const addMember = () => {
    if (!newMemberName.trim() || !newMemberRelation.trim()) return;
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: newMemberName,
      relation: newMemberRelation,
      age: newMemberAge,
      occupation: newMemberOccupation,
    };
    setMembers((prev) => [...prev, newMember]);
    setNewMemberName('');
    setNewMemberRelation('');
    setNewMemberAge(20);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const getSchemesForMember = (member: FamilyMember) => {
    return schemes.filter((scheme) => {
      const rules = scheme.eligibilityRules;
      if (rules.minAge && member.age < rules.minAge) return false;
      if (rules.maxAge && member.age > rules.maxAge) return false;
      if (member.age >= 60 && (scheme.category === 'Senior Citizens' || scheme.category === 'Social Welfare')) {
        return true;
      }
      if (rules.occupations && rules.occupations.length > 0) {
        if (rules.occupations.includes(member.occupation as any)) return true;
        if (rules.requiresFarmer && member.occupation === 'Farmer') return true;
      }
      if (scheme.category === 'Healthcare') return true;
      if (['Mother', 'Daughter', 'Sister', 'Wife'].includes(member.relation) && scheme.category === 'Women') return true;
      if (member.occupation === 'Student' && (scheme.category === 'Students' || scheme.category === 'Education')) return true;

      return false;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#155C45] block mb-2">
          HOUSEHOLD ENTITLEMENT MAPPING
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08110D] tracking-tight">
          Family Entitlement Matrix
        </h1>
        <p className="text-sm sm:text-base text-[#545B56] mt-1 font-light max-w-2xl">
          Map your entire household to unlock compound benefits across healthcare, agricultural subsidies, educational scholarships, and old-age social security.
        </p>
      </div>

      {/* Add family member protocol bar */}
      <div className="bg-white rounded-2xl border border-[#DFDACD] p-6 mb-8 shadow-xs">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#155C45] mb-4 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#155C45]" />
          <span>Add Household Dependent / Member</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-mono text-[11px] text-[#08110D] font-bold mb-1">Full Name</label>
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="e.g. Ramesh / Kavitha"
              className="w-full px-3 py-2 rounded-xl border border-[#DFDACD] bg-[#FAF9F5] focus:border-[#155C45] focus:outline-hidden text-xs text-[#08110D]"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#08110D] font-bold mb-1">Relationship</label>
            <input
              type="text"
              value={newMemberRelation}
              onChange={(e) => setNewMemberRelation(e.target.value)}
              placeholder="e.g. Sister, Grandfather"
              className="w-full px-3 py-2 rounded-xl border border-[#DFDACD] bg-[#FAF9F5] focus:border-[#155C45] focus:outline-hidden text-xs text-[#08110D]"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#08110D] font-bold mb-1">Age</label>
            <input
              type="number"
              value={newMemberAge}
              onChange={(e) => setNewMemberAge(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-[#DFDACD] bg-[#FAF9F5] focus:border-[#155C45] focus:outline-hidden text-xs text-[#08110D]"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#08110D] font-bold mb-1">Occupation</label>
            <select
              value={newMemberOccupation}
              onChange={(e) => setNewMemberOccupation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DFDACD] bg-[#FAF9F5] focus:border-[#155C45] focus:outline-hidden text-xs text-[#08110D]"
            >
              <option value="Student">Student</option>
              <option value="Farmer">Farmer / Cultivator</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Retired">Senior / Retired</option>
              <option value="Employee">Salaried Employee</option>
              <option value="Business">Small Trader / Micro Business</option>
              <option value="Daily Wage / Laborer">Daily Wage Laborer</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={addMember}
              className="w-full py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Member</span>
            </button>
          </div>
        </div>
      </div>

      {/* Household Members Entitlement Cards */}
      <div className="space-y-6">
        {members.map((member) => {
          const matchedSchemes = getSchemesForMember(member);
          return (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-[#DFDACD] p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE6DB] pb-4 mb-5 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] text-[#155C45] border border-[#DFDACD] font-editorial text-base font-bold flex items-center justify-center">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-editorial text-lg font-bold text-[#08110D]">{member.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#FAF9F5] text-[#6C746E] border border-[#EAE6DB]">
                        {member.relation}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#6C746E] mt-0.5">
                      Age: {member.age} • {member.occupation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {matchedSchemes.length} Eligible Programs
                  </span>
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(member.id)}
                      className="p-1.5 text-[#88908A] hover:text-rose-600 cursor-pointer transition"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Matched schemes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedSchemes.map((origScheme, sIdx) => {
                  const scheme = getLocalizedScheme(origScheme, language);
                  return (
                    <div
                      key={`${scheme.id}-${scheme.recordId || sIdx}`}
                      onClick={() => onViewDetails(origScheme)}
                      className="p-4 rounded-xl border border-[#DFDACD] hover:border-[#155C45] bg-[#FAF9F5] hover:bg-white transition cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#6C746E] mb-1.5">
                          <span>{scheme.governmentLevel}</span>
                          <span className="text-[#155C45] font-bold">Verified</span>
                        </div>
                        <h5 className="font-editorial text-sm font-bold text-[#08110D] leading-snug">{scheme.name}</h5>
                        <p className="text-xs font-bold text-[#155C45] mt-1.5">{scheme.mainBenefit}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#EAE6DB] text-[11px] text-[#08110D] font-mono font-bold flex items-center justify-between">
                        <span>View Dossier</span>
                        <ArrowRight className="w-3 h-3 text-[#155C45]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
