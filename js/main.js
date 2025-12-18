document.addEventListener("DOMContentLoaded", () => {
  const animatedModels = document.querySelectorAll(".animated");

  animatedModels.forEach((entity) => {
    const marker = entity.closest("a-marker");

    if (!marker) return;

    // Cuando el modelo termina de cargar
    entity.addEventListener("model-loaded", () => {
      // Espera a que el marcador sea visible
      marker.addEventListener("markerFound", () => {
        entity.setAttribute("animation-mixer", {
          loop: "repeat",
          timeScale: 1
        });
      });

      // Detiene animación cuando se pierde el marcador
      marker.addEventListener("markerLost", () => {
        entity.removeAttribute("animation-mixer");
      });
    });
  });
});
