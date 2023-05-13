const authService = require("../services/auth.service.js");

class AuthController {
  async register(req, res) {
    const { status, data } = await authService.register(req.body);

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    return res.status(status).json(data);
  }

  async login(req, res) {
    const { status, data } = await authService.login(req.body);

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    return res.status(status).json(data);
  }

  async logout(req, res) {
    res.clearCookie("refreshToken");
    return res.status(201).json({ message: "Đăng xuất thành công" });
  }

  async refreshToken(req, res) {
    const { status, data } = await authService.refreshToken(req);
    
    return res.status(status).json(data);
  }
}

const authController = new AuthController();

module.exports = authController;
