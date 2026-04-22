import Category from "../models/sequelize/Category.models.js";
import Product from "../models/sequelize/Product.model.js";

class CategoryService{
    async createCategory(name){
        const categoryExists = await Category.findOne({
            where: { name: name}
        });
        if(categoryExists) throw new Error("Other name");
        const newCategory = await Category.create({
            name: name
        });
        return newCategory;
    }
    async findCategory(id_category){
        const category = await Category.findByPk(id_category)
        if(!category) throw new Error("Not exists category");
        return category;
    }
    async findAllCategory(){
        const categorys = await Category.findAll();
        return categorys;
    }
    async updateCategory(id_category, name){
        const category = await Category.findByPk(id_category);
        if(!category) throw new Error("Not exists category");
        if(category.name === name) return category;
        category.name = name;
        await category.save();
        return category;
    }
    async deleteCategory(id_category){
        const category = await Category.findByPk(id_category);
        if(!category) throw new Error("Not exists category");
        const count = await Product.count({where: {id_category: id_category}});
        if(count > 0 ) throw new Error("Category has products");
        await category.destroy();
        return true;
    }
}

export default new CategoryService();