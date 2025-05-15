import db from '../models/index'
import CRUDservice from '../services/CRUDservice';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // lấy toàn bộ danh sách user từ database 
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
        // Lấy dữ liệu từ bảng User và render trang homepage.ejs.
    } catch (e) {
        console.log(e);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs') // Xuất ra trang about.ejs
    // Render trang about.ejs mà không cần database.
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        // check user data not found 

        // let userData

        // x <- y
        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        return res.send('User not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('Delete user succeed!');
    }
    else {
        return res.send('User not found!');
    }
}

module.exports = {
    // Xuất module => Cho phép sử dụng hàm ở file khác.
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}