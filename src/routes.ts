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
import { createProductSchema, DeleteProductSchema, ListProductByCategoriaSchema } from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductCategoryController";
import { CreateOrderController } from "./controllers/orders/CreateOrderController";
import { addOrdersSchema, createOrderSchema, detailsOrdersSchema, finishOrdersSchema, removeOrdersSchema, sendDraftOrdersSchema } from "./schemas/orderSchema";
import { ListOrdersController } from "./controllers/orders/ListOrdersController";
import { AddItemOrdersController } from "./controllers/orders/AddItemOrdersController";
import { RemoveItemOrdersController } from "./controllers/orders/RemoveItemOrdersController";
import { ListOrdersDetailsController } from "./controllers/orders/ListOrdersDetailsController";
import { SendOrderController } from "./controllers/orders/SendOrderController";
import { FinishOrderController } from "./controllers/orders/FinishOrderController";
import { DeleteOrderController } from "./controllers/orders/DeleteOrderController";





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
// listar produtos 
router.get("/products", isAuthenticated, new ListProductController().handle)
// deletar/desabilitar produto
router.delete("/product", isAuthenticated, isAdmin, validateSchema(DeleteProductSchema), new DeleteProductController().handle)
// listar produto por categoria
router.get("/category/product", isAuthenticated, validateSchema(ListProductByCategoriaSchema), new ListProductByCategoryController().handle)


////// Rotas orders //////
// criar pedido
router.post("/order", isAuthenticated, validateSchema(createOrderSchema), new CreateOrderController().handle)
// listar pedidos
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
// listar detalhes de um pedido
router.get('/order/details', isAuthenticated, validateSchema(detailsOrdersSchema), new ListOrdersDetailsController().handle)

// adiconar item 
router.post("/order/add", isAuthenticated, validateSchema(addOrdersSchema), new AddItemOrdersController().handle)
// remover item 
router.delete("/order/remove", isAuthenticated, validateSchema(removeOrdersSchema), new RemoveItemOrdersController().handle)
// enviar para produção
router.put("/order/send", isAuthenticated, validateSchema(sendDraftOrdersSchema), new SendOrderController().handle)
// Mudar estatus para pronto
router.put("/order/finish", isAuthenticated, validateSchema(finishOrdersSchema), new FinishOrderController().handle)
// deletar pedido
router.delete("/order/delete", isAuthenticated, validateSchema(detailsOrdersSchema), new DeleteOrderController().handle)

export { router }