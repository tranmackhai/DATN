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

  async loginAdmin(req, res) {
    const { status, data } = await authService.login(req.body);
    if (data?.user?.role !== "admin")
      return res.status(401).json("Tài khoản này không có quyền truy cập");
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

  async getProfile(req, res) {
    const { data, status } = await authService.getProfile(req.user.id);
    return res.status(status).json(data);
  }

  async changePassword(req, res) {
    const { data, status } = await authService.changePassword(
      req.user.id,
      req.body
    );
    return res.status(status).json(data);
  }

  async changeProfile(req, res) {
    const { data, status } = await authService.changeProfile(
      req.user.id,
      req.body
    );
    // console.log(req.body)
    return res.status(status).json(data);
  }
}

const authController = new AuthController();

module.exports = authController;
