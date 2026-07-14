const mutationCatalog = [
  {
    name: "EGFR L858R",
    ids: ["EGFR-L858R", "EGFRL858R", "L858R"],
    solution:
      "Consider EGFR-targeted therapy where appropriate. Confirm tumor type, test methodology, and resistance status; discuss with a multidisciplinary team.",
  },
  {
    name: "BRAF V600E",
    ids: ["BRAF-V600E", "BRAFV600E", "V600E"],
    solution:
      "Evaluate tumor context for BRAF-directed therapy combinations. Verify mutation clonality and consult current oncology guidelines before treatment decisions.",
  },
  {
    name: "KRAS G12C",
    ids: ["KRAS-G12C", "KRASG12C"],
    solution:
      "KRAS G12C inhibitors may be appropriate in selected cases. Review the molecular report and prior therapies; confirm eligibility with the treating team.",
  },
  {
    name: "KRAS G12D",
    ids: ["KRAS-G12D", "KRASG12D"],
    solution:
      "KRAS G12D is a common oncogenic variant. Treatment options differ from G12C; consider molecular tumor board review for therapeutic planning.",
  },
  {
    name: "BRCA1",
    ids: ["BRCA1", "BRCA-1"],
    solution:
      "Determine germline versus somatic status. Refer for genetic counseling when germline mutations are suspected and consider guideline-based PARP inhibitor use.",
  },
  {
    name: "BRCA2",
    ids: ["BRCA2", "BRCA-2"],
    solution:
      "Assess germline status and family history. Genetic counseling is recommended when germline involvement is possible; follow evidence-based treatment pathways.",
  },
  {
    name: "ALK fusion",
    ids: ["ALK-FUSION", "ALK"],
    solution:
      "Confirm the fusion with validated assays. ALK-directed therapies are standard in appropriate histologies; verify indications and sequencing with specialists.",
  },
  {
    name: "ROS1 fusion",
    ids: ["ROS1-FUSION", "ROS1"],
    solution:
      "Confirm ROS1 rearrangement with orthogonal testing. ROS1-targeted agents may be appropriate in certain cancers; consult treatment protocols.",
  },
  {
    name: "RET fusion",
    ids: ["RET-FUSION", "RET"],
    solution:
      "RET fusions can be actionable in specific tumor types. Verify the fusion and discuss targeted therapy options with the oncology team.",
  },
  {
    name: "NTRK fusion",
    ids: ["NTRK-FUSION", "NTRK1", "NTRK2", "NTRK3"],
    solution:
      "NTRK fusions are rare but highly actionable across tumor types. Confirm by validated testing and consider NTRK inhibitors when indicated.",
  },
  {
    name: "MET exon 14 skipping",
    ids: ["METex14", "MET-EXON14", "MET-EX14"],
    solution:
      "MET exon 14 skipping mutations may be targetable. Confirm the alteration type and consult guidelines for MET-targeted therapy options.",
  },
  {
    name: "ERBB2 (HER2) amplification",
    ids: ["ERBB2", "HER2", "HER2-AMP"],
    solution:
      "HER2 amplification may inform targeted therapy in certain cancers. Confirm amplification level and tumor context; follow established HER2 treatment pathways.",
  },
  {
    name: "PIK3CA E545K",
    ids: ["PIK3CA-E545K", "PIK3CA-E545", "E545K"],
    solution:
      "PIK3CA hotspot mutations can be relevant for targeted approaches in select tumor types. Review molecular context and potential eligibility for PI3K-directed therapy.",
  },
  {
    name: "PTEN loss",
    ids: ["PTEN-LOSS", "PTEN"],
    solution:
      "PTEN loss may affect pathway activity and therapy response. Confirm loss by validated methods and discuss implications with pathology and oncology colleagues.",
  },
  {
    name: "TP53 mutation",
    ids: ["TP53", "TP53-MUT"],
    solution:
      "TP53 alterations are common and variably actionable. Interpret in clinical context; consider prognostic implications rather than specific targeted therapy in many cases.",
  },
  {
    name: "MSI-High / MMR deficiency",
    ids: ["MSI-H", "MMR-DEF", "MLH1", "MSH2", "MSH6", "PMS2"],
    solution:
      "MSI-high or mismatch repair deficiency can predict response to immunotherapy in several tumor types. Confirm testing methodology and consult guidelines for treatment decisions.",
  },
  {
    name: "IDH1 R132H",
    ids: ["IDH1-R132H", "IDH1-R132", "R132H"],
    solution:
      "IDH1 hotspot mutations may be targetable in specific contexts. Verify variant and disease setting; consult specialty guidance for targeted options.",
  },
  {
    name: "IDH2 R140Q",
    ids: ["IDH2-R140Q", "IDH2-R140"],
    solution:
      "IDH2 mutations can have therapeutic implications in particular malignancies. Confirm the alteration and review relevant clinical evidence.",
  },
  {
    name: "JAK2 V617F",
    ids: ["JAK2-V617F", "JAK2V617F"],
    solution:
      "JAK2 V617F is commonly associated with myeloproliferative neoplasms. Correlate with hematologic findings and consult hematology for management.",
  },
  {
    name: "BCR-ABL1",
    ids: ["BCR-ABL1", "BCRABL1"],
    solution:
      "BCR-ABL1 fusion is diagnostic in chronic myeloid leukemia and has established targeted therapies. Confirm with appropriate testing and consult hematology guidelines.",
  },
  {
    name: "FLT3-ITD",
    ids: ["FLT3-ITD", "FLT3ITD"],
    solution:
      "FLT3 internal tandem duplications have prognostic and therapeutic relevance in acute myeloid leukemia. Confirm mutation status and involve hematology/oncology specialists.",
  },
];

function normalize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function findMutation(entry) {
  const normalizedEntry = normalize(entry);

  return mutationCatalog.find((item) => {
    const nameMatch = normalize(item.name).includes(normalizedEntry);
    const idMatch = item.ids.some((id) => normalize(id) === normalizedEntry || normalize(id).includes(normalizedEntry));
    return nameMatch || idMatch;
  });
}

function renderResults(entries) {
  const results = document.getElementById("results");

  if (!entries.length) {
    results.innerHTML = '<div class="empty-state">Enter one or more mutation names or IDs to get started.</div>';
    return;
  }

  const cards = entries
    .map((entry) => {
      const match = findMutation(entry);
      if (!match) {
        return `
          <article class="result-card">
              <h3>${entry}</h3>
              <p>No matching entry was found in this catalog.</p>
            </article>
        `;
      }

      return `
        <article class="result-card">
          <h3>${match.name}</h3>
          <p><strong>Suggested direction:</strong> ${match.solution}</p>
        </article>
      `;
    })
    .join("");

  results.innerHTML = cards;
}

function handleLookup() {
  const rawInput = document.getElementById("mutationInput").value;
  const entries = rawInput
    .split(/\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean);

  renderResults(entries);
}

function clearInput() {
  document.getElementById("mutationInput").value = "";
  renderResults([]);
}

document.getElementById("lookupBtn").addEventListener("click", handleLookup);
document.getElementById("clearBtn").addEventListener("click", clearInput);

document.getElementById("mutationInput").addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    handleLookup();
  }
});

renderResults([]);
