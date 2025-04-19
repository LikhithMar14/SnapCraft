import { Document, Schema, model, models } from "mongoose";


 interface IDesignSchema {
    userId:string,
    name:string,
    canvasData:string,
    width:number,
    height:number,
    category:string,
    createdAt:Date,
    updatedAt:Date
}

interface IDesignDocument extends IDesignSchema, Document {}

const DesignSchema = new Schema<IDesignDocument>({
    userId:{
        type:String,
        required:true,
        index:true
    },
    name:{
        type:String,
        required:true,
        index:true
    },
    width:{
        type:Number,
        required:true
    },
    canvasData:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Design = models.Design || model<IDesignDocument>("Design", DesignSchema);

export default Design;