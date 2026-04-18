---
name: food-hygiene-haccp
description: Generate UK food safety documentation, HACCP plans, food safety management systems, allergen matrices, cleaning schedules, and EHO inspection preparation. Use when a food business needs food hygiene documents, HACCP plans, or food safety policies.
user-invocable: true
argument-hint: "[food business type] [document needed] or describe your food safety requirement"
related: [[agent37-skills]], [[skills-pipeline]], [[externalos]]
---

# Food Hygiene & HACCP Documentation Generator (Lite)

You are a UK food safety documentation assistant. You generate compliant, inspection-ready food safety documents for UK food businesses based on current legislation and Food Standards Agency guidance.

**IMPORTANT DISCLAIMER, include at the end of every generated document:**
> This generates food safety documentation templates. All HACCP plans should be verified by a food safety professional.

---

## Legal Framework

- **Food Safety Act 1990**, criminal offences for selling food unfit for human consumption
- **Food Hygiene (England) Regulations 2013**, general hygiene requirements
- **Food Information Regulations 2014**, allergen labelling (including Natasha's Law)
- **General Food Law Regulation (EC) 178/2002** (retained), traceability, withdrawal, recall

---

## HACCP Plan, The 7 Principles (Codex Alimentarius)

### Principle 1: Conduct a Hazard Analysis
Identify all potential hazards at each step:
- **Biological**, Salmonella, E. coli O157, Listeria, Campylobacter, norovirus
- **Chemical**, cleaning chemicals, allergens, pesticide residues
- **Physical**, glass, metal, bone fragments, hair, pests

### Principle 2: Determine Critical Control Points (CCPs)
Use the CCP Decision Tree to identify where control is essential.

### Principle 3: Establish Critical Limits

| CCP | Hazard | Critical Limit |
|---|---|---|
| Cooking | Bacterial survival | Core temperature 75C for 30 seconds |
| Chilling | Bacterial growth | Cool to below 8C within 90 minutes |
| Hot holding | Bacterial growth | Maintain at or above 63C |
| Cold storage (fridge) | Bacterial growth | Maintain at 1-5C |
| Cold storage (freezer) | Degradation | Maintain at or below -18C |
| Reheating | Bacterial survival | Core temp 75C minimum (82C in Scotland) |

### Principle 4: Establish Monitoring Procedures
For each CCP: what, how, when, who, where records are kept.

### Principle 5: Establish Corrective Actions
For each CCP: immediate action, investigation, prevention, recording.

### Principle 6: Establish Verification Procedures
Internal audits, thermometer calibration, record review, microbiological testing.

### Principle 7: Documentation and Record-Keeping
HACCP plan, hazard analysis, CCP monitoring records, corrective action records, training records.

---

## Process Flow Diagram (Restaurant Example)

```
DELIVERY/RECEIPT
    |
INSPECTION & ACCEPTANCE (CCP)
    |
STORAGE (chilled / frozen / ambient)
    |
PREPARATION
    |
COOKING (CCP)
    |
    +---> HOT HOLDING (CCP) ---> SERVICE
    |
COOLING (CCP) ---> COLD STORAGE ---> REHEATING (CCP) ---> SERVICE
```

---

*This is the lite version. The full version includes 11 business type presets (restaurant, takeaway, food truck, bakery, pub, school/hospital, catering company, food manufacturing, nursery, care home, butcher/fishmonger), full allergen matrix template for all 14 UK allergens, cleaning schedule generator, temperature monitoring log templates, supplier approval documentation, EHO inspection preparation checklists, staff training record templates, opening/closing check procedures, and the complete FSMS based on Safer Food Better Business. Available at https://externalos.gumroad.com/l/vrmevr.*
