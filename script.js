let logotipoBase64 = "";

function previewLogotipo() {
  const file = document.getElementById("logotipo").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      logotipoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function generarCertificado() {
  const nombreTitular = document.getElementById("nombreTitular").value;
  const nombreMarca = document.getElementById("nombreMarca").value;
  const clase = document.getElementById("clase").value;
  const descripcion = document.getElementById("descripcion").value;

  if (!nombreTitular || !nombreMarca || !descripcion) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const numeroRegistro = `IMPI-${new Date().getFullYear()}/${Math.floor(Math.random() * 1000000)}`;
  const qrTexto = `Número de Registro: ${numeroRegistro}\nTitular: ${nombreTitular}\nMarca: ${nombreMarca}`;

  // Crear QR
  const certificadoPreview = document.getElementById("certificadoPreview");
  certificadoPreview.innerHTML = `
    <p><strong>Número de Registro:</strong> ${numeroRegistro}</p>
    <p><strong>Nombre del Titular:</strong> ${nombreTitular}</p>
    <p><strong>Nombre de la Marca:</strong> ${nombreMarca}</p>
    <p><strong>Clase:</strong> ${clase}</p>
    <p><strong>Descripción:</strong> ${descripcion}</p>
    ${logotipoBase64 ? `<img src="${logotipoBase64}" alt="Logotipo">` : ""}
    <canvas id="qrCanvas"></canvas>
  `;

  QRCode.toCanvas(document.getElementById("qrCanvas"), qrTexto, function (error) {
    if (error) console.error(error);
  });

  document.getElementById("preview").style.display = "block";
  guardarHistorial(numeroRegistro, nombreMarca);
}

function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const certificadoPreview = document.getElementById("certificadoPreview").innerHTML;

  pdf.html(certificadoPreview, {
    callback: function () {
      pdf.save("Certificado_IMPI.pdf");
    },
  });
}

function guardarHistorial(numero, marca) {
  const historialLista = document.getElementById("historialLista");
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = `${numero} - ${marca}`;
  historialLista.appendChild(li);
}