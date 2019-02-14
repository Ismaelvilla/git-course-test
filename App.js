class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }

}

class UI {
    addProduct(product) {
        const productList= document.getElementById('product-list');
        const element = document.createElement('div');
        //vamos a añadir codigo html a este div vacio, vamos a usar las `tildes que
        //me permite usar javascript en diferentes lineas
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name </strong>: ${product.name}
                    <strong>Product Price </strong>: ${product.price}
                    <strong>Product Year </strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>

            </div>
        `;
        //ahora vamos a insertarlo, porque ya lo tenemos diseñado
        productList.appendChild(element)
    }

    resetForm(){ //limpiar el formulario
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
     
        if(element.name === 'delete'){
            //tenemos que llegar al div de inicio, que hemos creado arriba
            element.parentElement.parentElement.parentElement.remove();
            console.log(element.parentElement.parentElement.parentElement);
            //vamos a mostrar un mensaje al eliminar el elemento
            this.showMessage('Product Deleted Successfully ','info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div'); 
        div.className = `alert alert-${cssClass} mt-2`;//con el guion concatenamos
        div.appendChild(document.createTextNode(message));//le ponemos un texto
        //Showing in  DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App'); //seleccionamos el id App
        container.insertBefore(div, app); //insertar antes , el div nuevo, antes del app
        //ahora para que desaparezca el mensaje vamos a colocarlo un temporizador
        //el setimeout recibe 2 parametros, la funcion que queremos ejecutar 
        //y de cuanto tiempo queremos ejecutar esta funcion por lo que 3 segundos = 3000 milisegundos
        setTimeout(function (){
            document.querySelector('.alert').remove();
        }, 3000)
    }
}

// Eventos del DOM, cuando un usuario da click a un boton, input, etc.
//con document vamos a coger nuestra formulario por el id, y a capturar 
//el elemento de submit con addEventListener y cuando captura ese elemento vamos a ejecutar una funcion
document.getElementById('product-form')
    .addEventListener('submit', function(e) {
       // console.log(document.getElementById('name').value)
       const name = document.getElementById('name').value;
       const price = document.getElementById('price').value;
       const year = document.getElementById('year').value; 

       console.log(name, price, year);

       const product = new Product(name, price, year);
       console.log(product);

       //Tenemos que crear un nuevo objeto de la interface para poder llamar a sus metodos
       const ui = new UI(); //creamos la instancia de esta clase, y nos da los metodos

        //comprobamos que los datos que nos llegan, no son vacios
        if(name ==='' || price ==='' || year ===''){
            return ui.showMessage('Complete Fields Please','danger'); // al poner el return termina la ejecucion y no ejecuta lo de abajo
        }

       ui.addProduct(product);
       ui.showMessage('Product Added Successfully', 'success'); 
       ui.resetForm(); // limpiarmos el formulario

       //por defecto la pagina se refresca, entonces vamos a intentar que no se comporte asi, con el evento e
     e.preventDefault(); //cancelamos el comportamiento por defecto del formulario ya no se referesca       
})

document.getElementById('product-list')
    .addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target)
        //console.log(e.target); //minuto 46 o por ahi

        //al eliminar el producto que salga un mensaje que se ha eliminado satisfactoriamente
        //ui.showMessage('Producto Delete Successfully', 'success');
})
