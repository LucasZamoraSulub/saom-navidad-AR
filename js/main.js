document.addEventListener("DOMContentLoaded", () => {
  const modelo = document.querySelector("#modelo-polar");

  if (!modelo) return;

  // Rotación suave continua
  modelo.addEventListener("model-loaded", () => {
    let rotacion = 0;

    setInterval(() => {
      rotacion += 0.5;
      modelo.setAttribute("rotation", `0 ${rotacion} 0`);
    }, 50);
  });
});
