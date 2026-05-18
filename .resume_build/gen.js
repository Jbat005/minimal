const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, BorderStyle, LevelFormat, TabStopType,
} = require('docx');

// ---- brand palette (from jeanbatista.com) ----
const DARK  = "13251E";  // deep green
const GREEN = "1F5D3B";  // secondary green
const GRAY  = "474747";  // muted body text
const FAINT = "9AA59A";  // separators

const CONTENT_W = 10160; // page width - L/R margins

// ---- helpers ----
const heading = (text) => new Paragraph({
  spacing: { before: 230, after: 110 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN, space: 3 } },
  children: [ new TextRun({ text: text.toUpperCase(), bold: true, size: 23, color: DARK }) ],
});

const entryTitle = (title, date) => new Paragraph({
  spacing: { before: 150, after: 0 },
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
  children: [
    new TextRun({ text: title, bold: true, size: 22, color: "000000" }),
    new TextRun({ text: "\t" + date, size: 20, color: GRAY }),
  ],
});

const subtitle = (text) => new Paragraph({
  spacing: { after: 50 },
  children: [ new TextRun({ text: text, italics: true, size: 20, color: GREEN }) ],
});

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 38 },
  children: [ new TextRun({ text: text, size: 21 }) ],
});

const tools = (items) => new Paragraph({
  spacing: { before: 6, after: 44 },
  indent: { left: 340 },
  children: [
    new TextRun({ text: "Tools  ", bold: true, size: 19, color: DARK }),
    new TextRun({ text: items, size: 19, color: GRAY }),
  ],
});

const skill = (cat, items) => new Paragraph({
  spacing: { after: 40 },
  tabStops: [{ type: TabStopType.LEFT, position: 1760 }],
  indent: { left: 1760, hanging: 1760 },
  children: [
    new TextRun({ text: cat, bold: true, size: 21, color: DARK }),
    new TextRun({ text: "\t" + items, size: 21 }),
  ],
});

const link = (text, url) => new ExternalHyperlink({
  link: url,
  children: [ new TextRun({ text: text, size: 18, color: GREEN }) ],
});
const sep = () => new TextRun({ text: "    |    ", size: 18, color: FAINT });

const doc = new Document({
  creator: "Jean Batista",
  title: "Jean Batista - Resume",
  description: "Resume of Jean Batista, Data Analyst & Developer",
  styles: { default: { document: { run: { font: "Arial", size: 21 } } } },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "*", alignment: AlignmentType.LEFT,
        style: { run: { color: GREEN }, paragraph: { indent: { left: 340, hanging: 240 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 760, right: 1040, bottom: 680, left: 1040 },
      },
    },
    children: [
      // ---------- header ----------
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 30 },
        children: [ new TextRun({ text: "Jean Batista", bold: true, size: 46, color: DARK }) ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [ new TextRun({ text: "Data Analyst & Developer", bold: true, size: 24, color: GREEN }) ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: DARK, space: 8 } },
        children: [
          new TextRun({ text: "New York, NY", size: 18, color: GRAY }),
          sep(),
          link("batistajean78@gmail.com", "mailto:batistajean78@gmail.com"),
          sep(),
          link("linkedin.com/in/jbatist005", "https://www.linkedin.com/in/jbatist005/"),
          sep(),
          link("github.com/Jbat005", "https://github.com/Jbat005"),
        ],
      }),

      // ---------- summary ----------
      heading("Summary"),
      new Paragraph({
        spacing: { after: 40 },
        children: [ new TextRun({ size: 21, text:
          "Data analyst and developer pursuing an M.S. in Data Science, with hands-on freelance " +
          "experience turning messy data and real client needs into clean reports, web tools, and " +
          "decisions people can act on. Bilingual in English and Spanish. Strong across Python, SQL, " +
          "and statistical modeling, with practical end-to-end web development. Open to Data Analyst, " +
          "Data Developer, BI Analyst, and Analytics Engineer roles." }) ],
      }),

      // ---------- skills ----------
      heading("Technical Skills"),
      skill("Programming", "Python, R, SQL (T-SQL, PostgreSQL), JavaScript, HTML, CSS"),
      skill("Data & ML", "pandas, NumPy, scikit-learn, tidyverse, ggplot2, K-means, PCA, OLS regression, model diagnostics"),
      skill("Databases", "SQL Server, T-SQL, triggers & ACID, MongoDB, Firestore, star & snowflake schemas"),
      skill("Tools & Workflow", "Jupyter, RMarkdown, Git & GitHub, matplotlib, seaborn, technical writing, end-to-end deployment"),

      // ---------- experience ----------
      heading("Experience"),
      entryTitle("Freelance Data & Web Developer", "2023 - Present"),
      subtitle("Independent | New York, NY"),
      bullet("Built classroom observation analytics for an NYC public-school teacher, tracking a student's progression across a school year and delivering visual trend reports used in parent-teacher meetings."),
      bullet("Designed an inventory tracking system for an apartment-complex superintendent in Battery Park, NYC, streamlining how building stock is logged and reviewed."),
      bullet("Developed and shipped portfolio websites for an actor and a fashion designer, owning design, build, and deployment end to end."),
      bullet("Currently building portfolio sites for an interior designer and a computer-and-phone repair business."),

      // ---------- projects ----------
      heading("Projects"),
      entryTitle("Food Data Analysis - Graduate Capstone", "2026"),
      bullet("Performed large-scale exploratory analysis of USDA branded food products, including outlier cleaning and a custom Nutrient Density Score."),
      bullet("Applied K-means clustering and PCA to segment products and surface category-level nutritional insights."),
      tools("Python, pandas, scikit-learn, K-means, PCA"),
      entryTitle("Inventory Audit Trigger - SQL Project", "2025"),
      bullet("Built a normalized SQLite database of five 3NF tables for a USDA food-inventory sample."),
      bullet("Implemented an audit trigger that logs every nutrient correction to a separate audit table, with three views shipping CSV-ready output for analysis."),
      tools("SQLite, SQL DDL, triggers, views"),

      // ---------- education ----------
      heading("Education"),
      entryTitle("M.S., Data Science", "2025 - Present"),
      subtitle("Juniata College | Huntingdon, PA"),
      bullet("Coursework: Data Mining, Machine Learning, Data Visualization, Big Data, and Database Systems."),
      bullet("Capstone-track project: large-scale exploratory analysis of USDA branded food data."),
      entryTitle("B.A., Economics", "2019 - 2023"),
      subtitle("CUNY City College of New York | New York, NY"),
      bullet("Specialization in Python for Business Analytics and Quantitative Finance."),
      bullet("Foundation in econometrics, statistics, and applied financial analysis."),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:/Users/jeanb/Documents/GitHub/valentines/minimal/Jean_Batista_Resume.docx", buffer);
  console.log("Resume written.");
});
