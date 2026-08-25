const opening = document.getElementById("opening");
const discovery = document.getElementById("discovery");
const enterBtn = document.getElementById("enterBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalContinue = document.getElementById("modalContinue");

const modalEyebrow = document.getElementById("modalEyebrow");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const progressText = document.getElementById("progressText");

const memories = document.getElementById("memories");
const finalReveal = document.getElementById("finalReveal");
const continueBtn = document.getElementById("continueBtn");

const rakhiBtn = document.getElementById("rakhiBtn");
const rakhiMessage = document.getElementById("rakhiMessage");

const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const closePhoto = document.getElementById("closePhoto");

let discovered = new Set();


/* ================= CONTENT ================= */

const surprises = {

  report: {

    eyebrow: "THE OFFICIAL CASE FILE",

    icon: "✦",

    title: "Kabita Shah",

    text: `

      <strong>SUBJECT:</strong> Kabita<br>
      <strong>KNOWN ALIAS:</strong> "Bro"<br><br>

      After years of extremely serious investigation,
      several suspicious activities have been uncovered.

      <br><br>

      📺 <strong>Remote Wars</strong><br>
      Repeated childhood disputes over television ownership.

      <br><br>

      🧹 <strong>The Great Cleanup Incident</strong><br>
      Subject becomes angry. Things get thrown.
      Somehow, the cleanup department becomes... me. 🥲

      <br><br>

      🤐 <strong>Secret-Keeping Failure</strong><br>
      Confidential information has approximately
      three minutes of survival around the subject.

      <br><br>

      🛍️ <strong>Shopping Investigation</strong><br>
      Subject can spend an impressive amount of time
      looking for clothes online.

      <br><br>

      🔮 <strong>The Fortune Teller Files</strong><br>
      Two children once seriously searched for fortune tellers,
      made appointments and investigated their future.

      <br><br>

      <strong>FINAL VERDICT:</strong><br>

      Guilty of being annoying, unpredictable,
      impossible to keep secrets from...

      <br><br>

      ...and somehow still one of the most important people
      in my life.

    `
  },


  letter: {

    eyebrow: "SOMETHING I DON'T SAY ENOUGH",

    icon: "♡",

    title: "Dear Bro...",

    text: `

      I don't think I've ever properly told you
      how important you are to me.

      <br><br>

      You're technically my cousin,
      but honestly, I've never really thought of you that way.

      I grew up with you.

      <br><br>

      We fought over the TV remote.
      We survived your angry moments.
      I cleaned up the disasters that followed. 😂

      And somehow, after all of that,
      we still ended up being there for each other.

      <br><br>

      You've supported me more times than I can count.

      You've helped me when I needed it,
      stood by me when things weren't easy,
      and even protected me when I was in trouble.

      <br><br>

      And yes...

      <br>

      <strong>YOU STILL CANNOT KEEP A SECRET. 😂</strong>

      <br><br>

      But honestly,
      I wouldn't trade all those crazy little memories
      for anything.

      <br><br>

      Wherever life takes us,
      I hope we never become strangers to each other.

      <br><br>

      Happy Raksha Bandhan, Bro. ❤️

    `
  },


  mystery: {

    eyebrow: "TOP SECRET • EYES ONLY",

    icon: "◇",

    title: "The Real Secret",

    text: `

      You thought the secret was about you.

      <br><br>

      Technically...

      <strong>it is.</strong>

      <br><br>

      But the real secret is that
      somewhere between the TV remote fights,
      angry messes, shopping investigations,
      terrible secret-keeping
      and fortune-teller missions...

      <br><br>

      you became much more than just my cousin.

      <br><br>

      You became my <strong>Bro.</strong>

      <br><br>

      And there's one more thing waiting for you.

      <br><br>

      <em>Keep going.</em> 👀

    `
  }

};


/* ================= ENTER ================= */

enterBtn.addEventListener("click", () => {

  enterBtn.classList.add("clicked");

  document.body.classList.add("transitioning");

  opening.classList.remove("active");

  setTimeout(() => {

    discovery.classList.add("active");

  }, 500);

});


/* ================= DISCOVERY ================= */

document.querySelectorAll(".discovery-card").forEach(card => {

  card.addEventListener("click", () => {

    const type = card.dataset.type;

    discovered.add(type);

    card.classList.add("discovered");

    updateProgress();

    openModal(type);

  });

});


function updateProgress() {

  progressText.textContent =
    `${discovered.size} / 3 DISCOVERED`;

}


/* ================= MODALS ================= */

function openModal(type) {

  const item = surprises[type];

  modalEyebrow.textContent = item.eyebrow;
  modalIcon.textContent = item.icon;
  modalTitle.textContent = item.title;
  modalText.innerHTML = item.text;

  modal.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeTheModal() {

  modal.classList.remove("open");

  document.body.style.overflow = "";

}


closeModal.addEventListener("click", closeTheModal);

modalContinue.addEventListener("click", closeTheModal);

document.querySelector(".modal-backdrop")
  .addEventListener("click", closeTheModal);


/* ================= ALL DISCOVERED ================= */

function checkCompletion() {

  if (discovered.size === 3) {

    setTimeout(() => {

      memories.classList.add("active");

      memories.scrollIntoView({
        behavior: "smooth"
      });

    }, 700);

  }

}


/* Check whenever a card is clicked */

document.querySelectorAll(".discovery-card").forEach(card => {

  card.addEventListener("click", () => {

    setTimeout(checkCompletion, 300);

  });

});


/* ================= PHOTO VIEWER ================= */

document.querySelectorAll(".memory-photo").forEach(photo => {

  photo.addEventListener("click", () => {

    const image = photo.dataset.image;

    viewerImage.src = image;

    photoViewer.classList.add("open");

    document.body.style.overflow = "hidden";

  });

});


function closePhotoViewer() {

  photoViewer.classList.remove("open");

  document.body.style.overflow = "";

}


closePhoto.addEventListener("click", closePhotoViewer);

photoViewer.addEventListener("click", event => {

  if (event.target === photoViewer) {

    closePhotoViewer();

  }

});


/* ================= CONTINUE ================= */

continueBtn.addEventListener("click", () => {

  memories.classList.remove("active");

  finalReveal.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* ================= RAKHI ================= */

rakhiBtn.addEventListener("click", () => {

  if (rakhiMessage.classList.contains("show")) {
    return;
  }

  rakhiBtn.classList.add("rakhi-tied");

  setTimeout(() => {

    rakhiMessage.classList.add("show");

    createCelebration();

  }, 900);

});


/* ================= CELEBRATION ================= */

function createCelebration() {

  const symbols = ["✦", "✧", "♡", "◇"];

  for (let i = 0; i < 24; i++) {

    const particle = document.createElement("span");

    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.position = "fixed";

    particle.style.left = "50%";
    particle.style.top = "50%";

    particle.style.zIndex = "200";

    particle.style.pointerEvents = "none";

    particle.style.color =
      i % 2 === 0 ? "#b79258" : "#6b283b";

    particle.style.fontSize =
      `${10 + Math.random() * 12}px`;

    document.body.appendChild(particle);

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      100 + Math.random() * 170;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    particle.animate(

      [
        {
          transform: "translate(-50%, -50%) scale(.4)",
          opacity: 0
        },

        {
          transform:
            `translate(${x}px, ${y}px) scale(1.2)`,
          opacity: 1
        },

        {
          transform:
            `translate(${x * 1.2}px, ${y * 1.2}px) scale(.4)`,
          opacity: 0
        }
      ],

      {
        duration: 1300 + Math.random() * 700,
        easing: "cubic-bezier(.2,.8,.2,1)"
      }

    ).onfinish = () => {

      particle.remove();

    };

  }

}


/* ================= ESC KEY ================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeTheModal();
    closePhotoViewer();

  }

});
