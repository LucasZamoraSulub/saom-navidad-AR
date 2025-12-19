document.addEventListener("DOMContentLoaded", () => {

  const models = document.querySelectorAll(".ar-model");
  const markers = document.querySelectorAll("a-marker");

  let activeModel = null;
  let initialDistance = null;
  let initialScale = null;

  // Ocultar todos al iniciar
  models.forEach(model => {
    model.object3D.visible = false;
  });

  // MARKERS
  markers.forEach(marker => {

    const model = marker.querySelector(".ar-model");
    if (!model) return;

    model.addEventListener("model-loaded", () => {

      marker.addEventListener("markerFound", () => {

        // Ocultar todos
        models.forEach(m => {
          m.object3D.visible = false;
          m.removeAttribute("animation-mixer");
        });

        // Mostrar solo el activo
        model.object3D.visible = true;
        activeModel = model;

        // Activar animación si aplica
        if (model.classList.contains("animated")) {
          model.setAttribute("animation-mixer", {
            loop: "repeat",
            timeScale: 1
          });
        }
      });

      marker.addEventListener("markerLost", () => {
        model.object3D.visible = false;
        model.removeAttribute("animation-mixer");
        if (activeModel === model) activeModel = null;
      });

    });
  });

  // ===== ZOOM PINCH =====
  document.addEventListener("touchstart", (e) => {
    if (!activeModel || e.touches.length !== 2) return;

    initialDistance = getDistance(e.touches[0], e.touches[1]);
    initialScale = activeModel.object3D.scale.clone();
  });

  document.addEventListener("touchmove", (e) => {
    if (!activeModel || e.touches.length !== 2 || !initialDistance) return;

    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    const scaleFactor = currentDistance / initialDistance;

    let newScale = initialScale.x * scaleFactor;

    // límites seguros
    newScale = Math.min(Math.max(newScale, 0.3), 10);

    activeModel.object3D.scale.set(newScale, newScale, newScale);
  });

  document.addEventListener("touchend", () => {
    initialDistance = null;
    initialScale = null;
  });

  function getDistance(touch1, touch2) {
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  }

});
