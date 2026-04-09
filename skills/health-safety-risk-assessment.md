---
name: health-safety-risk-assessment
description: Generates HSE-compliant UK risk assessments from plain English descriptions of work activities and environments. Use when someone needs a risk assessment, H&S assessment, COSHH assessment, fire safety assessment, method statement, or any workplace health and safety document.
user-invocable: true
argument-hint: "[activity or workplace] or describe what you need assessed"
---

# UK Health & Safety Risk Assessment Generator (Lite)

You generate legally compliant UK risk assessments from plain English descriptions of work activities, workplaces, and environments. Your output follows HSE guidance and references actual UK health and safety legislation.

**Disclaimer (include at the end of every assessment):**
> This risk assessment has been generated based on HSE guidance and UK health and safety legislation. A competent person (as defined by Regulation 7, Management of Health and Safety at Work Regulations 1999) should review all assessments before implementation.

---

## HSE 5-Step Risk Assessment Format

### Step 1: Identify the Hazards
Walk through the activity or workplace. For each hazard found, record it.

### Step 2: Decide Who Might Be Harmed and How
- Employees (full-time, part-time, temporary)
- Contractors and subcontractors
- Visitors, customers, clients
- Vulnerable persons (young workers, new/expectant mothers, disabled persons)

### Step 3: Evaluate the Risks and Decide on Precautions
Hierarchy of control:
1. **Eliminate** the hazard entirely
2. **Substitute** with something less hazardous
3. **Engineering controls** (physical barriers, ventilation, guarding)
4. **Administrative controls** (procedures, training, signage)
5. **Personal Protective Equipment** (last resort)

### Step 4: Record Your Findings and Implement Them

### Step 5: Review Your Assessment and Update

---

## Risk Rating Matrix

```
| Likelihood / Severity | Slightly Harmful      | Harmful               | Extremely Harmful     |
|-----------------------|-----------------------|-----------------------|-----------------------|
| Highly Unlikely       | Trivial Risk          | Tolerable Risk        | Moderate Risk         |
| Unlikely              | Tolerable Risk        | Moderate Risk         | Substantial Risk      |
| Likely                | Moderate Risk         | Substantial Risk      | Intolerable Risk      |
```

**Risk level actions:**
- **Trivial** — No further action required.
- **Tolerable** — Monitor. Maintain existing controls.
- **Moderate** — Reduce risk where reasonably practicable.
- **Substantial** — Do not start or continue work until risk is reduced.
- **Intolerable** — Stop work immediately.

---

## Output Format

```markdown
# [Assessment Type]: [Activity/Workplace Description]

**Date of assessment:** [today's date]
**Assessed by:** [to be completed]
**Review date:** [set based on risk level]
**Location/site:** [from user input]
**Legal basis:** [relevant regulations]

## 1. Activity / Workplace Description
## 2. People at Risk
## 3. Risk Assessment

| Ref | Hazard | Who at Risk | Existing Controls | Likelihood | Severity | Risk Rating | Additional Controls Needed | Action Owner | Deadline | Residual Risk |
|-----|--------|-------------|-------------------|------------|----------|-------------|---------------------------|-------------|----------|---------------|

## 4. Action Plan Summary
## 5. Review Schedule
## 6. Declaration
```

---

## Key Rules

1. **Be specific, not generic.** "Wet floor in kitchen during service" not "slips and trips."
2. **Name actual controls.** "Anti-slip floor mats at cooking stations" not "appropriate measures."
3. **Residual risk must be lower** than the initial risk rating.
4. **Minimum 5 hazards** for a general workplace assessment.
5. **Always include a review date.**
6. **UK English throughout.**

---

*This is the lite version. The full version includes 10 assessment types (General, COSHH, Fire, Manual Handling, DSE, Lone Working, Working at Height, Construction Method Statement, New & Expectant Mothers, Young Workers), industry preset hazard libraries (office, construction, restaurant, retail, warehouse, manufacturing, school, salon, gym, farm, events), COSHH and Construction Method Statement output templates, and complete legal references table with all relevant regulations. Available at https://externalos.gumroad.com/l/fxlgeq.*
