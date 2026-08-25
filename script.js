/* ==========================================
   KABITA SURPRISE WEBSITE
   INTERACTION ENGINE
========================================== */


const opening = document.getElementById("opening");
const discovery = document.getElementById("discovery");

const envelope = document.getElementById("envelope");
const enterBtn = document.getElementById("enterBtn");

const transitionFlash = document.getElementById("transitionFlash");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalContinue = document.getElementById("modalContinue");

const modalEyebrow = document.getElementById("modalEyebrow");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");


/* ==========================================
   DISCOVERY DATA
========================================== */

const discoveries = {

  flower: {

    eyebrow: "CONFIDENTIAL CASE FILE",

    icon: "✦",

    title: "The Case File",

    text: `
      <strong>Subject:</strong> Kabita Shah<br><br>

      After an extensive investigation, several suspicious
      behaviours have been documented.<br><br>

      • Unreasonably good at winning arguments.<br>
      • Gives advice even when nobody requested it.<br>
      • Somehow always knows when food is being opened.<br>
      • Has an impressive ability to be right...
      even when she isn't.<br><br>

      <em>Further evidence is currently being collected.</em>
    `

  },


  letter: {

    eyebrow: "CLASSIFIED · HANDLE WITH CARE",

    icon: "♡",

    title: "The Letter",

    text: `
      Okay, this part is different.<br><br>

      Some things are easy to joke about.
      Some things are much harder to say out loud.<br><br>

      So there is a proper letter waiting for you here —
      one that actually comes from me.<br><br>

      <em>
      The placeholder is temporary.
      The real version is coming.
      </em>
    `

  },


  gift: {

    eyebrow: "TOP SECRET",

    icon: "◇",

    title: "The Mystery",

    text: `
      Hmm...<br><br>

      You found this surprisingly quickly.<br><br>

      I was actually planning to hide this a little
      better.<br><br>

      There is something else waiting inside this website,
      but I'm not telling you yet.<br><br>

      <strong>You'll have to keep exploring.</strong>
    `

  }

};


/* ==========================================
   OPEN ENVELOPE
========================================== */

function openSurprise() {

  if (envelope.classList.contains("opening")) {
    return;
  }

  envelope.classList.add("opening");

  enterBtn.disabled = true;

  /*
     Small delay gives the envelope animation
     time to breathe before the cinematic transition.
  */

  setTimeout(() => {

    transitionFlash.classList.remove("active");

    void transitionFlash.offsetWidth;

    transitionFlash.classList.add("active");

  }, 650);


  /*
     Switch screens after the envelope opens.
  */

  setTimeout(() => {

    opening.classList.remove("active");

    discovery.classList.add("active");

  }, 850);


  /*
     Clean up.
  */

  setTimeout(() => {

    envelope.classList.remove("opening");

  }, 1500);

}


/* ==========================================
   BUTTON + ENVELOPE
========================================== */

enterBtn.addEventListener("click", openSurprise);

envelope.addEventListener("click", openSurprise);


/* ==========================================
   DISCOVERY SYSTEM
========================================== */

const cards = document.querySelectorAll(".discovery-card");

const discovered = new Set();


cards.forEach(card => {

  card.addEventListener("click", () => {

    const type = card.dataset.type;

    discovered.add(type);

    updateProgress();

    openModal(type);

    /*
       Little card celebration.
    */

    card.animate(

      [
        {
          transform: "scale(1)"
        },

        {
          transform: "scale(.94)"
        },

        {
          transform: "scale(1.025)"
        },

        {
          transform: "scale(1)"
        }
      ],

      {
        duration: 500,
        easing: "cubic-bezier(.22,1,.36,1)"
      }

    );

  });

});


/* ==========================================
   PROGRESS
========================================== */

function updateProgress() {

  const count = discovered.size;

  progressText.textContent = `${count} / 3 discovered`;

  progressBar.style.width = `${(count / 3) * 100}%`;

}


/* ==========================================
   MODAL
========================================== */

function openModal(type) {

  const data = discoveries[type];

  if (!data) {
    return;
  }


  modalEyebrow.textContent = data.eyebrow;

  modalIcon.textContent = data.icon;

  modalTitle.textContent = data.title;

  modalText.innerHTML = data.text;


  modal.classList.add("active");

  document.body.style.overflow = "hidden";

}


function closeTheModal() {

  modal.classList.remove("active");

  document.body.style.overflow = "";

}


closeModal.addEventListener("click", closeTheModal);

modalContinue.addEventListener("click", closeTheModal);


/* ==========================================
   BACKDROP CLOSE
========================================== */

document
  .querySelector(".modal-backdrop")
  .addEventListener("click", closeTheModal);


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeTheModal();

  }

});


/* ==========================================
   PREVENT DOUBLE TAP ZOOM
========================================== */

let lastTouchEnd = 0;

document.addEventListener(
  "touchend",
  event => {

    const now = Date.now();

    if (now - lastTouchEnd <= 300) {

      event.preventDefault();

    }

    lastTouchEnd = now;

  },
  {
    passive: false
  }
);


/* ==========================================
   INITIAL STATE
========================================== */

updateProgress();
