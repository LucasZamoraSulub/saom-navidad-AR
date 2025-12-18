document.addEventListener("DOMContentLoaded", () => {
  const rotables = document.querySelectorAll(".rotating");

  rotables.forEach((entity) => {
    entity.addEventListener("model-loaded", () => {
      let rotation = 0;

      setInterval(() => {
        rotation += 0.3;
        entity.setAttribute("rotation", `0 ${rotation} 0`);
      }, 50);
    });
  });
});
