import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // if(email == '' || email === null || email === 'undefined') ==> code kiểu thổ dân 
    if (!email || !password) { // check xem value email có null undefine không?
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);
    // các bước phía back-end phải làm :
    // check email exist
    // compare(so sánh) password : bắt lỗi pasword người dùng có tồn tại không
    // return userInfor
    // access_token:JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : { 'sai userData': 'sai roi' }
    })
}

module.exports = {
    handleLogin: handleLogin
}