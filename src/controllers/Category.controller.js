import CategoryService from "../services/Category.service.js";

class CategoryController {
    async createCategory(req, res){
        const { name } = req.body;
        try {
            const newCategory = await CategoryService.createCategory(name);
            res.json(newCategory);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findCategory(req, res){
        const { id_category } = req.params;
        try {
            const category = await CategoryService.findCategory(id_category);
            res.json(category);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findAllCategory(req, res){
        try {
            const categorys = await CategoryService.findAllCategory();
            res.json(categorys);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateCategory(req, res){
        const { id_category } = req.params;
        const { name } = req.body;
        try {
            const categoryUp = await CategoryService.updateCategory(id_category, name);
            res.json(categoryUp);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteCategory(req, res){
        const { id_category } = req.params;
        try {
            const categoryDel = await CategoryService.deleteCategory(id_category);
            res.json(categoryDel);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new CategoryController();