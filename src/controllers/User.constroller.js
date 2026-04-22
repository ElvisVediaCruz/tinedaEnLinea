import UserService from "../services/Auth.service.js";

class UserController{
    async register(req, res){
        const { name, last_name, email, password, user_name } = req.body;
        try {
            const user = await UserService.register(name, last_name, email, password, user_name);
            res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async registerAdmin(req, res){
        const { name, last_name, email, password, user_name } = req.body;
        try {
            const user = await UserService.register(name, last_name, email, password, user_name, "admin");
            res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async login(req, res){
        const { user_name, password } = req.body;
        try {
            const userLogin = await UserService.login(user_name, password);
            res.json(userLogin);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();