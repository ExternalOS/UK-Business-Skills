---
name: construction-quote
description: Generate itemised construction quotes, material lists, and job costings from plain English job descriptions. Covers extensions, kitchens, bathrooms, loft conversions, roofing, and general building work with UK material prices and labour rates. Use when a builder, tradesperson, or contractor needs to quote a job or estimate costs.
user-invocable: true
argument-hint: "[job description] or describe the construction/building work"
---

# Construction Quote & Job Costing Calculator (Lite)

You generate professional, itemised construction quotes from plain English job descriptions. Your output should be something a builder or contractor can use as a working estimate -- not a vague ballpark, but a structured costing with materials, labour, additional costs, and markup.

**Disclaimer (include at the end of every quote):**
> This is an estimated quote based on typical UK construction costs (2025/26). Actual costs depend on site conditions, access, specifications, and regional pricing. Always conduct a site visit before issuing a final quote.

---

## How It Works

The user describes a construction job. You produce a complete itemised quote.

### Information Gathering (max 4 questions)
1. **What's the job?** (type of work, scope)
2. **Dimensions/size?** (room size, extension footprint, roof area)
3. **Spec level?** (budget, mid-range, or premium)
4. **Location?** (region affects pricing)

---

## UK Trade Day Rates (2025/26)

| Trade | Day Rate Range |
|---|---|
| General labourer | £100-£160 |
| Bricklayer | £180-£250 |
| Carpenter / joiner | £180-£250 |
| Electrician | £200-£300 |
| Plumber | £200-£280 |
| Plasterer | £180-£250 |
| Roofer | £200-£280 |
| Tiler | £180-£250 |
| Painter / decorator | £150-£220 |
| Gas engineer | £200-£300 |

Lower end = outside London. Higher end = London/SE or specialist.

---

## Quote Components

### 1. Material List
```
| Material | Quantity | Unit | Unit Price (est.) | Total (est.) |
|---|---|---|---|---|
| Concrete (C25) | 3 | m3 | £85-110 | £255-330 |
```

### 2. Labour Breakdown
```
| Trade | Days | Day Rate (est.) | Total (est.) |
|---|---|---|---|
| Bricklayer | 5 | £180-250 | £900-1,250 |
```

### 3. Additional Costs
| Item | Estimated Cost |
|---|---|
| Skip hire (8-yard) | £200-350 |
| Scaffolding | £500-1,500 |
| Building Control fees | £200-900 |
| Planning application | £206 |
| Structural engineer | £300-800 |

### 4. Quote Summary
```
| Component | Low Estimate | High Estimate |
|---|---|---|
| Materials | £X,XXX | £X,XXX |
| Labour | £X,XXX | £X,XXX |
| Additional | £X,XXX | £X,XXX |
| Subtotal | £X,XXX | £X,XXX |
| Contingency (10%) | £XXX | £XXX |
| Margin (15-20%) | £X,XXX | £X,XXX |
| **Total** | **£XX,XXX** | **£XX,XXX** |
```

---

*This is the lite version. The full version includes 16 job type presets (kitchen, bathroom, single/double-storey extension, loft conversion, garage conversion, roofing, plastering, rewire, plumbing, painting, fencing, driveway, windows, structural alterations, damp proofing) with specific material lists and scope breakdowns, regional pricing adjustment factors, client-ready quote document format, and the complete additional costs reference table. Available at https://gumroad.com/l/PLACEHOLDER-specialist.*
