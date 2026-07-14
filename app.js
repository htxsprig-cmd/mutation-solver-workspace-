const mutationCatalog = [
  {
    name: "EGFR L858R",
    ids: ["EGFR-L858R", "EGFRL858R", "L858R"],
    solution:
      "Targeted therapy with an EGFR inhibitor such as osimertinib may be appropriate for eligible patients. Confirm with a specialist and review resistance testing.",
  },
  {
    name: "BRAF V600E",
    ids: ["BRAF-V600E", "BRAFV600E", "V600E"],
    solution:
      "A BRAF-directed combination such as dabrafenib plus trametinib is a common approach in eligible cases. Clinical context and tumor type matter greatly.",
  },
  {
    name: "KRAS G12C",
    ids: ["KRAS-G12C", "KRASG12C"],
    solution:
      "Targeted therapy options such as sotorasib or adagrasib may be considered in appropriate patients after multidisciplinary review.",
  },
  {
    name: "BRCA1",
    ids: ["BRCA1", "BRCA-1"],
    solution:
      "Genetic counseling, risk assessment, and consideration of PARP inhibitor therapy or enhanced surveillance can be relevant depending on cancer type and stage.",
  },
  {
    name: "ALK fusion",
    ids: ["ALK-FUSION", "ALK"],
    solution:
      "An ALK-targeted therapy such as alectinib or crizotinib may be appropriate when the fusion is confirmed and clinically relevant.",
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
            <p>No matching entry was found in this demo catalog. Try EGFR L858R, BRAF V600E, KRAS G12C, BRCA1, or ALK fusion.</p>
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

renderResults(["EGFR L858R", "BRAF V600E"]);
