import { jsPDF } from 'jspdf';
import { Scheme, DocumentStatus, UserProfile } from '../types';

export interface PdfExportOptions {
  includeApplicationSteps?: boolean;
  includeEligibilityCriteria?: boolean;
  includeDocumentReadiness?: boolean;
  applicantName?: string;
  applicantNotes?: string;
}

/**
 * Sanitizes text to remove non-Latin characters if default jsPDF font is used,
 * ensuring high-quality, crisp rendering without broken glyphs.
 */
function sanitizeForPdf(text: string | undefined | null): string {
  if (!text) return '';
  // Replace characters outside printable ASCII / Latin-1 with sensible equivalents
  return text
    .replace(/[₹]/g, 'Rs. ')
    .replace(/[•]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, '-')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates and downloads an official Scheme Documents & Application Checklist PDF directly to the user's device.
 */
export function exportSchemeDocumentsToPdf(
  scheme: Scheme,
  documentStatuses: Record<string, DocumentStatus> = {},
  userProfile?: UserProfile,
  options: PdfExportOptions = {}
): { fileName: string; totalDocs: number; availableDocs: number } {
  const {
    includeApplicationSteps = true,
    includeEligibilityCriteria = true,
    includeDocumentReadiness = true,
    applicantName = userProfile?.state ? `Citizen (${userProfile.state})` : 'Citizen Applicant',
    applicantNotes = '',
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm
  let currentY = 12;

  // Helper to manage page breaks
  const checkPageBreak = (spaceNeeded: number) => {
    if (currentY + spaceNeeded > pageHeight - 18) {
      doc.addPage();
      currentY = 14;
      renderRunningHeader();
    }
  };

  const renderRunningHeader = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 145);
    doc.text(
      'SchemeSense AI - Official Government Scheme Documents & Application Checklist',
      marginX,
      currentY
    );
    doc.text(
      sanitizeForPdf(scheme.name).substring(0, 45),
      pageWidth - marginX,
      currentY,
      { align: 'right' }
    );
    currentY += 2.5;
    doc.setDrawColor(220, 226, 235);
    doc.setLineWidth(0.3);
    doc.line(marginX, currentY, pageWidth - marginX, currentY);
    currentY += 6;
  };

  // --- 1. COVER / HEADER BANNER ---
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(marginX, currentY, contentWidth, 26, 2, 2, 'F');

  // Accent bar on top of card
  doc.setFillColor(13, 148, 136); // teal-600
  doc.rect(marginX, currentY, contentWidth, 2.5, 'F');

  // Header texts
  doc.setTextColor(204, 251, 241); // teal-100
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(
    'CITIZEN APPLICATION DOSSIER & REQUIRED DOCUMENTS CHECKLIST',
    marginX + 4,
    currentY + 7
  );

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12.5);
  const schemeTitle = sanitizeForPdf(scheme.name);
  const splitTitle = doc.splitTextToSize(schemeTitle, contentWidth - 8);
  doc.text(splitTitle[0] || schemeTitle, marginX + 4, currentY + 13.5);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const deptText = sanitizeForPdf(
    `${scheme.ministry || scheme.department} | ${scheme.governmentLevel} Level (${scheme.unionTerritory || scheme.state || 'All-India'})`
  );
  doc.text(deptText, marginX + 4, currentY + 19);

  // Verification & Category Badge on the right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text('[ VERIFIED OFFICIAL ]', pageWidth - marginX - 4, currentY + 8, {
    align: 'right',
  });
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Category: ${sanitizeForPdf(scheme.category)}`,
    pageWidth - marginX - 4,
    currentY + 13.5,
    { align: 'right' }
  );
  doc.text(
    `Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
    pageWidth - marginX - 4,
    currentY + 19,
    { align: 'right' }
  );

  currentY += 30;

  // --- 2. SUMMARY SPECIFICATION MATRIX ---
  const boxHeight = 19;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.roundedRect(marginX, currentY, contentWidth, boxHeight, 1.5, 1.5, 'FD');

  const colWidth = contentWidth / 4;

  // Col 1: Main Benefit
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('PRIMARY BENEFIT', marginX + 3, currentY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  const benefitLines = doc.splitTextToSize(
    sanitizeForPdf(scheme.mainBenefit),
    colWidth - 5
  );
  doc.text(benefitLines.slice(0, 2), marginX + 3, currentY + 9);

  // Col 2: Fees & Mode
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('OFFICIAL FEE & MODE', marginX + colWidth + 2, currentY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    sanitizeForPdf(scheme.fees || 'Free (Rs. 0)').substring(0, 24),
    marginX + colWidth + 2,
    currentY + 9
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Mode: ${sanitizeForPdf(scheme.applicationMode || 'Online Portal')}`,
    marginX + colWidth + 2,
    currentY + 14
  );

  // Col 3: Deadline & Processing
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('DEADLINE & TIME', marginX + colWidth * 2 + 2, currentY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    sanitizeForPdf(scheme.deadline || 'Open / Rolling').substring(0, 24),
    marginX + colWidth * 2 + 2,
    currentY + 9
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Time: ${sanitizeForPdf(scheme.processingTime || 'Standard')}`,
    marginX + colWidth * 2 + 2,
    currentY + 14
  );

  // Col 4: Official Portal & Helpline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('OFFICIAL CONTACT', marginX + colWidth * 3 + 2, currentY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(13, 148, 136);
  doc.text(
    `Helpline: ${sanitizeForPdf(scheme.helpline || '1800')}`,
    marginX + colWidth * 3 + 2,
    currentY + 9
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  const portalShort = scheme.officialUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  doc.text(
    portalShort.substring(0, 24),
    marginX + colWidth * 3 + 2,
    currentY + 14
  );

  currentY += boxHeight + 6;

  // --- 3. DOCUMENT READINESS STATUS BANNER ---
  const allDocs = [
    ...(scheme.requiredDocuments || []),
    ...(scheme.optionalDocuments || []),
  ];
  const totalDocs = allDocs.length;
  const availableDocs = allDocs.filter(
    (d) => (documentStatuses[d.id] || 'Available') === 'Available'
  ).length;
  const needToApplyDocs = allDocs.filter(
    (d) => documentStatuses[d.id] === 'Need to Apply'
  ).length;
  const notAvailableDocs = allDocs.filter(
    (d) => documentStatuses[d.id] === 'Not Available'
  ).length;

  if (includeDocumentReadiness && totalDocs > 0) {
    checkPageBreak(14);
    doc.setFillColor(240, 253, 250); // teal-50
    doc.setDrawColor(153, 246, 228); // teal-200
    doc.setLineWidth(0.3);
    doc.roundedRect(marginX, currentY, contentWidth, 10, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 118, 110);
    doc.text('CITIZEN DOCUMENT READINESS STATUS:', marginX + 3, currentY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const summaryStr = `Total: ${totalDocs} Docs  |  Ready: ${availableDocs}  |  Need to Apply: ${needToApplyDocs}  |  Pending: ${notAvailableDocs}`;
    doc.text(summaryStr, marginX + 68, currentY + 6.5);

    currentY += 14;
  }

  // --- 4. REQUIRED DOCUMENTS SECTION (CORE FEATURE) ---
  checkPageBreak(25);

  // Section Header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(marginX, currentY, contentWidth, 7.5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. MANDATORY & SUPPORTING DOCUMENTS CHECKLIST', marginX + 3, currentY + 5.2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Keep self-attested copies ready before online submission or CSC visit',
    pageWidth - marginX - 3,
    currentY + 5.2,
    { align: 'right' }
  );

  currentY += 10;

  if (allDocs.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'No specific documents are officially listed as mandatory for this scheme.',
      marginX + 2,
      currentY + 4
    );
    currentY += 10;
  } else {
    allDocs.forEach((docItem, index) => {
      // Estimate height needed for this document entry
      const whyLines = doc.splitTextToSize(
        `Why Needed: ${sanitizeForPdf(docItem.whyNeeded)}`,
        contentWidth - 34
      );
      const howLines = doc.splitTextToSize(
        `Where to Obtain / Issuing Authority: ${sanitizeForPdf(docItem.howToObtain)}`,
        contentWidth - 34
      );
      const cardHeight = 14 + whyLines.length * 3.5 + howLines.length * 3.5 + 4;

      checkPageBreak(cardHeight + 2);

      const status = documentStatuses[docItem.id] || 'Available';
      const isMandatory = docItem.isMandatory !== false;

      // Card boundary
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.roundedRect(marginX, currentY, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      // Left checkbox box for physical verification
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.rect(marginX + 3, currentY + 3.5, 4, 4); // Checkbox

      // Document Number & Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      const docTitle = `${index + 1}. ${sanitizeForPdf(docItem.name)}`;
      doc.text(docTitle, marginX + 10, currentY + 6.5);

      // Mandatory / Optional Badge
      const titleWidth = doc.getTextWidth(docTitle);
      doc.setFontSize(6.5);
      if (isMandatory) {
        doc.setFillColor(254, 242, 242);
        doc.setDrawColor(254, 202, 202);
        doc.roundedRect(marginX + 12 + titleWidth, currentY + 3.5, 18, 4, 0.5, 0.5, 'FD');
        doc.setTextColor(185, 28, 28);
        doc.text('MANDATORY', marginX + 13 + titleWidth, currentY + 6.3);
      } else {
        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(marginX + 12 + titleWidth, currentY + 3.5, 16, 4, 0.5, 0.5, 'FD');
        doc.setTextColor(71, 85, 105);
        doc.text('OPTIONAL', marginX + 13 + titleWidth, currentY + 6.3);
      }

      // Status Indicator on the right
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      if (status === 'Available') {
        doc.setTextColor(16, 185, 129); // emerald
        doc.text('[ Ready / Available ]', pageWidth - marginX - 3, currentY + 6.5, {
          align: 'right',
        });
      } else if (status === 'Need to Apply') {
        doc.setTextColor(217, 119, 6); // amber
        doc.text('[ Need to Apply ]', pageWidth - marginX - 3, currentY + 6.5, {
          align: 'right',
        });
      } else {
        doc.setTextColor(225, 29, 72); // rose
        doc.text('[ Not Available ]', pageWidth - marginX - 3, currentY + 6.5, {
          align: 'right',
        });
      }

      // Content Lines: Why needed
      let innerY = currentY + 11;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      whyLines.forEach((line: string) => {
        doc.text(line, marginX + 10, innerY);
        innerY += 3.5;
      });

      // Where to obtain / issuing authority
      doc.setTextColor(51, 65, 85);
      howLines.forEach((line: string) => {
        doc.text(line, marginX + 10, innerY);
        innerY += 3.5;
      });

      // Official link if present
      if (docItem.officialLink) {
        doc.setTextColor(13, 148, 136);
        doc.setFont('helvetica', 'italic');
        const linkClean = sanitizeForPdf(docItem.officialLink);
        doc.text(`Official Link: ${linkClean}`, marginX + 10, innerY);
        innerY += 3.5;
      }

      currentY += cardHeight + 3;
    });
  }

  // --- 5. APPLICATION ROADMAP (STEPS) ---
  if (includeApplicationSteps && scheme.applicationSteps && scheme.applicationSteps.length > 0) {
    checkPageBreak(25);
    currentY += 2;

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(marginX, currentY, contentWidth, 7.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('2. STEP-BY-STEP APPLICATION PROCEDURE', marginX + 3, currentY + 5.2);

    currentY += 10;

    scheme.applicationSteps.forEach((step) => {
      const descLines = doc.splitTextToSize(
        sanitizeForPdf(step.description),
        contentWidth - 18
      );
      const stepHeight = 9 + descLines.length * 3.5;

      checkPageBreak(stepHeight + 2);

      // Step number circle badge
      doc.setFillColor(13, 148, 136);
      doc.circle(marginX + 4, currentY + 4, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(`${step.stepNumber}`, marginX + 4, currentY + 5, { align: 'center' });

      // Step title
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(sanitizeForPdf(step.title), marginX + 10, currentY + 5);

      // Step description
      let stepY = currentY + 9;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      descLines.forEach((line: string) => {
        doc.text(line, marginX + 10, stepY);
        stepY += 3.5;
      });

      if (step.portalUrl) {
        doc.setTextColor(13, 148, 136);
        doc.setFont('helvetica', 'italic');
        doc.text(
          `Portal: ${sanitizeForPdf(step.portalUrl)}`,
          marginX + 10,
          stepY
        );
        stepY += 3.5;
      }

      currentY = stepY + 2;
    });
  }

  // --- 6. ELIGIBILITY CONDITIONS SUMMARY ---
  if (
    includeEligibilityCriteria &&
    scheme.eligibilityRules &&
    scheme.eligibilityRules.customConditions &&
    scheme.eligibilityRules.customConditions.length > 0
  ) {
    checkPageBreak(25);
    currentY += 2;

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(marginX, currentY, contentWidth, 7.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('3. KEY ELIGIBILITY CRITERIA & QUALIFYING CONDITIONS', marginX + 3, currentY + 5.2);

    currentY += 10;

    scheme.eligibilityRules.customConditions.forEach((cond, idx) => {
      const condLines = doc.splitTextToSize(
        `${idx + 1}. ${sanitizeForPdf(cond)}`,
        contentWidth - 6
      );
      checkPageBreak(condLines.length * 4 + 2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      condLines.forEach((line: string) => {
        doc.text(line, marginX + 3, currentY);
        currentY += 3.5;
      });
      currentY += 1;
    });
  }

  // --- 7. VERIFICATION / SIGN-OFF BLOCK ---
  checkPageBreak(28);
  currentY += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 22, 1, 1, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('CITIZEN DECLARATION & PHYSICAL SUBMISSION ACKNOWLEDGEMENT', marginX + 3, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Applicant: ${sanitizeForPdf(applicantName)}  |  Notes: ${sanitizeForPdf(applicantNotes || 'None specified')}`,
    marginX + 3,
    currentY + 9.5
  );

  doc.text(
    'Citizen Signature / Thumb Impression: ___________________________',
    marginX + 3,
    currentY + 17
  );
  doc.text(
    'CSC / Verification Officer Seal & Date: ___________________________',
    pageWidth - marginX - 3,
    currentY + 17,
    { align: 'right' }
  );

  currentY += 26;

  // --- 8. OFFICIAL SECURITY ADVISORY & FOOTER ---
  checkPageBreak(18);
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(251, 191, 36); // amber-400
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 12, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(146, 64, 14);
  doc.text('OFFICIAL SECURITY & APPLICATION NOTICE:', marginX + 3, currentY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text(
    '1. Always verify government URLs end in .gov.in or .nic.in before entering personal details.',
    marginX + 3,
    currentY + 8
  );
  doc.text(
    '2. Never share Aadhaar OTP or bank PIN. SchemeSense AI does not charge any citizen fee for guidance.',
    marginX + 3,
    currentY + 11
  );

  // --- 9. NUMBER ALL PAGES ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Generated by SchemeSense AI Platform  |  Official Reference Document`,
      marginX,
      pageHeight - 6
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - marginX,
      pageHeight - 6,
      { align: 'right' }
    );
  }

  // File name formatting
  const sanitizedSchemeName = scheme.name
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/__+/g, '_')
    .substring(0, 32);
  const fileName = `${sanitizedSchemeName}_Required_Documents_Checklist.pdf`;

  // DIRECT SAVE TO USER DEVICE
  doc.save(fileName);

  return {
    fileName,
    totalDocs,
    availableDocs,
  };
}
