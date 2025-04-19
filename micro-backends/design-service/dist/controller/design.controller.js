"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDesign = exports.saveDesign = exports.getUserDesignsById = exports.getUserDesigns = void 0;
const design_model_1 = __importDefault(require("../model/design.model"));
const getUserDesigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const designs = yield design_model_1.default.find({ userId }).sort({ updatedAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Designs fetched successfully",
            data: designs,
        });
    }
    catch (error) {
        console.error("Error fetching desings", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch designs",
        });
    }
});
exports.getUserDesigns = getUserDesigns;
const getUserDesignsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const designId = req.params.id;
        const design = yield design_model_1.default.findOne({ _id: designId, userId });
        if (!design) {
            return res.status(404).json({
                success: false,
                message: "Design not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Design fetched successfully",
            data: design,
        });
    }
    catch (error) {
        console.error("Error fetching desings by id", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch designs",
        });
    }
});
exports.getUserDesignsById = getUserDesignsById;
const saveDesign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { designId, name, canvasData, width, height, category } = req.body;
        const design = yield design_model_1.default.findById({ _id: designId, userId });
        if (!design) {
            yield design_model_1.default.create({
                userId,
                name: name || "Untitled Design",
                canvasData: canvasData || "[]",
                width: width || 1000,
                height: height || 1000,
                category: category || "Untitled Category"
            });
            return res.status(201).json({
                success: true,
                message: "Design created successfully",
                data: design
            });
        }
        if (name)
            design.name = name;
        if (canvasData)
            design.canvasData = canvasData;
        if (width)
            design.width = width;
        if (height)
            design.height = height;
        if (category)
            design.category = category;
        yield design.save();
        return res.status(200).json({
            success: true,
            message: "Design updated successfully",
            data: design,
        });
    }
    catch (error) {
        console.error("Error saving design", error);
        return res.status(500).json({
            success: false,
            message: "Failed to save design",
        });
    }
});
exports.saveDesign = saveDesign;
const deleteDesign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const designId = req.params.id;
        const design = yield design_model_1.default.findOne({ _id: designId, userId });
        if (!design) {
            return res.status(404).json({
                success: false,
                message: "Design not found",
            });
        }
        yield design_model_1.default.deleteOne({ _id: designId });
        return res.status(200).json({
            success: true,
            message: "Design deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting design", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete design",
        });
    }
});
exports.deleteDesign = deleteDesign;
