document.addEventListener("DOMContentLoaded", function () {
  // Find all carousels
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carouselElement) => {
    const carousel = carouselElement.querySelector(".carousel__track");
    const seats = carousel.querySelectorAll(".carousel__item");

    // Automatically set `.is-ref` to the last item if none exists
    let refSeat = carousel.querySelector(".is-ref");
    if (!refSeat) {
      refSeat = seats[seats.length - 1];
      refSeat.classList.add("is-ref");
    }

    // Helper function to get the next seat
    const next = (el) => el.nextElementSibling || seats[0];

    // Helper function to get the previous seat
    const prev = (el) => el.previousElementSibling || seats[seats.length - 1];

    // Helper function to update carousel
    const updateCarousel = (direction) => {
      const currentRef = carousel.querySelector(".is-ref");
      let newRef;

      currentRef.classList.remove("is-ref");

      if (direction === "next") {
        newRef = next(currentRef);
        carousel.classList.remove("is-reversing");
      } else {
        newRef = prev(currentRef);
        carousel.classList.add("is-reversing");
      }

      newRef.classList.add("is-ref");
      newRef.style.order = 1;

      let currentSeat = newRef;
      for (let i = 2; i <= seats.length; i++) {
        currentSeat = next(currentSeat);
        currentSeat.style.order = i;
      }

      carousel.classList.remove("is-set");
      setTimeout(() => {
        carousel.classList.add("is-set");
      }, 50);
    };

    // Attach event listeners to buttons
    const buttons = document.querySelectorAll(
      `.carousel__button[data-carousel-id="${carouselElement.dataset.carouselId}"]`,
    );

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.toggle;
        updateCarousel(direction);
      });
    });

    // Touch swipe functionality
    let startX = 0;
    let endX = 0;

    // Use passive listener for touchstart
    carousel.addEventListener(
      "touchstart",
      (event) => {
        startX = event.touches[0].clientX;
      },
      { passive: true },
    );

    // Use passive listener for touchmove
    carousel.addEventListener(
      "touchmove",
      (event) => {
        endX = event.touches[0].clientX;
      },
      { passive: true },
    );

    // Handle touchend without passive option
    carousel.addEventListener("touchend", () => {
      const threshold = 50; // Minimum swipe distance
      const diffX = endX - startX;

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // Swipe right
          updateCarousel("prev");
        } else {
          // Swipe left
          updateCarousel("next");
        }
      }

      // Reset touch positions
      startX = 0;
      endX = 0;
    });
  });
});
