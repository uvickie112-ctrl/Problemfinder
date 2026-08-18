const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const heroSubmit = document.getElementById("heroSubmit");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("problemForm");
const searchInput = document.getElementById("searchInput");
const problemGrid = document.getElementById("problemGrid");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");


/* ---------------------------
   MODAL
---------------------------- */

function showModal() {
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

openModal?.addEventListener("click", showModal);
heroSubmit?.addEventListener("click", showModal);
closeModal?.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});


/* ---------------------------
   MOBILE SIDEBAR
---------------------------- */

menuBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


/* ---------------------------
   SEARCH
---------------------------- */

searchInput?.addEventListener("input", (event) => {

  const query = event.target.value.toLowerCase().trim();

  const cards = document.querySelectorAll(".problem-card");

  cards.forEach(card => {

    const searchableText =
      card.innerText.toLowerCase() +
      " " +
      (card.dataset.search || "");

    if (searchableText.includes(query)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }

  });

});


/* ---------------------------
   FILTER BUTTONS
---------------------------- */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.textContent.trim();

    const cards = [...document.querySelectorAll(".problem-card")];

    if (filter === "Trending") {

      cards.sort((a, b) => {
        const aTrend = parseInt(
          a.querySelector(".trend").textContent.replace(/\D/g, "")
        );

        const bTrend = parseInt(
          b.querySelector(".trend").textContent.replace(/\D/g, "")
        );

        return bTrend - aTrend;
      });

    }

    if (filter === "High Demand") {

      cards.sort((a, b) => {

        const aScore = parseInt(
          a.querySelector(".mini-metrics div:first-child strong").textContent
        );

        const bScore = parseInt(
          b.querySelector(".mini-metrics div:first-child strong").textContent
        );

        return bScore - aScore;
      });

    }

    if (filter === "Emerging") {

      cards.sort((a, b) => {

        const aTrend = parseInt(
          a.querySelector(".trend").textContent.replace(/\D/g, "")
        );

        const bTrend = parseInt(
          b.querySelector(".trend").textContent.replace(/\D/g, "")
        );

        return bTrend - aTrend;

      });

    }

    cards.forEach(card => {
      problemGrid.appendChild(card);
    });

  });

});


/* ---------------------------
   SUBMIT PROBLEM
---------------------------- */

form?.addEventListener("submit", async (event) => {

  event.preventDefault();

  const title = document.getElementById("problemTitle").value.trim();
  const description = document
    .getElementById("problemDescription")
    .value.trim();

  const category = document.getElementById("category").value;
  const location = document.getElementById("location").value.trim();

  if (!title || !description) {
    alert("Please describe the problem first.");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");

  submitButton.disabled = true;
  submitButton.innerHTML = "✦ Analyzing Problem...";

  /*
   * This is where your real backend/AI API
   * should be connected.
   */

  await new Promise(resolve => setTimeout(resolve, 1500));

  const opportunityScore =
    Math.floor(Math.random() * 21) + 75;

  const newCard = document.createElement("article");

  newCard.className = "problem-card";

  newCard.dataset.search =
    `${title} ${description} ${category} ${location}`.toLowerCase();

  newCard.innerHTML = `

    <div class="card-top">
      <span class="category">${category.toUpperCase()}</span>
      <span class="trend">NEW</span>
    </div>

    <h3>${escapeHTML(title)}</h3>

    <p>${escapeHTML(description)}</p>

    <div class="score-row">

      <div class="score">

        <div class="score-ring"
             style="--score:${opportunityScore}">

          <span>${opportunityScore}</span>

        </div>

        <small>Opportunity</small>

      </div>

      <div class="mini-metrics">

        <div>
          <span>Demand</span>
          <strong>${opportunityScore - 2}</strong>
        </div>

        <div>
          <span>Growth</span>
          <strong>${opportunityScore - 7}</strong>
        </div>

        <div>
          <span>Solvability</span>
          <strong>${opportunityScore - 4}</strong>
        </div>

      </div>

    </div>

    <div class="card-footer">

      <span>🌍 ${escapeHTML(location || "Unknown")}</span>

      <button class="details-btn">
        View Analysis →
      </button>

    </div>

  `;

  problemGrid.prepend(newCard);

  form.reset();

  submitButton.disabled = false;
  submitButton.innerHTML = "✦ Analyze With AI";

  hideModal();

  alert(
    `Problem analyzed successfully!\n\nOpportunity Score: ${opportunityScore}/100`
  );

});


/* ---------------------------
   SECURITY HELPER
---------------------------- */

function escapeHTML(value) {

  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML;

}


/* ---------------------------
   CLOSE SIDEBAR ON LINK CLICK
---------------------------- */

document.querySelectorAll(".nav-item").forEach(item => {

  item.addEventListener("click", () => {

    if (window.innerWidth <= 1000) {
      sidebar.classList.remove("open");
    }

  });

});
