const navToggle = document.querySelector('[aria-controls="site-nav"]');

if (navToggle) {
  navToggle.addEventListener("click", function () {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  });
};
