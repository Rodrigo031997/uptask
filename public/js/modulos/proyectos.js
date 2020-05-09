import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click',e =>{

        const urlProyecto = e.target.dataset.proyectoUrl;
        // console.log(urlProyecto);
        // return ;

        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.value) {
                //enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                // const params = {urlProyecto}
                axios.delete(url,{params:{urlProyecto}}).then(function(res){
                    
                    Swal.fire(
                        'Eliminado!',
                         res.data,
                        'success'
                      );
                      //redireccionar al inicio
                      setTimeout(()=>{
                      window.location.href = '/'
                      },2000);
                }).catch(()=>{
                    Swal.fire({
                      icon:'error',
                      title:'Ups...',
                      text: 'Hubo un error. No se pudo eliminar el Proyecto'
                    })
                })
            }
          })
    });
}

export default btnEliminar;

