const cases = {
  local: {
    eyebrow: "Case 01",
    title: "Local lender sales track",
    objective: "Run more loans without hiring more ops people.",
    pitch: "Run more loans without adding operational headcount.",
    narrative:
      "Lead with the daily pain: inbox follow-ups, scattered PDFs, manual payment tracking, and no single view of every active loan.",
    metrics: [
      ["Loan setup time", "-75%"],
      ["Ops capacity", "+30%"],
    ],
    score: 86,
    scoreText: "Best for lean lenders that feel operational drag before they feel enterprise process pain.",
    signals: [
      "Hiring ops before growing origination",
      "Too much manual follow-up",
      "Capacity without headcount",
    ],
    inputs: [45, 35, 55],
    demo: [
      ["Start in the active loan pipeline", "Show leads, credit review, terms review, closing, and servicing in one operational view."],
      ["Open borrower tasks", "Show the borrower portal collecting applications, uploads, signatures, scopes, and draw requests."],
      ["Collect payment without spreadsheets", "Show ACH collection, balance updates, payoff statement generation, and payment history."],
      ["Close with implementation simplicity", "Explain month-to-month pricing and white-glove onboarding as a low-risk switch."],
    ],
    proof: [
      ["Time saved", "Use setup-time reduction and fewer manual handoffs as the main ROI story."],
      ["Professional borrower experience", "Show how portals replace email chains and improve lender credibility."],
      ["No extra headcount", "Frame Baseline as the ops teammate that lets a small staff scale."],
    ],
    assets: [
      ["1-page ROI sheet", "Manual process cost versus Baseline monthly plan.", "sales-assets.html#local-roi"],
      ["Local lender case study", "Before/after workflow with time saved per loan.", "sales-assets.html#local-case"],
      ["Spreadsheet replacement checklist", "What breaks when loan volume grows.", "sales-assets.html#local-checklist"],
      ["Demo script", "Pipeline, portal, ACH, servicing, payoff.", "sales-assets.html#local"],
      ["Objection card", "Price, migration, onboarding, and data trust.", "sales-assets.html#local"],
    ],
  },
  regional: {
    eyebrow: "Case 02",
    title: "Regional lender sales track",
    objective: "Standardize workflows across people, roles, and markets.",
    pitch: "Create one repeatable operating model across every team and market.",
    narrative:
      "Lead with inconsistency: different loan officers, different processes, unclear task ownership, uneven borrower updates, and fragile reporting.",
    metrics: [
      ["Workflow consistency", "+40%"],
      ["Draw cycle time", "-35%"],
    ],
    score: 91,
    scoreText: "Strongest fit when growth is creating process drift across teams, products, and markets.",
    signals: [
      "New branch, product, or origination team",
      "Managers cannot see stuck work",
      "Standardize every loan path",
    ],
    inputs: [135, 28, 62],
    demo: [
      ["Show product templates", "Demonstrate standard rules, pricing, calculations, charges, tasks, and documents for each loan type."],
      ["Walk through task ownership", "Show role-based tasking, comments, internal communication, and stage accountability."],
      ["Run a draw workflow", "Show borrower request, supporting photos/docs, approval status, and funding visibility."],
      ["End on portfolio reporting", "Show exportable reports, pipeline health, payment status, and team-level visibility."],
    ],
    proof: [
      ["Repeatability", "Show how templates reduce process drift as the lender expands."],
      ["Visibility", "Use real-time pipeline and servicing views to make management oversight concrete."],
      ["Borrower speed", "Tie portals and draw workflows to fewer bottlenecks and faster decisions."],
    ],
    assets: [
      ["Regional demo script", "Templates, task ownership, draws, reporting.", "sales-assets.html#regional-demo"],
      ["Workflow standardization map", "Current fragmented process versus Baseline process.", "sales-assets.html#regional-map"],
      ["Manager dashboard mock", "Pipeline, task aging, draw status, servicing exceptions.", "sales-assets.html#regional"],
      ["Borrower journey one-pager", "Application through draw release.", "sales-assets.html#regional"],
      ["Implementation plan", "30/60/90 day rollout by team and product line.", "sales-assets.html#regional-rollout"],
    ],
  },
  national: {
    eyebrow: "Case 03",
    title: "National lender sales track",
    objective: "Prove control, auditability, and scale for high-volume lending.",
    pitch: "Operate high-volume private lending with enterprise-grade control.",
    narrative:
      "Lead with scale risk: permissioning, audit trails, capital structures, data integrity, payment accuracy, investor reporting, and oversight.",
    metrics: [
      ["Audit readiness", "24/7"],
      ["Report prep", "-50%"],
    ],
    score: 79,
    scoreText: "High-value fit, but the sale needs security, migration, API, and executive-risk proof early.",
    signals: [
      "Investor reporting slows the team",
      "Control and audit confidence",
      "System of record at scale",
    ],
    inputs: [420, 18, 78],
    demo: [
      ["Open enterprise controls", "Show permissions, configurable processes, centralized communication, and transaction-level history."],
      ["Show servicing at scale", "Demonstrate payment allocation, loan changes, payoff calculations, and historical records."],
      ["Show capital operations", "Walk through fund, whole-note, and fractional structures with automated distributions."],
      ["Close with integrations", "Show API story, reporting exports, security posture, and migration support."],
    ],
    proof: [
      ["Control", "Make audit trail, permissions, and data model reliability the primary proof."],
      ["Capital complexity", "Show automated distributions and investor reporting across funds and note structures."],
      ["Scale confidence", "Use high transaction volume, concurrent teams, and enterprise support as buying reasons."],
    ],
    assets: [
      ["Enterprise security brief", "SOC posture, encryption, permissions, monitoring.", "sales-assets.html#national-security"],
      ["Capital ops deep dive", "Funds, whole notes, fractional deals, distributions.", "sales-assets.html#national-capital"],
      ["API and migration sheet", "Integration patterns and data transition plan.", "sales-assets.html#national"],
      ["Executive business case", "Risk reduction, reporting speed, operational leverage.", "sales-assets.html#national-business-case"],
      ["National lender demo script", "Controls, servicing, capital ops, integrations.", "sales-assets.html#national"],
    ],
  },
};

const buttons = document.querySelectorAll(".case-button");
const loanInput = document.querySelector("#loanInput");
const minuteInput = document.querySelector("#minuteInput");
const costInput = document.querySelector("#costInput");
const roiValue = document.querySelector("#roiValue");
let activeCase = "local";

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateRoi() {
  const loans = Number(loanInput.value) || 0;
  const minutes = Number(minuteInput.value) || 0;
  const cost = Number(costInput.value) || 0;
  const monthlyValue = loans * minutes * 4 * (cost / 60);
  roiValue.textContent = money(monthlyValue);
}

function renderList(targetId, items, tagName) {
  const target = document.querySelector(targetId);
  target.innerHTML = "";
  items.forEach(([title, text]) => {
    const item = document.createElement(tagName);
    item.innerHTML = `<div><strong>${title}</strong><p>${text}</p></div>`;
    target.appendChild(item);
  });
}

function renderAssets(items) {
  const target = document.querySelector("#assetGrid");
  target.innerHTML = "";
  items.forEach(([title, text, href]) => {
    const item = document.createElement("a");
    item.className = "asset";
    item.href = href || "sales-assets.html";
    item.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
    target.appendChild(item);
  });
}

function setCase(caseKey) {
  activeCase = caseKey;
  const data = cases[caseKey];
  document.querySelector("#caseEyebrow").textContent = data.eyebrow;
  document.querySelector("#caseTitle").textContent = data.title;
  document.querySelector("#railObjective").textContent = data.objective;
  document.querySelector("#casePitch").textContent = data.pitch;
  document.querySelector("#caseNarrative").textContent = data.narrative;
  document.querySelector("#metricOne").textContent = data.metrics[0][0];
  document.querySelector("#metricOneValue").textContent = data.metrics[0][1];
  document.querySelector("#metricTwo").textContent = data.metrics[1][0];
  document.querySelector("#metricTwoValue").textContent = data.metrics[1][1];
  document.querySelector("#scoreValue").textContent = data.score;
  document.querySelector(".score-ring").style.background =
    `radial-gradient(circle, var(--deep) 56%, transparent 57%), conic-gradient(var(--accent-2) 0 ${data.score}%, rgba(255, 255, 255, 0.18) ${data.score}% 100%)`;
  document.querySelector("#scoreText").textContent = data.scoreText;
  document.querySelector("#triggerSignal").textContent = data.signals[0];
  document.querySelector("#emotionSignal").textContent = data.signals[1];
  document.querySelector("#closeSignal").textContent = data.signals[2];

  [loanInput.value, minuteInput.value, costInput.value] = data.inputs;
  renderList("#demoFlow", data.demo, "li");
  renderList("#proofPoints", data.proof, "li");
  renderAssets(data.assets);
  calculateRoi();

  buttons.forEach((button) => {
    const isActive = button.dataset.case === caseKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function activeBrief() {
  const data = cases[activeCase];
  const demo = data.demo.map(([title, text], index) => `${index + 1}. ${title}: ${text}`).join("\n");
  const proof = data.proof.map(([title, text]) => `- ${title}: ${text}`).join("\n");
  const assets = data.assets.map(([title, text]) => `- ${title}: ${text}`).join("\n");
  return `${data.title}

Objective: ${data.objective}
Pitch: ${data.pitch}

Demo flow:
${demo}

Buyer proof:
${proof}

Assets:
${assets}`;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setCase(button.dataset.case));
});

[loanInput, minuteInput, costInput].forEach((input) => {
  input.addEventListener("input", calculateRoi);
});

document.querySelector("#copyButton").addEventListener("click", async () => {
  const toast = document.querySelector("#toast");
  const text = activeBrief();
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      throw new Error("Clipboard API unavailable");
    }
    toast.textContent = "Brief copied";
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    toast.textContent = copied ? "Brief copied" : "Copy unavailable";
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
});

setCase("local");
