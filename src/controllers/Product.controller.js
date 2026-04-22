import ProductService from "../services/Product.service.js";

class ProductController {
    async createProduct(req, res){
        const { name, description, price, stock, id_category } = req.body;
        try {
            const newProduct = await ProductService.createProduct(name, description, price, stock, id_category);
            res.json(newProduct);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }
    }
    async getProductById(req, res){
        const { id_product } = req.params;
        try {
            const product = await ProductService.getProductById(id_product);
            res.json(product);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getAllProducts(req, res){
        const { page, pageSize } = req.query;
        try {
            const products = await ProductService.getAllProducts(page, pageSize);
            res.json(products);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateProduct(req, res){
        const { id_product } = req.params;
        const { name, description, price, stock, id_category } = req.body
        const data = {
            name, description, price, stock, id_category
        }
        try {
            const productUp = await ProductService.updateProduct(id_product, data);
            res.json(productUp);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteProduct(req, res){
        const { id_product } = req. params;
        try {
            const productDel = await ProductService.deleteProduct(id_product);
            res.json(productDel);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new ProductController();