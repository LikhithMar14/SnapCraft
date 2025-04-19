"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const design_controller_1 = require("../controller/design.controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.authMiddleware);
router.get("/", design_controller_1.getUserDesigns);
router.get("/:id", design_controller_1.getUserDesignsById);
router.post("/", design_controller_1.saveDesign);
router.delete("/:id", design_controller_1.deleteDesign);
exports.default = router;
