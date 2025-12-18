document.addEventListener("DOMContentLoaded", () => {
  const animatedModels = document.querySelectorAll(".animated");

  animatedModels.forEach((entity) => {
    const marker = entity.closest("a-marker");
    if (!marker) return;

    entity.addEventListener("model-loaded", () => {

      marker.addEventListener("markerFound", () => {
        if (!entity.hasAttribute("animation-mixer")) {
          entity.setAttribute("animation-mixer", {
            loop: "repeat",
            timeScale: 1
          });
        }
      });

      marker.addEventListener("markerLost", () => {
        entity.removeAttribute("animation-mixer");
      });

    });
  });
});
