import axios from "axios";
import Swal from 'sweetalert2';
const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click',e =>{
        if (e.target) {
           const icono = e.target;
           const idTarea = icono.parentElement.parentElement.dataset.tarea;
           //request hacia /tareas/:id
           const url = `${location.origin}/tareas/${idTarea}`;
           
           axios.patch(url,{idTarea})
                .then(function (res) {
                    if(res.status === 200){
                        icono.classList.toggle('completo');
                    }
                })
        }

        if(e.target.classList.contains('fa-trash')){
            const tareaHTML = e.target.parentElement.parentElement,
                   idTarea = tareaHTML.dataset.tarea;

                   Swal.fire({
                    title: '¿Deseas borrar esta tarea?',
                    text: "Una tarea eliminada no se puede recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar!',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.value) {
                        //enviar el delete por medio de axios
                        const url = `${location.origin}/tareas/${idTarea}`
                        axios.delete(url,{ params: {idTarea}})
                             .then(function (res) {
                                if (res.status == 200) {
                                    //Eliminar el Nodo
                                    tareaHTML.parentElement.removeChild(tareaHTML)

                                    //Opcional colocar una alerta
                                     Swal.fire({
                                        text: res.data,
                                        icon: 'success'
                                      } )
                                }
                               })
                    }
                  })
        }
    })
}

export default tareas;