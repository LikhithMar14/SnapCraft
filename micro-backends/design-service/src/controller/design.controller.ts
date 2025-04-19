import Design from "../model/design.model";
import express, { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const getUserDesigns = async (
  req: AuthenticatedRequest,
  res: Response
):Promise<any> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const designs = await Design.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Designs fetched successfully",
      data: designs,
    });
  } catch (error) {
    console.error("Error fetching desings", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};
export const getUserDesignsById = async (
  req: AuthenticatedRequest,
  res: Response
):Promise<any> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const designId = req.params.id;
    const design = await Design.findOne({ _id: designId, userId });
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
  } catch (error) {
    console.error("Error fetching desings by id", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};
export const saveDesign = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { designId, name, canvasData, width, height, category } = req.body;
    const design = await Design.findById({ _id: designId, userId });
    if (!design) {
       await Design.create({
         userId,
         name: name || "Untitled Design",
         canvasData: canvasData || "[]",
         width: width || 1000,
         height: height || 1000,
         category: category || "Untitled Category"
       });

       return res.status(201).json({
        success:true,
        message:"Design created successfully",
        data:design
       })
    }
    if (name) design.name = name;
    if (canvasData) design.canvasData = canvasData;
    if (width) design.width = width;
    if (height) design.height = height;
    if (category) design.category = category;
    await design.save();

    return res.status(200).json({
      success: true,
      message: "Design updated successfully",
      data: design,
    });
  } catch (error) {
    console.error("Error saving design", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save design",
    });
  }
};
export const deleteDesign = async (
  req: AuthenticatedRequest,
  res: Response
):Promise<any>  => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const designId = req.params.id;
    const design = await Design.findOne({ _id: designId, userId });
    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found",
      });
    }
    await Design.deleteOne({ _id: designId });
    return res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting design", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};
