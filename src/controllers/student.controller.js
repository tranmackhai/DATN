import { studentService } from "../services/student.service.js";

export const studentController = {
  create: async (req, res, next) => {
    const { data, status } = await studentService.create();
    return res.status(status).json(data);
  },
};
