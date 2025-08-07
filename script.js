
const malla = [
  {
    semestre: "Semestre 1",
    ramos: [
      { nombre: "Inglés I", creditos: 5 },
      { nombre: "Matemáticas", creditos: 5 },
      { nombre: "Problemas Sociales", creditos: 5 },
      { nombre: "Taller de Escritura Sociológica I", creditos: 5 },
      { nombre: "Introducción a las Sociedades Modernas", creditos: 5 },
      { nombre: "Introducción a la Sociología", creditos: 5 }
    ]
  }
];

const app = document.getElementById("app");

function renderMalla() {
  app.innerHTML = "";

  malla.forEach((sem, sIndex) => {
    const div = document.createElement("div");
    div.className = "semestre";

    const h3 = document.createElement("h3");
    h3.textContent = sem.semestre;
    div.appendChild(h3);

    sem.ramos.forEach((ramo, rIndex) => {
      const cont = document.createElement("div");
      cont.className = "ramo";

      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" id="${sem.semestre}-${rIndex}" /> ${ramo.nombre} (${ramo.creditos} cred)`;

      const notaInput = document.createElement("input");
      notaInput.type = "number";
      notaInput.placeholder = "Nota";
      notaInput.min = 1;
      notaInput.max = 7;
      notaInput.step = 0.1;

      notaInput.addEventListener("input", calcular);

      cont.appendChild(label);
      cont.appendChild(notaInput);

      div.appendChild(cont);
    });

    app.appendChild(div);
  });

  const resumen = document.createElement("div");
  resumen.innerHTML = `
    <h3>Resumen</h3>
    <p id="promedio">Promedio: 0</p>
    <p id="avance">Avance: 0%</p>
  `;
  app.appendChild(resumen);
}

function calcular() {
  let totalCreditos = 0;
  let creditosAprobados = 0;
  let sumaPonderada = 0;

  malla.forEach((sem, sIndex) => {
    sem.ramos.forEach((ramo, rIndex) => {
      const notaInput = document.querySelector(`#app .semestre:nth-child(${sIndex + 1}) .ramo:nth-child(${rIndex + 2}) input[type="number"]`);
      const check = document.querySelector(`#${sem.semestre}-${rIndex}`);

      totalCreditos += ramo.creditos;

      if (check.checked && notaInput.value) {
        const nota = parseFloat(notaInput.value);
        if (!isNaN(nota)) {
          sumaPonderada += nota * ramo.creditos;
          creditosAprobados += ramo.creditos;
        }
      }
    });
  });

  const promedio = creditosAprobados ? (sumaPonderada / creditosAprobados).toFixed(2) : 0;
  const avance = ((creditosAprobados / totalCreditos) * 100).toFixed(1);

  document.getElementById("promedio").textContent = `Promedio: ${promedio}`;
  document.getElementById("avance").textContent = `Avance: ${avance}%`;
}

renderMalla();
