function simular() {
  const v0 = parseFloat(document.getElementById("velocidade").value);
  const ang = parseFloat(document.getElementById("angulo").value) * Math.PI / 180;
  const g = parseFloat(document.getElementById("gravidade").value);

  const v0x = v0 * Math.cos(ang);
  const v0y = v0 * Math.sin(ang);

  const tempoSubida = v0y / g;
  const alturaMax = (v0y ** 2) / (2 * g);
  const tempoTotal = 2 * tempoSubida;
  const alcance = v0x * tempoTotal;

  document.getElementById("resultados").innerHTML = `
    <h3>Resultados:</h3>
    <p>Tempo de subida: ${tempoSubida.toFixed(2)} s</p>
    <p>Tempo total de voo: ${tempoTotal.toFixed(2)} s</p>
    <p>Altura máxima: ${alturaMax.toFixed(2)} m</p>
    <p>Alcance horizontal: ${alcance.toFixed(2)} m</p>
  `;

  animarTrajetoria(v0x, v0y, g, tempoTotal);
}

function animarTrajetoria(vx, vy, g, tTotal) {
  const canvas = document.getElementById("grafico");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const escalaX = canvas.width / (vx * tTotal);
  const escalaY = canvas.height / ((vy ** 2) / (2 * g));

  let t = 0;
  const dt = 0.02;

  function desenharFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Trajetória
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let temp = 0; temp <= tTotal; temp += 0.05) {
      const x = vx * temp;
      const y = vy * temp - 0.5 * g * temp * temp;
      const px = x * escalaX;
      const py = canvas.height - y * escalaY;
      ctx.lineTo(px, py);
    }
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    // Projétil
    const x = vx * t;
    const y = vy * t - 0.5 * g * t * t;
    const px = x * escalaX;
    const py = canvas.height - y * escalaY;

    ctx.beginPath();
    ctx.arc(px, py, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();

    t += dt;
    if (t <= tTotal) {
      requestAnimationFrame(desenharFrame);
    }
  }

  desenharFrame();
}
