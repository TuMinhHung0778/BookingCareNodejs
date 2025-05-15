import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoues = (app) => {
    // rest api
    // đối với rest api khi muốn lấy dứ liệu ==> dùng method get
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    return app.use("/", router);
}

module.exports = initWebRoues;