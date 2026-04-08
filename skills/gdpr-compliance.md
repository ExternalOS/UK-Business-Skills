---
name: gdpr-compliance
description: Generate UK/EU GDPR compliance documents — privacy policies, cookie policies, DPIAs, ROPA, DSAR responses, data breach notifications, and consent forms. Use when a business needs GDPR documentation, data protection policies, or privacy compliance.
user-invocable: true
argument-hint: "[business type] [document needed] or describe your data protection situation"
---

# GDPR Privacy Policy & Compliance Document Generator (Lite)

You generate comprehensive, tailored GDPR compliance documentation for UK and EU businesses. Your output should be implementation-ready — not generic templates, but documents customised to the business's sector and data processing activities.

**DISCLAIMER (include in every output):** "This generates GDPR compliance document templates based on UK GDPR, the Data Protection Act 2018, and ICO guidance. Documents should be reviewed by a data protection professional or solicitor before implementation. This is not legal advice."

---

## Legal Framework

All documents must comply with and reference:

- **UK GDPR** — retained EU GDPR as amended by the Data Protection Act 2018
- **Data Protection Act 2018** — UK's implementation
- **Privacy and Electronic Communications Regulations 2003** (PECR) — cookies, electronic marketing
- **ICO Guidance** — Information Commissioner's Office codes of practice

### Key Article References

- **Article 5** — Data protection principles
- **Article 6** — Lawful bases for processing
- **Article 9** — Special category data
- **Article 12-14** — Transparency and information obligations
- **Article 15-22** — Data subject rights
- **Article 28** — Processor obligations and DPA requirements
- **Article 30** — Records of processing activities (ROPA)
- **Article 33** — Breach notification to supervisory authority (72 hours)
- **Article 35** — Data protection impact assessments (DPIA)

---

## Privacy Policy Structure

```markdown
# Privacy Policy

**Last updated:** [DATE]
**Data Controller:** [COMPANY NAME], [REGISTERED ADDRESS]

## 1. Who We Are
## 2. What Information We Collect
## 3. How We Collect Your Information
## 4. How We Use Your Information

| Purpose | Data Used | Lawful Basis |
|---------|-----------|--------------|
| Processing your order | Identity, Contact, Financial | Contract performance (Art 6(1)(b)) |
| Sending marketing | Identity, Contact | Consent (Art 6(1)(a)) |

## 5. Who We Share Your Data With
## 6. International Transfers
## 7. How Long We Keep Your Data
## 8. Your Rights
- Access (Art 15) — respond within 30 days
- Rectification (Art 16)
- Erasure (Art 17)
- Restrict processing (Art 18)
- Data portability (Art 20)
- Object to processing (Art 21)
- Withdraw consent (Art 7(3))

## 9. Complaints
ICO: ico.org.uk / 0303 123 1113

## 10. Changes to This Policy
```

---

## Lawful Basis Quick Reference

| Processing Activity | Likely Lawful Basis |
|---|---|
| Marketing emails (existing customers) | Legitimate Interest (soft opt-in, PECR Reg 22) |
| Marketing emails (prospects) | Consent |
| Employment records | Legal obligation / Contract |
| Website analytics (cookies) | Consent (PECR Reg 6) |
| CCTV | Legitimate Interest |
| Customer purchase records | Contract performance |

---

*This is the lite version. The full version includes the complete Lawful Basis Matrix with 13 processing activities, all 8 document types (Privacy Policy, Employee/Customer/Supplier Privacy Notices, Cookie Policy, Data Processing Agreement, DPIA template, ROPA template, Data Breach Notification procedure, DSAR response templates, Consent Forms, Legitimate Interest Assessment, Data Retention Schedule), sector-specific adaptations, international transfer safeguards guidance, and the children's data special provisions. Available at https://gumroad.com/l/PLACEHOLDER-legal.*
