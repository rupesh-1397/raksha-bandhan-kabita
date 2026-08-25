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

let discovered = new Set();

const surprises = {
  flower: {
      eyebrow: "THE OFFICIAL REPORT",
          icon: "✿",
              title: "Kabita Shah",
                  text: `
                        After years of extremely serious research,
                              we've reached one very important conclusion...
                                    <br><br>
                                          <strong>You're still my sister.</strong>
                                                <br><br>
                                                      Further investigation is required to determine
                                                            exactly how you keep winning every argument.
                                                                  😂
                                                                      `
                                                                        },

                                                                          letter: {
                                                                              eyebrow: "SOMETHING I DON'T SAY ENOUGH",
                                                                                  icon: "♡",
                                                                                      title: "A little note",
                                                                                          text: `
                                                                                                Some things are easier to write than to say.
                                                                                                      <br><br>
                                                                                                            This one is waiting for you later.
                                                                                                                  <br><br>
                                                                                                                        <em>Don't worry. I'm not getting emotional yet.</em>
                                                                                                                            `
                                                                                                                              },

                                                                                                                                gift: {
                                                                                                                                    eyebrow: "YOU FOUND THIS",
                                                                                                                                        icon: "◇",
                                                                                                                                            title: "The mystery",
                                                                                                                                                text: `
                                                                                                                                                      Interesting...
                                                                                                                                                            <br><br>
                                                                                                                                                                  You found the thing I wasn't planning
                                                                                                                                                                        to explain yet.
                                                                                                                                                                              <br><br>
                                                                                                                                                                                    Maybe there's more waiting for you.
                                                                                                                                                                                          👀
                                                                                                                                                                                              `
                                                                                                                                                                                                }
                                                                                                                                                                                                };

                                                                                                                                                                                                enterBtn.addEventListener("click", () => {
                                                                                                                                                                                                  opening.classList.remove("active");

                                                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                                                        discovery.classList.add("active");
                                                                                                                                                                                                          }, 350);
                                                                                                                                                                                                          });

                                                                                                                                                                                                          document.querySelectorAll(".discovery-card").forEach(card => {
                                                                                                                                                                                                            card.addEventListener("click", () => {

                                                                                                                                                                                                                const type = card.dataset.type;
                                                                                                                                                                                                                    const surprise = surprises[type];

                                                                                                                                                                                                                        discovered.add(type);

                                                                                                                                                                                                                            card.classList.add("discovered");

                                                                                                                                                                                                                                progressText.textContent =
                                                                                                                                                                                                                                      `${discovered.size} of 3 discovered`;

                                                                                                                                                                                                                                          modalEyebrow.textContent = surprise.eyebrow;
                                                                                                                                                                                                                                              modalIcon.textContent = surprise.icon;
                                                                                                                                                                                                                                                  modalTitle.textContent = surprise.title;
                                                                                                                                                                                                                                                      modalText.innerHTML = surprise.text;

                                                                                                                                                                                                                                                          modal.classList.add("open");
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                            function closeTheModal() {
                                                                                                                                                                                                                                                              modal.classList.remove("open");
                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                              closeModal.addEventListener("click", closeTheModal);
                                                                                                                                                                                                                                                              modalContinue.addEventListener("click", closeTheModal);

                                                                                                                                                                                                                                                              document.querySelector(".modal-backdrop").addEventListener(
                                                                                                                                                                                                                                                                "click",
                                                                                                                                                                                                                                                                  closeTheModal
                                                                                                                                                                                                                                                                  );