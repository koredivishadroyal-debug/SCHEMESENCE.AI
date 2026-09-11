import { Scheme, UserProfile, RuleEvaluationResult, EligibilityVerdict } from '../types';

export function evaluateSchemeEligibility(scheme: Scheme, profile: UserProfile): RuleEvaluationResult {
  const whyYouMatch: string[] = [];
  const needsVerification: string[] = [];
  const missingRequirements: string[] = [];
  const actionAdvice: string[] = [];

  let totalRulePoints = 0;
  let earnedRulePoints = 0;

  const rules = scheme.eligibilityRules;

  // 1. Age Rule
  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    totalRulePoints += 20;
    const min = rules.minAge ?? 0;
    const max = rules.maxAge ?? 120;
    if (profile.age >= min && profile.age <= max) {
      earnedRulePoints += 20;
      whyYouMatch.push(`Age criterion satisfied: You are ${profile.age} years old (required: ${min}${rules.maxAge ? ` - ${max}` : '+'} years).`);
    } else {
      missingRequirements.push(`Age mismatch: You are ${profile.age} years old, but scheme requires age between ${min} and ${max} years.`);
      actionAdvice.push(`Check if a family member within the ${min}-${max} age range can apply as the primary applicant.`);
    }
  }

  // 2. State Rule
  if (scheme.state !== 'All-India') {
    totalRulePoints += 20;
    if (profile.state.toLowerCase() === scheme.state.toLowerCase()) {
      earnedRulePoints += 20;
      whyYouMatch.push(`State domicile matched: Scheme is applicable in ${scheme.state}, where you reside.`);
    } else {
      missingRequirements.push(`State restriction: Scheme is exclusively for residents of ${scheme.state} (your profile is set to ${profile.state}).`);
      actionAdvice.push(`Browse equivalent Central or ${profile.state} state welfare schemes.`);
    }
  } else {
    // All India scheme
    whyYouMatch.push(`Pan-India scheme: Open to eligible citizens across all States and Union Territories including ${profile.state}.`);
  }

  // 3. Gender Rule
  if (rules.gender && rules.gender !== 'Any') {
    totalRulePoints += 15;
    if (profile.gender === rules.gender) {
      earnedRulePoints += 15;
      whyYouMatch.push(`Gender requirement matched: Designated for ${rules.gender} applicants.`);
    } else {
      missingRequirements.push(`Designated gender criterion: Scheme is tailored for ${rules.gender} applicants (your profile is ${profile.gender}).`);
      actionAdvice.push(`Eligible female household members (mother, daughter, sister) can apply.`);
    }
  }

  // 4. Occupation Rule
  if (rules.occupations && rules.occupations.length > 0) {
    totalRulePoints += 20;
    if (rules.occupations.includes(profile.occupation)) {
      earnedRulePoints += 20;
      whyYouMatch.push(`Occupation matched: Your category (${profile.occupation}) is explicitly targeted.`);
    } else if (rules.requiresFarmer && profile.occupation !== 'Farmer') {
      missingRequirements.push(`Farmer status required: Scheme is intended for active farmers/agricultural landholders.`);
      actionAdvice.push(`If you own agricultural land or cultivate crops part-time, update your occupational status.`);
    } else {
      needsVerification.push(`Occupation alignment: Scheme lists ${rules.occupations.join(', ')}. As a ${profile.occupation}, you may need additional certification or self-employment declaration.`);
      actionAdvice.push(`Verify if your trade or work aligns with secondary qualifying trades listed in official guidelines.`);
    }
  }

  // 5. Income Ceiling Rule
  if (rules.maxIncome !== undefined) {
    totalRulePoints += 20;
    if (profile.annualIncome <= rules.maxIncome) {
      earnedRulePoints += 20;
      whyYouMatch.push(`Income ceiling satisfied: Your family income (₹${profile.annualIncome.toLocaleString('en-IN')}/yr) is within the maximum limit of ₹${rules.maxIncome.toLocaleString('en-IN')}/yr.`);
    } else {
      missingRequirements.push(`Income limit exceeded: Your stated annual income (₹${profile.annualIncome.toLocaleString('en-IN')}) exceeds the ceiling of ₹${rules.maxIncome.toLocaleString('en-IN')}.`);
      actionAdvice.push(`Review non-means-tested or universal welfare schemes that have no income cutoff.`);
    }
  }

  // 6. Social Category / Caste Rule
  if (rules.socialCategories && rules.socialCategories.length > 0) {
    totalRulePoints += 15;
    if (rules.socialCategories.includes(profile.socialCategory)) {
      earnedRulePoints += 15;
      whyYouMatch.push(`Social category matched: Your category (${profile.socialCategory}) is covered under notified quotas.`);
    } else {
      needsVerification.push(`Social category quota: Scheme specifies categories (${rules.socialCategories.join(', ')}). Your profile is ${profile.socialCategory}.`);
    }
  }

  // 7. Land Ownership (if farmer/land specific)
  if (rules.requiresFarmer || rules.maxLandAcres !== undefined) {
    totalRulePoints += 15;
    if (profile.landOwnershipAcres > 0) {
      earnedRulePoints += 15;
      whyYouMatch.push(`Agricultural landholding confirmed: You registered ${profile.landOwnershipAcres} acres of land.`);
    } else {
      needsVerification.push(`Land ownership verification: You indicated 0 acres. Scheme requires valid Pattadar / Record of Rights (RoR) title in family name.`);
      actionAdvice.push(`Check if land title is registered in your parent's name or if tenant farmer certification applies in your state.`);
    }
  }

  // 8. Disability Specific
  if (rules.speciallyAbledOnly) {
    totalRulePoints += 25;
    if (profile.speciallyAbled) {
      earnedRulePoints += 25;
      whyYouMatch.push(`Disability empowerment criterion satisfied: Profile marked as Specially Abled / Divyangjan.`);
    } else {
      missingRequirements.push(`Specific beneficiary scheme: Exclusively for persons with disabilities (minimum 40% benchmark disability).`);
    }
  }

  // 9. Housing Status
  if (rules.housingStatusAllowed && rules.housingStatusAllowed.length > 0) {
    totalRulePoints += 15;
    if (rules.housingStatusAllowed.includes(profile.housingStatus)) {
      earnedRulePoints += 15;
      whyYouMatch.push(`Housing status condition satisfied: Registered as '${profile.housingStatus}'.`);
    } else {
      needsVerification.push(`Housing status check: Scheme prioritizes families in Kutcha houses or without a permanent pucca house.`);
    }
  }

  // Mandatory Document readiness verification
  const mandatoryDocs = scheme.requiredDocuments.filter((d) => d.isMandatory);
  if (mandatoryDocs.length > 0) {
    needsVerification.push(`Document readiness: Ensure you have ${mandatoryDocs.map((d) => d.name).slice(0, 2).join(', ')} ready before submitting.`);
  }

  // Calculate Match Score
  const basePoints = totalRulePoints > 0 ? (earnedRulePoints / totalRulePoints) * 100 : 80;
  const aiMatchScore = Math.min(98, Math.max(15, Math.round(basePoints)));

  // Determine Category Verdict
  let verdict: EligibilityVerdict = 'LIKELY_ELIGIBLE';

  if (missingRequirements.length > 0) {
    if (missingRequirements.length >= 2 || aiMatchScore < 50) {
      verdict = 'LIKELY_NOT_ELIGIBLE';
    } else {
      verdict = 'POSSIBLY_ELIGIBLE';
    }
  } else if (needsVerification.length > 0 && aiMatchScore < 85) {
    verdict = 'POSSIBLY_ELIGIBLE';
  } else {
    verdict = 'LIKELY_ELIGIBLE';
  }

  if (actionAdvice.length === 0) {
    actionAdvice.push('Collect your official certificates (Aadhaar, Income, Residence) and proceed to the verified government application portal.');
  }

  return {
    schemeId: scheme.id,
    verdict,
    aiMatchScore,
    whyYouMatch,
    needsVerification,
    missingRequirements,
    actionAdvice,
  };
}
