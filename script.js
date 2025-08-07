
const cursos = [
  { nombre: "Introducción a las Sociedades Modernas", creditos: 6, tipo: "carrera" },
  { nombre: "Taller de Escritura Sociológica I", creditos: 4, tipo: "carrera" },
  { nombre: "Curso de Formación General I", creditos: 4, tipo: "cfg" },
  { nombre: "Sociología Política", creditos: 6, tipo: "optativo" },
  { nombre: "Pensamiento Político y Filosófico de América Latina", creditos: 6, tipo: "optativo" }
];
const savedData = JSON.parse(localStorage.getItem("mallaData") || "{}");
const grid = document.getElementById("courseGrid");
function renderMalla() {
  grid.innerHTML = "";
  let totalCreditos = 0;
  let aprobados = 0;
  let sumaCreditosNotas = 0;
  let contadores = { cfg: 0, carrera: 0, optativo: 0 };
  cursos.forEach((curso, index) => {
    const card = document.createElement("div");
    card.classList.add("course-card", curso.tipo);
    const estado = savedData[index] || {};
    const aprobado = estado.aprobado || false;
    const nota = estado.nota || "";
    if (aprobado) card.classList.add("approved");
    const label = document.createElement("span");
    label.classList.add("label", curso.tipo);
    label.innerText = curso.tipo.toUpperCase();
    card.appendChild(label);
    const h3 = document.createElement("h3");
    h3.textContent = curso.nombre;
    card.appendChild(h3);
    const creditos = document.createElement("p");
    creditos.textContent = `${curso.creditos} créditos`;
    card.appendChild(creditos);
    const notaInput = document.createElement("input");
    notaInput.type = "number";
    notaInput.min = 1; notaInput.max = 7; notaInput.step = 0.1;
    notaInput.placeholder = "Nota"; notaInput.value = nota;
    card.appendChild(notaInput);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; checkbox.checked = aprobado;
    checkbox.addEventListener("change", () => saveData(index, checkbox.checked, notaInput.value));
    notaInput.addEventListener("change", () => saveData(index, checkbox.checked, notaInput.value));
    const labelCheck = document.createElement("label");
    labelCheck.textContent = "Aprobado "; labelCheck.appendChild(checkbox);
    card.appendChild(labelCheck);
    if (aprobado && nota >= 4.0) {
      contadores[curso.tipo]++; totalCreditos += curso.creditos;
      sumaCreditosNotas += curso.creditos * parseFloat(nota);
      aprobados++;
    }
    grid.appendChild(card);
  });
  const porcentaje = Math.round((aprobados / cursos.length) * 100);
  const promedio = sumaCreditosNotas && totalCreditos ? (sumaCreditosNotas / totalCreditos).toFixed(2) : "-";
  document.getElementById("totalProgress").textContent = `${porcentaje}%`;
  document.getElementById("weightedGPA").textContent = promedio;
  document.getElementById("totalCredits").textContent = totalCreditos;
  document.getElementById("cfgCount").textContent = contadores.cfg;
  document.getElementById("coreCount").textContent = contadores.carrera;
  document.getElementById("specCount").textContent = contadores.optativo;
}
function saveData(index, aprobado, nota) {
  savedData[index] = { aprobado, nota: parseFloat(nota) };
  localStorage.setItem("mallaData", JSON.stringify(savedData));
  renderMalla();
}
renderMalla();
