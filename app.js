const mutationCatalog = [
  {
    name: "Point Mutation — Curiosity↑",
    name: "CUR1 Point Mutation",
    ids: ["CUR1", "CUR-1", "curiosity"],
    solution: "Small persistent increase to chance of novel insight.",
  },
  {
    name: "Gene Duplication — Parallel Inquiry",
    name: "DUP1 Gene Duplication",
    ids: ["DUP1", "DUP-1", "parallel-inquiry"],
    solution: "Run two simultaneous experiments; doubles small-discovery chance briefly.",
  },
  {
    name: "Promoter Upregulation — Focused Persistence",
    name: "PROM1 Upregulation",
    ids: ["PROM1", "PROM-1", "focused-persistence"],
    solution: "Short-term boost to sustained exploration (longer experiment windows).",
  },
  {
    name: "Promoter Downregulation — Caution Allele",
    name: "PROM2 Downregulation",
    ids: ["PROM2", "PROM-2", "caution-allele"],
    solution: "Reduces risk of catastrophic failures at cost of slower progress.",
  },
  {
    name: "Missense Mutation — Method Tweak",
    name: "MSN1 Missense",
    ids: ["MSN1", "MSN-1", "method-tweak"],
    solution: "Alters a protocol step to improve success probability for similar experiments.",
  },
  {
    name: "Nonsense Mutation — Abrupt Halt",
    name: "NSN1 Nonsense",
    ids: ["NSN1", "NSN-1", "abrupt-halt"],
    solution: "One experiment fails fast, revealing hidden failure modes for later avoidance.",
  },
  {
    name: "Frame-Shift Insertion — Serendipity Spike",
    name: "FSI1 Frameshift",
    ids: ["FSI1", "FSI-1", "frameshift"],
    solution: "High-variance outcome; small chance of breakthrough, larger chance of noise.",
  },
  {
    name: "Copy Number Variation — Resource Amplification",
    name: "CNV1 CopyNumber",
    ids: ["CNV1", "CNV-1", "resource-amplification"],
    solution: "Temporarily increases available reagents/equipment for extra trials.",
  },
  {
    name: "Splice-site Mutation — Modular Recombine",
    name: "SPL1 SpliceSite",
    ids: ["SPL1", "SPL-1", "splice-recombine"],
    solution: "Recombine two methods into a new hybrid with mixed benefits.",
  },
  {
    name: "Translocation — Cross-Field Fusion",
    name: "TRL1 Translocation",
    ids: ["TRL1", "TRL-1", "translocation-fusion"],
    solution: "Moves a technique from one domain to another, unlocking novel synergies.",
  },
  {
    name: "Inversion — Reverse-Protocol",
    name: "INV1 Inversion",
    ids: ["INV1", "INV-1", "reverse-protocol"],
    solution: "Run experiment backward to reveal hidden controls or dependencies.",
  },
  {
    name: "Gain-of-Function — Rapid Modeling",
    name: "GOF1 GainOfFunction",
    ids: ["GOF1", "GOF-1", "rapid-modeling"],
    solution: "Grants ability to run fast computational models that narrow hypotheses.",
  },
  {
    name: "Loss-of-Function — Noise Filter",
    name: "LOF1 LossOfFunction",
    ids: ["LOF1", "LOF-1", "noise-filter"],
    solution: "Removes a distracting variable, improving signal-to-noise in measurements.",
  },
  {
    name: "Epistatic Interaction — Collaboration Allele",
    name: "EPI1 Epistasis",
    ids: ["EPI1", "EPI-1", "epistatic-interaction"],
    solution: "Interaction with another mutation yields emergent, non-linear benefits.",
  },
  {
    name: "Pleiotropic Effect — Broad Insight",
    name: "PLE1 Pleiotropy",
    ids: ["PLE1", "PLE-1", "broad-insight"],
    solution: "Single result yields multiple modest benefits across research areas.",
  },
  {
    name: "Retrotransposon Insertion — Legacy Recovery",
    name: "RTI1 Retrotransposon",
    ids: ["RTI1", "RTI-1", "legacy-recovery"],
    solution: "Re-activate old archived methods to recover lost capabilities.",
  },
  {
    name: "Methylation Change — Memory Bias",
    name: "MET1 Methylation",
    ids: ["MET1", "MET-1", "memory-bias"],
    solution: "Alters retention of past results, increasing reuse of successful protocols.",
  },
  {
    name: "RNA Editing Variant — Adaptive Protocol",
    name: "RNA1 RNAEdit",
    ids: ["RNA1", "RNA-1", "adaptive-protocol"],
    solution: "Allows on-the-fly small adjustments to procedures mid-experiment.",
  },
  {
    name: "Mobile Element Activation — Crowdsourced Gain",
    name: "MEL1 MobileElement",
    ids: ["MEL1", "MEL-1", "crowdsourced-gain"],
    solution: "Triggers external data contributions that scale statistical power.",
  },
  {
    name: "Conditional Allele — Delayed Revelation",
    name: "COND1 Conditional",
    ids: ["COND1", "COND-1", "delayed-revelation"],
    solution: "Starts latent; after a time delay it unlocks a high-value insight.",
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
          ${match.category ? `<div class="mut-category">${match.category}</div>` : ""}
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
