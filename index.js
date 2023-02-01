const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");


class ProductManager{
    constructor(path){
        // this.productos = []
        this.path = path;
    }
    addProduct = async (product) => {
        const info = await fs.readFile(this.path)
        const data = await JSON.parse(info)
        
        // console.log(data.Productos);
        if(product.hasOwnProperty("title") && product.hasOwnProperty("description") && product.hasOwnProperty("price")
        && product.hasOwnProperty("thumbnail") && product.hasOwnProperty("code") && product.hasOwnProperty("stock")){

            const {title, description, price, thumbnail, code, stock} = product;   

            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.code = code;
            this.stock = stock;

           

            if(data.Productos.length == 0){    
                
                this.id = 1;
                const productoAgregar = {
                    id: this.id,
                    title : this.title,
                    description : this.description,
                    price : this.price,
                    thumbnail : this.thumbnail,
                    code : this.code,
                    stock : this.stock
                } ;
                // Agregar producto al json sacar
                data.Productos.push(productoAgregar);
                await fs.writeFile(this.path, JSON.stringify(data));
                return "Elemento añadido correctamente!"
            }else{        
                     
                data.Productos.forEach(objeto => {
                    
                if (objeto.code == product.code){
                        console.log("Elemento agregado anteriormente log");
                        let retorno = "Elemento agregado anteriormente";
                        return retorno
                }else{      
                        let valorId = data.Productos.length + 1; 
                         
                        const productoAgregar = {
                            id : valorId,
                            title : this.title,
                            description : this.description,
                            price : this.price,
                            thumbnail : this.thumbnail,
                            code : this.code,
                            stock : this.stock
                        };

                        data.Productos.push(productoAgregar);                        
                        fs.writeFile(this.path, data); // Agregar al json                  
                        console.log("Elemento añandido correctaenteLOG");
                        let retorno = "Elemento añadido correctamente";
                        return retorno
                    }
                })            
            }
        }else{
            console.log("campos incorrectos");
            return "Campos incorrectos"
        }
    }      
    getProducts = async () =>{
        try {
            const info = await fs.readFile(this.path);
            const data = await JSON.parse(info);
            return data.Productos
            // console.log(data.Productos);
            
        } catch (error) {
            console.log(error);    
        }
    }
}




    // getProductById = (id) =>{
    //     return this.productos.find(elemento => elemento.id === id) || "Elemento no encontrado!";
    // }


objetoPrueba = {
    title : "Prueba",
    description : "Estamos probando",
    price : 1000,
    thumbnail : "estoEsUnaImagen",
    code : 20,
    stock : 200
}
objetoPrueba2 = {
    title : "Prueba2",
    description : "Estamos probando2",
    price : 10002,
    thumbnail : "estoEsUnaImagen2",
    code : 202,
    stock : 2002
}

const prueba = async () =>{
    const archivo = __dirname;
    let instancia = new ProductManager(archivo + "/db.json")
    // const listaProductos = await instancia.getProducts();
    // console.log(listaProductos);
    console.log(await instancia.addProduct(objetoPrueba));
    console.log(await instancia.addProduct(objetoPrueba2));
    
    

}
prueba()
