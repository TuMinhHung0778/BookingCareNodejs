
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';


const salt = bcrypt.genSaltSync(10); // genSaltSync thuật toán sử dụng để hash được password 

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false, // <==> if(data===1)==> true else ==> false 
                roleId: data.roleId,
            })

            resolve('ok! create a new user succeed!')

        } catch (e) {
            reject(e);
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); // dùng await để đảm bảo biến hash băm mật khẩu ra trước 
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            }) // search : sequelize find/query

            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // muốn update dữ liệu người dùng trong db phải biết id của nó - sequelize update 
            let user = await db.User.findOne({ // tìm user trong DB vs điều kiện where: { id: data.id }
                where: { id: data.id }
            })
            // sau khi tìm đc user rồi bắt đầu update thông tin của user đấy theo biến data chúng ta đã truyền vào 
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); // bước cuối cùng sẽ lưu thông tin trong DB 
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                // x <- y : lấy giá trị của userId gán cho trường id
                where: { id: userId }
            })

            if (user) {
                await user.destroy();
            }

            resole(); // return; ==> thoát ra khỏi 1 hàm gì đấy
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}