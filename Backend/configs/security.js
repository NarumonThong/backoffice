const crypto = require('crypto');

const security = {
    password_hash(password) {
        return crypto.createHash('sha1').update(password).digest('hex');
    },
    password_verify(password, password_hash) {
        return security.password_hash(password) === password_hash;
    },
    // ตรวจสอบการเข้าสู่ระบบ 
    authenticated(req, res, next) {
        
        req.session.userLogin = {
            "u_id": 1,
            "u_username": "admin1234",
            "u_firstname": "นฤมล",
            "u_lastname": "ทองบ่อ",
            "u_role": "admin"

            // "u_id": 5,
            // "u_username": "anntest",
            // "u_firstname": "Narumon",
            // "u_lastname": "Thongbor",
            // "u_role": "user"
        };

        try {
            if (req.session.userLogin) {
                return next();
            }
            throw new Error('Unauthorized.');
        }
        catch (ex) {
            res.error(ex, 401);
        }
    },
    // ตรวจสอบสิทธิ์การเข้าถึงหน้า
    isInRoles(roles = []) {
        return function (req, res, next) {
            try {
                if (roles.indexOf(req.session.userLogin.u_role) >= 0)
                    return next();
                throw new Error('Forbidden');
            }
            catch (ex) { res.status(403).json({ message: ex.message }); }
        }
    }
};

module.exports = security;