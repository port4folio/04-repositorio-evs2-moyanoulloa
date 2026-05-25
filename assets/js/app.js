console.log("ERP Seguridad LTDA cargado correctamente.");

/*
  Maqueta base del ERP.

  La navegación principal se realiza mediante enlaces HTML:

  - index.html   -> Dashboard ERP
  - bodega.html  -> Módulo Inventario / Bodega

  Las funcionalidades reales del módulo Bodega serán desarrolladas
  posteriormente en ramas feature asociadas a Jira.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona el formulario de registro de bodegas.
  // Si no estamos en la página de bodegas, no hace nada.
  const bodegaForm = document.getElementById('bodegaForm');
  if (!bodegaForm) {
    return;
  }

  // Elementos del DOM usados para mostrar y capturar datos.
  const storageKey = 'erpSeguridadBodegas';
  const bodegaCount = document.getElementById('bodegaCount');
  const bodegaTableBody = document.getElementById('bodegaTableBody');
  const bodegaNombre = document.getElementById('bodegaNombre');
  const bodegaUbicacion = document.getElementById('bodegaUbicacion');
  const bodegaEstado = document.getElementById('bodegaEstado');

  // Carga las bodegas guardadas en localStorage, si existen.
  let bodegas = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Renderiza la tabla de bodegas y actualiza el contador.
  const renderBodegas = () => {
    bodegaTableBody.innerHTML = '';

    if (bodegas.length === 0) {
      bodegaTableBody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-muted">
            No hay bodegas registradas.
          </td>
        </tr>
      `;
    } else {
      bodegas.forEach((bodega) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${bodega.nombre}</td>
          <td>${bodega.ubicacion}</td>
          <td>${bodega.estado}</td>
        `;
        bodegaTableBody.appendChild(row);
      });
    }

    if (bodegaCount) {
      // Actualiza el número total de bodegas mostradas en el resumen.
      bodegaCount.textContent = bodegas.length;
    }
  };

  // Guarda la lista de bodegas en localStorage para persistencia.
  const saveBodegas = () => {
    localStorage.setItem(storageKey, JSON.stringify(bodegas));
  };

  // Controla el envío del formulario de bodega.
  bodegaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!bodegaForm.checkValidity()) {
      bodegaForm.classList.add('was-validated');
      return;
    }

    const nuevaBodega = {
      nombre: bodegaNombre.value.trim(),
      ubicacion: bodegaUbicacion.value.trim(),
      estado: bodegaEstado.value,
    };

    // Agrega la nueva bodega en memoria, la guarda y actualiza la vista.
    bodegas.push(nuevaBodega);
    saveBodegas();
    renderBodegas();

    bodegaForm.reset();
    bodegaForm.classList.remove('was-validated');
    bodegaNombre.focus();
  });

  // Muestra la lista actual al cargar la página.
  renderBodegas();
});