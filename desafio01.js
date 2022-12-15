class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProducts = (title, description, price, thumbnail, code, stock) => {
        if (this.products.find(el => el.code === code)) {
            console.log('Not found');
        } else if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Not found');
        } else {
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
        }
    }

    getProducts = () => {
        if (this.products.length < 0) {
            console.log('Not found');
        } else {
            this.products.forEach(el => console.log(el));
        }
    }

    getProductById = (paramId) => {
        let productId = this.products.find(el => el.id === paramId);
        if (productId === undefined) {
            console.log('Not found');
        } else {
            console.log(productId);
        }
    }
}

const computer = new ProductManager();
computer.addProducts('Asus', '16g Ram, Intel core i7, etc', 150000, './img/computer', 'A3F5S', 10);
computer.addProducts('Tablet apple', '64g, etc', 80000, './img/tablet', 'B5G57', 20);
computer.getProducts();
computer.getProductById(1);