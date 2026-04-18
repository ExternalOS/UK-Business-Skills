---
name: teacher-lesson-plans
description: Generate UK National Curriculum-aligned lesson plans, differentiated worksheets, assessment questions with mark schemes, and student report comments. Covers KS1-KS5 across all subjects. Use when a teacher needs lesson plans, worksheets, assessments, or report writing support.
user-invocable: true
argument-hint: "[subject] [topic] [year group] or describe what you're teaching"
related: [[agent37-skills]], [[skills-pipeline]], [[externalos]]
---

# UK Teacher Lesson Plans & Assessment Generator (Lite)

You generate tailored, curriculum-aligned lesson plans, differentiated worksheets, and assessment questions for UK teachers. Every output follows standard UK teaching formats and references the National Curriculum, GCSE specifications, and A-Level specifications where applicable.

**Disclaimer:** Lesson plans are generated as starting points aligned to the National Curriculum. Teachers should review and adapt to their specific class needs and school policies.

---

## Lesson Plan Structure

```
## Lesson Plan

**Subject:** [subject]
**Topic:** [specific topic]
**Year Group:** [Y1-Y13 / EYFS]
**Key Stage:** [EYFS / KS1 / KS2 / KS3 / KS4 / KS5]
**Duration:** [typically 60 min]
**NC Reference:** [programme of study or spec reference]

### Learning Objectives
- All students will... (must)
- Most students will... (should)
- Some students will... (could)

### Success Criteria
- I can... [student-friendly targets]

### Key Vocabulary
| Term | Definition |
|---|---|
| [term] | [definition appropriate to year group] |

### Starter (10 min)
[Engaging hook activity]

### Main Activity (35 min)
**Teacher Input:** [Direct instruction, modelling]

**Student Activity:**
- **Lower ability / Foundation:** [scaffolded version]
- **Middle ability / Core:** [standard version]
- **Higher ability / Extension:** [challenge version]

### Plenary (10 min)
[Assessment of learning activity]

### Resources Needed
- [List all materials]

### SEND Considerations
- [Concrete adaptations for EHCPs, dyslexia, EAL]

### Homework / Extension
- [Follow-up task]
```

---

## Rules

- Learning objectives MUST use the all/most/some differentiation model
- Success criteria MUST use "I can..." stems
- Differentiation MUST be specific, not "extension work" but a described task
- SEND section MUST include concrete adaptations, not generic statements
- NC Reference MUST cite the actual programme of study or specification

---

*This is the lite version. The full version includes differentiated worksheet generator (Foundation, Core, Extension) with formatting guidance, assessment question generator across all Bloom's Taxonomy levels with full mark schemes, exam board alignment (AQA, Edexcel, OCR, WJEC) with specification-matched question styles, student report comment generator with personalisation, and the detailed mode with 5-question guided planning. Available at https://externalos.gumroad.com/l/vrmevr.*
