document.addEventListener("DOMContentLoaded", () => {

  const markers = document.querySelectorAll("a-marker");
  let activeMarker = null;

  markers.forEach(marker => {
    const entity = marker.querySelector("a-entity");
    if (!entity) return;

    // Ocultar todos los modelos al inicio
    entity.setAttribute("visible", false);

    marker.addEventListener("markerFound", () => {

      // Ocultar el modelo anterior si existe
      if (activeMarker && activeMarker !== marker) {
        const prevEntity = activeMarker.querySelector("a-entity");
        if (prevEntity) {
          prevEntity.setAttribute("visible", false);
          prevEntity.removeAttribute("animation-mixer");
        }
      }

      // Mostrar este modelo
      entity.setAttribute("visible", true);

      // Activar animación solo si corresponde
      if (entity.classList.contains("animated")) {
        entity.setAttribute("animation-mixer", {
          loop: "repeat",
          timeScale: 1
        });
      }

      activeMarker = marker;
    });

    marker.addEventListener("markerLost", () => {
      entity.setAttribute("visible", false);
      entity.removeAttribute("animation-mixer");

      if (activeMarker === marker) {
        activeMarker = null;
      }
    });
  });

});
