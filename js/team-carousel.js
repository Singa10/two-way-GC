// Two Way — home page "Meet the Team" carousel.
// Renamed/scoped from the generic .card/.dots/.nav-arrow markup so it can't
// collide with the site's own .card grid styles used on every other page.

const teamMembers = [
  { name: "Emily Kim", role: "Founder & General Manager" },
  { name: "Michael Steward", role: "Water Works Director" },
  { name: "Emma Rodriguez", role: "Site Superintendent" },
  { name: "Julia Gimmel", role: "Project Manager" },
  { name: "Lisa Anderson", role: "Safety & Compliance Lead" },
  { name: "James Wilson", role: "Equipment & Fleet Manager" }
];

const teamCards = document.querySelectorAll(".team-carousel__card");
const teamDots = document.querySelectorAll(".team-carousel__dot");
const teamName = document.querySelector(".team-carousel__name");
const teamRole = document.querySelector(".team-carousel__role");
const teamLeftArrow = document.querySelector(".team-carousel__arrow--left");
const teamRightArrow = document.querySelector(".team-carousel__arrow--right");

if (teamCards.length && teamDots.length && teamName && teamRole && teamLeftArrow && teamRightArrow) {
  let currentIndex = 0;
  let isAnimating = false;

  function updateTeamCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + teamCards.length) % teamCards.length;

    teamCards.forEach((card, i) => {
      const offset = (i - currentIndex + teamCards.length) % teamCards.length;

      card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

      if (offset === 0) {
        card.classList.add("center");
      } else if (offset === 1) {
        card.classList.add("right-1");
      } else if (offset === 2) {
        card.classList.add("right-2");
      } else if (offset === teamCards.length - 1) {
        card.classList.add("left-1");
      } else if (offset === teamCards.length - 2) {
        card.classList.add("left-2");
      } else {
        card.classList.add("hidden");
      }
    });

    teamDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    teamName.style.opacity = "0";
    teamRole.style.opacity = "0";

    setTimeout(() => {
      teamName.textContent = teamMembers[currentIndex].name;
      teamRole.textContent = teamMembers[currentIndex].role;
      teamName.style.opacity = "1";
      teamRole.style.opacity = "1";
    }, 300);

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  teamLeftArrow.addEventListener("click", () => updateTeamCarousel(currentIndex - 1));
  teamRightArrow.addEventListener("click", () => updateTeamCarousel(currentIndex + 1));

  teamDots.forEach((dot, i) => {
    dot.addEventListener("click", () => updateTeamCarousel(i));
  });

  teamCards.forEach((card, i) => {
    card.addEventListener("click", () => updateTeamCarousel(i));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      updateTeamCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateTeamCarousel(currentIndex + 1);
    }
  });

  const teamCarouselEl = document.querySelector(".team-carousel");
  if (teamCarouselEl) {
    let touchStartX = 0;
    let touchEndX = 0;

    teamCarouselEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    teamCarouselEl.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > swipeThreshold) {
        updateTeamCarousel(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    });
  }

  updateTeamCarousel(0);
}