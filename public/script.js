document.getElementById('agregar').addEventListener('click', async () => {
    const descripcion = document.getElementById('descripcion').value;
    if (descripcion) {
        const response = await fetch('/api/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion })
        });
        const nuevaTarea = await response.json();
        agregarTareaDOM(nuevaTarea);
        document.getElementById('descripcion').value = '';
    }
});

async function cargarTareas() {
    const response = await fetch('/api/tareas');
    const tareas = await response.json();
    tareas.forEach(tarea => agregarTareaDOM(tarea));
}

function agregarTareaDOM(tarea) {
    const li = document.createElement('li');
    li.textContent = tarea.descripcion;
    li.dataset.id = tarea.id;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => eliminarTarea(tarea.id);

    const btnModificar = document.createElement('button');
    btnModificar.textContent = 'Modificar';
    btnModificar.onclick = () => modificarTarea(tarea.id);

    li.appendChild(btnModificar);
    li.appendChild(btnEliminar);
    document.getElementById('lista-tareas').appendChild(li);
}

async function eliminarTarea(id) {
    await fetch(`/api/tareas/${id}`, { method: 'DELETE' });
    document.querySelector(`li[data-id="${id}"]`).remove();
}

async function modificarTarea(id) {
    const nuevaDescripcion = prompt('Nueva descripción:');
    if (nuevaDescripcion) {
        await fetch(`/api/tareas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion: nuevaDescripcion })
        });
        document.querySelector(`li[data-id="${id}"]`).childNodes[0].textContent = nuevaDescripcion;
    }
}

cargarTareas();
