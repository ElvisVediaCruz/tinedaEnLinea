import Product from "../models/sequelize/Product.model.js";
import Category from "../models/sequelize/Category.models.js";

class ProductService{
    async createProduct(name, description, price, stock, id_category){
        if(price < 0 && stock < 0) throw new Error("ocurrio un error");
       
        const product = await Product.findOne( { where: { name: name }} );
        if(product) throw new Error("Product already exists");
        const category = await Category.findByPk(id_category);
        console.log(category);
        if(!category) throw new  Error("Catergory not exists")
        const newProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            stock: stock,
            id_category: id_category
        })
        return newProduct;
    }
    async getProductById(id_product){
        const product = await Product.findByPk(id_product);
        if(!product) throw new Error("Product not exists");
        return product;
    }
    async getAllProducts(page = 1, pageSize = 20){
        const offset = (page - 1) * pageSize;
        return await Product.findAll({
            limit: pageSize,
            offset: offset,
            include:{
                model: Category
            }, order: [["name", "ASC"]]
        });
    }
    async updateProduct(id_product, data) {
        const product = await Product.findByPk(id_product);
        if(!product) throw new Error("Product not exists");
        if(data.id_category){
            const category = await Category.findByPk(data.id_category);
            if (!category) throw new Error("Category not exists");
        }
        await Product.update(data, {
            where: { id_product }
        });
        return true;
    }
    async deleteProduct(id_product){
        const product = await Product.findByPk(id_product);
        if(!product) throw new Error("Product not exists");
        await product.destroy();
        return true;
    }
}
export default new ProductService();