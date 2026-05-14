# Nutritional Profiles of 175,000 Branded Food Products

**Beyond the overview: outlier cleaning, nutrient density scoring, clustering, and intra-category analysis of the USDA branded food supply.**

> **Jean Batista** · M.S. Data Science, Juniata College
> DS 580 — Dr. Jianyuan Ni · April 2026
> [GitHub](https://github.com/Jbat005) · [LinkedIn](https://www.linkedin.com/in/jbatist005/)

---

## TL;DR

I built an end-to-end analytics pipeline on **175,000 USDA branded food products** to answer one practical question: *can a shopper trust food-category labels to guide nutritional choices?*

The short answer is no — and I built four tools that prove it.

| What I did | Result |
| --- | --- |
| **Outlier cleaning** with physiologically-grounded thresholds | Reduced sodium mean by **72%** (1,620 → 453 mg) by flagging just 0.11% of values |
| **Nutrient Density Score** (custom composite index per 100 kcal) | Ranked **121,171 products** and **343 categories**; **79.5%** scored negative |
| **K-means clustering** (k=5) on 40,000-product sample | Surfaced 5 nutrient archetypes that cut *across* USDA category boundaries |
| **Intra-category analysis** of cheese, snacks, yogurt | Found a **7× sodium swing** within cheese alone (Swiss 253 mg vs American 1,781 mg) |

**Stack:** Python · pandas · NumPy · scikit-learn · matplotlib · seaborn

**Key skills demonstrated:** large-scale data cleaning · index design · unsupervised learning · PCA · clear technical writing · translating analysis into actionable insight.

---

## Why this project matters

Dietary guidance operates at the *category* level — "eat more yogurt for protein," "cut back on cheese to reduce sodium." But people don't buy categories. They buy individual products off a shelf. This project asks how much variation hides inside those category labels, and builds the tools to make product-level decisions defensible.

The work is also a deliberate demonstration of an analyst's full workflow: **source → clean → measure → cluster → drill down → communicate**. Every step is documented, every choice is justified, and every limitation is named.

---

## Data

- **Source:** USDA FoodData Central — 4 source files combined into a 1,026,891-product master, then random-sampled to **175,000 products** for analysis.
- **Variables:** 16 columns — 3 categorical identifiers (brand, product, USDA category), 2 serving-size fields, **11 per-serving nutrient values** (calories, protein, carbs, fat, fiber, sodium, cholesterol, saturated fat, trans fat, total sugar, added sugar).
- **Exclusions:** 11 ingredient/cooking categories (salt, spices, extracts, cooking oils — 5,917 products) were removed before comparative analysis because they're not consumed as standalone foods. Final analytic dataset: **169,083 products**.

---

## Project 1 — Exploratory Data Analysis

*This is the foundational EDA I shipped before the methodology work began. Notebook: `EDA_Analysis.ipynb`.*

The goal was to understand what the dataset actually looked like before designing any indices or models. Fifteen distinct analyses, each producing a labeled figure and a quantitative finding.

**What I checked:**

1. **Shape and summary statistics** — calories, protein, fat, sodium, sugar, fiber and the rest, with skewness on every variable.
2. **Missing data audit** — colored bar chart flagging variables above 15% missingness (red) vs. acceptable (blue).
3. **Calorie distribution** — clipped to the 99.5th percentile, with median and mean annotated. Right-skewed, median ≈ 120 kcal per serving.
4. **Correlation matrix (11 nutrients)** — masked upper triangle, RdBu diverging palette. Surfaced the key signals the rest of the project would build on:
   - Fat ↔ Saturated Fat ≈ very high (expected; sanity check passed)
   - Calories ↔ Fat and Calories ↔ Carbs ≈ both strong drivers
   - Total Sugar ↔ Added Sugar ≈ high, but with meaningful divergence in dairy and fruit categories (which justified excluding added-sugar from the NDS later)
5. **Category counts** — top 15 categories by product count. Reveals the dataset is dominated by snacks, candy, cheese, and beverages.
6. **Nutrient boxplots by category** — calories, fat, and sodium across the top 8 categories with outliers suppressed for readability.
7. **Multivariate scatter** — calories vs. fat, colored by carbohydrate content. A clean visual proof that fat and carbs are the two calorie drivers.
8. **Macronutrient caloric contribution** — converted each macro to % of total calories using the Atwater factors (4/4/9), then plotted overlaid distributions for protein, carbs, and fat. Median fat contribution was the highest of the three.
9. **Sodium analysis** — distribution with the FDA "high sodium" threshold (460 mg) marked. Identified which categories systematically exceed it: cured meats, sauces, soups, frozen meals.
10. **Sugar analysis** — total vs. added sugar scatter with the *y = x* reference line (where all sugar is added). The cloud of points *below* the line is the diagnostic that natural sugar (dairy, fruit) is a meaningful share of total sugar — directly motivated the NDS design choice.
11. **Trans fat analysis** — most products report 0g (post-2018 FDA ban on partially hydrogenated oils), but trace amounts persist in baked goods and frozen prepared foods.
12. **Serving size distribution** — split by unit (g vs. mL), which exposed inconsistent serving-size definitions across manufacturers. This finding directly motivated the later observation that small manufacturer-set serving sizes can make products look healthier than they are per gram.
13. **Outlier identification** — pulled the top 5 extreme values per nutrient with product name and category. This is what made the case for the physiological-threshold filter in Project 2.

**Why this matters as analyst work:** every figure has a labeled axis, a title, a justified annotation, and feeds a downstream decision. None of it is decoration.

---

## Project 2 — Methodology

### 2.1 Outlier detection and removal

Rather than throwing out rows wholesale, I applied **per-nutrient upper limits derived from biological constraints**: 5,000 kcal, 500g protein/carbs/fat, 100g fiber, 10,000 mg sodium, 2,000 mg cholesterol, 200g sat fat, 50g trans fat, 400g total/added sugar. Values *above* these limits were set to missing — the rest of the product record stayed intact.

**Impact:**

| Variable | Raw Mean | Clean Mean | Raw Max | Clean Max | Flagged |
| --- | --- | --- | --- | --- | --- |
| Calories (kcal) | 271.6 | 270.0 | 37,600 | 5,000 | 53 |
| Protein (g) | 7.7 | 7.6 | 3,800 | 500 | 16 |
| Carbs (g) | 34.1 | 33.7 | 6,160 | 500 | 82 |
| Fat (g) | 12.5 | 12.5 | 2,157 | 500 | 13 |
| Fiber (g) | 3.0 | 2.9 | 1,200 | 100 | 18 |
| **Sodium (mg)** | **1,620** | **453** | **25,833,333** | **10,000** | **1,786** |
| Cholesterol (mg) | 77.4 | 68.1 | 716,667 | 2,000 | 135 |
| Sat Fat (g) | 4.9 | 4.9 | 1,000 | 200 | 12 |
| Trans Fat (g) | 0.04 | 0.04 | 600 | 50 | 5 |
| Total Sugar (g) | 15.9 | 15.7 | 5,560 | 400 | 58 |
| Added Sugar (g) | 15.9 | 15.8 | 1,333 | 400 | 11 |

**The key finding:** sodium accounted for **82% of all flagged values** (1,786 of 2,189). Cleaning dropped the sodium mean by 72% but moved the median only 4 mg (278 → 274 mg) — proof that a handful of corrupted entries were distorting summary statistics without affecting the actual central distribution. This is exactly the kind of finding a BI dashboard owner needs to surface before publishing any sodium-comparison report.

### 2.2 Nutrient Density Score (NDS)

A custom composite index modeled on Drewnowski's Nutrient Rich Foods framework (2009), rebuilt for the specific structure of this dataset.

**Formula:**

```
NDS = ((protein_pct + fiber_pct) − (sodium_pct + satfat_pct + sugar_pct)) / calories × 100
```

Each nutrient is expressed as a % of its FDA daily value (protein 50g, fiber 28g, sodium 2,300 mg, sat fat 20g, total sugar 50g). Scores are clipped at the 1st/99th percentile to prevent extreme outliers from distorting rankings.

**Why this design:**
- **Per 100 kcal**, not per serving — so a 50-kcal yogurt and a 500-kcal protein bar can be compared on a common axis.
- **Equal weighting** of beneficial vs. limiting nutrients — explicitly called out as a limitation; no empirical basis but transparent.
- **Total sugar, not added sugar** — because added sugar is missing for 69.6% of products. I named this trade-off in the limitations section.

### 2.3 K-means clustering

Clustered a **40,000-product random sample** on seven z-score normalized variables (calories, protein, carbs, fat, sodium, total sugar, fiber). Selected **k=5** after reviewing inertia and confirming each cluster was interpretable and distinct.

PCA reduced the data to 2 components for visualization, **explaining 61.8% of total variance**.

### 2.4 Intra-category deep dives

Three categories were classified into subtypes by keyword matching on product names: **cheese (7,020)**, **snacks (~20,000 across 5 subcategories)**, and **yogurt (3,861)**. Each subtype received its own profile.

---

## Results

### Section 1 — Nutrient Density Score rankings

**Headline number: 79.5% of branded food products scored *negative* on the NDS** — meaning they deliver more limiting nutrients (sodium, sat fat, sugar) than beneficial ones (protein, fiber) per 100 kcal.

**Bottom of the rankings:**
- Granulated sugar, honey: ≈ **−53**
- Soda: ≈ **−49**
  (Sugar-only calories with no beneficial nutrients to offset.)

**Top of the rankings:**
- Canned tuna: **+27.2**
- Unprepared fish: **+30 to +32**
- Vegetable & lentil mixes: **+26.1**
- Frozen fish & seafood: **+16.8**
  (High protein per 100 kcal, near-zero sugar, low sodium.)

The NDS component breakdown also exposes *why* products score the way they do. Chips and pretzels score near zero — their sodium and sat-fat penalties almost exactly cancel their protein contribution. Soda and candy both score badly, but soda has *no* beneficial nutrients while candy has trace protein. Same score, different fixes.

### Section 2 — K-means clusters

Five archetypes emerged that cut *across* USDA's category system:

| Cluster | Label | n | Calories | Protein | Carbs | Fat | Sodium | Sugar |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Calorie-Dense: Nuts & Bars | 3,484 | 536 | 17.9 | 36.7 | 37.5 | 250 | 6.2 |
| 1 | Light / Moderate | 15,878 | 89 | 3.0 | 11.7 | 1.6 | 157 | 3.5 |
| 2 | Sweet Processed | 7,370 | 415 | 3.8 | 67.4 | 16.1 | 168 | 44.6 |
| 3 | Starchy & Savory | 7,641 | 372 | 8.0 | 62.1 | 8.8 | 488 | 3.6 |
| 4 | High-Protein / High-Fat | 5,627 | 304 | 18.3 | 3.6 | 21.4 | 722 | 0.0 |

**The clustering finding I'm most proud of:** Cluster 1 ("Light/Moderate") groups **ice cream, yogurt, and frozen dinners** together. These are not nutritionally similar per gram — they share a cluster only because manufacturers set small serving sizes that keep per-serving values artificially low. This is a clean illustration of why serving-size standardization is critical for any cross-product comparison, and it's the kind of insight a category manager or BI analyst needs to factor into any dashboard they ship.

Cluster 4 puts **cheese, pepperoni, and sausages** in the same group — radically different products that share an identical macronutrient skeleton: high protein, high fat, minimal carbs, elevated sodium from curing.

### Section 3 — Cheese subtype profiles

| Cheese Type | n | Calories | Fat (g) | Protein (g) | Sodium (mg) |
| --- | --- | --- | --- | --- | --- |
| American | 211 | 444 | 31.7 | 23.3 | **1,781** |
| Cheddar | 1,458 | 393 | 32.1 | 25.0 | 643 |
| Parmesan | 141 | 393 | 28.3 | 32.1 | 1,143 |
| Swiss | 216 | 393 | 32.1 | 28.6 | **253** |
| Gouda | 128 | 388 | 28.6 | 25.0 | 821 |
| Blue | 100 | 357 | 28.6 | 21.4 | 1,082 |
| Brie | 74 | 357 | 32.1 | 17.9 | 607 |
| Cream Cheese | 330 | 286 | 24.9 | 6.2 | 375 |
| Mozzarella | 534 | 286 | 21.4 | 25.0 | 679 |
| Feta | 117 | 250 | 21.4 | 17.9 | 1,143 |
| Ricotta | 100 | 69 | 4.4 | 4.4 | 58 |
| Cottage | 318 | 20 | 0.5 | 2.6 | 88 |

**The headline:** Swiss and American cheese have nearly identical calorie and fat profiles. Swiss has **253 mg of sodium per serving**. American has **1,781 mg** — a **7× swing inside the same category**.

For anyone managing sodium intake, the within-category choice (Swiss vs. American) matters more than the include/exclude decision (cheese vs. no cheese). That is the entire point of doing analysis at product level rather than category level.

### Section 4 — Snack and yogurt findings

**Snacks:**
- Seeds & nuts: **536 kcal, 13.3g protein, 283 mg sodium** — highest protein, *lowest* sodium of any snack subcategory.
- Crackers: 625 mg sodium, 60.7g carbs — high-sodium, grain-based.
- Cookies: 33.3g sugar, 289 mg sodium — sugar-dominant.
- Energy/granola bars sit between: 14.7g protein, 22.9g sugar.

Seeds/nuts get ~60% of calories from fat; cookies/crackers get ~55% from carbs. Same calorie count, completely different macronutrient structure.

**Yogurt** (protein, descending):
- Skyr/Icelandic: **10.0g** protein
- Greek: 8.0g
- Plain: 4.7g
- Drinkable/kefir: 3.8g
- Flavored: 3.5g

**The yogurt finding worth flagging:** flavored yogurt has 87 kcal/serving total with **42 kcal coming from sugar (48%)**. Greek yogurt is 81 kcal with 37 from sugar (46%). Plain yogurt is 69 kcal with only 20 from sugar (29%). The "Greek" label correlates with protein but *not* with low sugar — most Greek yogurts in the dataset are flavored, and the straining process concentrates protein while added sugar undoes the health framing.

---

## Discussion — what this means in practice

**Food labels and category names are insufficient for individual dietary decisions.** Three concrete examples from the data:

1. *"Eat more yogurt for protein."* Buy flavored Greek yogurt: 8g protein, 37 kcal of sugar per serving. Same sugar load as conventional flavored yogurt. The health framing didn't translate.

2. *"Cheese for protein and calcium."* American processed: 23g protein, **1,781 mg sodium**. Swiss: 28.6g protein, 253 mg sodium. The within-category choice is the entire decision.

3. *"Cut back on soda."* The category includes diet sodas (near zero kcal), protein sodas (meaningful protein), and standard sweetened sodas. Treating them as equivalent produces wildly different outcomes depending on which one a person replaces.

The food pyramid and similar frameworks group foods by biological similarity. That works for population-level messaging. It breaks down at the individual product level, which is where actual food choices happen.

**What this analysis enables:** a shopper, dietitian, or category manager can run the NDS on a specific product list and surface, in seconds, which SKUs meet a defined nutritional goal. The marketing on the front of the box becomes irrelevant.

---

## Limitations (named explicitly)

1. **Ingredient exclusions were manual.** The 11 excluded categories cover the most distorting cases (salt, spices, cooking oils) but don't catch ingredient-like products inside retained categories (cooking wine, pure lemon juice). A more complete approach would filter at the product level using ingredient lists.
2. **NDS weights are equal.** Protein and fiber count equally on the positive side; sodium, sat fat, and sugar count equally on the negative side. No empirical basis — a version calibrated against dietary outcome data would be more defensible.
3. **Added sugar is missing for 69.6% of products.** Total sugar was used as a proxy. This overstates the penalty for dairy and fruit products, where some sugar is naturally occurring.
4. **Micronutrients were excluded.** Fortified cereals score poorly on sugar but deliver meaningful micronutrient contributions the current NDS can't see.

---

## What I'd build next

- Extend the NDS across all 343 categories and publish a public product-level lookup tool (this connects directly to my [Stocks by Bots](https://stocksbybots.com) deployment experience — same end-to-end pattern, different data).
- Replace keyword-based subtype classification with an embedding-based approach to handle products that don't include type keywords in their names.
- Calibrate NDS weights against published dietary outcome data rather than equal weighting.
- Add a serving-size normalization layer so "per 100 kcal" comparisons hold across products with manipulated serving sizes.

---

## Repository structure

```
DS580_FinalProject/
├── EDA_Analysis.ipynb              # Project 1: 15-section exploratory analysis
├── DS580_FinalProject_Report.docx  # Final written report (this file in narrative form)
├── data/
│   └── usda_branded_sample_175k.csv  (not committed — 175k row USDA sample)
└── figures/                        # All 14 numbered figures referenced in the report
```

---

## References

- Drewnowski, A. (2009). *Defining nutrient density: Development and validation of the Nutrient Rich Foods index.* Journal of the American College of Nutrition, 28(4), 421S-426S.
- U.S. Department of Agriculture. (2024). [FoodData Central.](https://fdc.nal.usda.gov/)
- U.S. FDA. (2022). [Sodium in your diet.](https://www.fda.gov/food/nutrition-education-resources-materials/sodium-your-diet)
- USDA & HHS. (2020). [Dietary Guidelines for Americans, 2020-2025.](https://www.dietaryguidelines.gov/)
- Batista, J. (2025). [R exploratory analysis: Cheese products variation in nutrition profiles.](https://www.jbatist.com/products%20variation%20in%20nutrition%20profiles.pdf) Juniata College.

---

*Jean Batista · DS 580 · Juniata College · April 2026*
