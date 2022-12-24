const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 0;
    };

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('Enter all data');
            else {
                this.id++;
                const product = {
                    'id': this.id,
                    'title': title,
                    'description': description,
                    'price': price,
                    'thumbnail': thumbnail,
                    'code': code,
                    'stock': stock
                };
                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            };
        }
        catch (error) {
            throw new Error(error);
        };
    };

    getProducts = async () => {
        try {
            let string = await fs.promises.readFile(this.path, 'utf-8');
            const object = JSON.parse(string);
            return object;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    getProductById = async (paramId) => {
        try {
            let string = await fs.promises.readFile(this.path, 'utf-8');
            const object = JSON.parse(string);
            const resultFind = object.find(el => el.id == paramId);
            return resultFind;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    updateProduct = async (paramId, obj) => {
        try {
            const object = await this.getProducts();
            const resultFind = object.find(el => el.id == paramId);
            if (resultFind === undefined) throw new Error(`The product with id: ${paramId} not exists`);
            else {
                resultFind.title = obj.title || resultFind.title;
                resultFind.description = obj.description || resultFind.description;
                resultFind.price = obj.price || resultFind.price;
                resultFind.thumbnail = obj.thumbnail || resultFind.thumbnail;
                resultFind.code = obj.code || resultFind.code;
                resultFind.stock = obj.stock || resultFind.stock;
                await fs.promises.writeFile(this.path, JSON.stringify(object, null, '\t'));
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (paramId) => {
        try {
            const result = await this.getProductById(paramId);
            const object = await this.getProducts();
            if (result === undefined) throw new Error(`The product with id: ${paramId} not exists`);
            else {
                const products = object.filter(el => el.id != paramId);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
// Aca creo la instancia y hago una funcion asincrona llamada main asi puede ejecutarse todo correctamente.
const computer = new ProductManager('./productos.json');
(async main => {
    await computer.addProducts('Asus', '8GB RAM, inter core i5, etc', 130000, './img/computer', 'AW25G', 8);
    await computer.addProducts('Tablet', 'tablet de la marca Samsumg cuenta con 64g...', 70000, './img/tablet', 'DFR56', 20);
    await computer.addProducts('iphone X', 'celular de la marca apple...', 180000, './img/iphone', 'GFR4H', 15);
    console.log(await computer.getProducts());
    console.log(await computer.getProductById(3));
    await computer.updateProduct(1, { title: 'Lenovo', code: 'SA3F' });
    await computer.deleteProduct(2);
})();