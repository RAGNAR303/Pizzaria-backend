import { Router } from "express";
import multer from "multer";
import uploadConfig from './config/multer'
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from './controllers/user/AuthUserController'
import { validateSchema } from "./middlewares/validadeSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { createProductSchema } from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";




const router = Router()
const upload = multer(uploadConfig)

////// Rotas users //////

// Rota criar user
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle)
// Rota login
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle)
// Rota exibir detalhes user
router.get("/me", isAuthenticated, new DetailUserController().handle)


////// Rotas category //////

// Criar categoria

router.post('/category', validateSchema(createCategorySchema), isAuthenticated, isAdmin, new CreateCategoryController().handle)
// Exibir categorias
router.get("/categories", isAuthenticated, new ListCategoriesController().handle)

////// Rotas product //////
// Criar produtos
router.post('/product', isAuthenticated, isAdmin, upload.single('file'), validateSchema(createProductSchema), new CreateProductController().handle)

router.get("/products", isAuthenticated, new ListProductController().handle)

router.delete("/product", isAuthenticated, isAdmin, new DeleteProductController().handle)


export { router }