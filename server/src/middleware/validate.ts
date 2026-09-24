import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: err.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
        });
      }
      next(err);
    }
  };
}