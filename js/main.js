document.addEventListener("DOMContentLoaded", () => {

  // Todos los modelos (animados o no)
  const models = document.querySelectorAll(".ar-model");
  const markers = document.querySelectorAll("a-marker");

  // Ocultar todos los modelos al iniciar
  models.forEach(model => {
    model.object3D.visible = false;
  });

  markers.forEach(marker => {

    const model = marker.querySelector(".ar-model");
    if (!model) return;

    model.addEventListener("model-loaded", () => {

      marker.addEventListener("markerFound", () => {

        // Ocultar TODOS los modelos primero
        models.forEach(m => {
          m.object3D.visible = false;

          // Detener animaciones activas
          if (m.classList.contains("animated")) {
            m.removeAttribute("animation-mixer");
          }
        });

        // Mostrar solo el modelo del marker actual
        model.object3D.visible = true;

        // Activar animación solo si aplica
        if (model.classList.contains("animated")) {
          model.setAttribute("animation-mixer", {
            loop: "repeat",
            timeScale: 1
          });
        }
      });

      marker.addEventListener("markerLost", () => {

        model.object3D.visible = false;

        if (model.classList.contains("animated")) {
          model.removeAttribute("animation-mixer");
        }
      });

    });

  });

});
