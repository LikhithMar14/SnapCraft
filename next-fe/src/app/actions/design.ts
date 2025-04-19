import { getUserDesigns, saveDesign, deleteDesign, getUserDesignById } from "@/services/design-service";

export async function getDesignAction(){
    try{
        const designs = await getUserDesigns();
        return designs;
    }catch(error){
        console.error("Error fetching designs:",error);
        return {error: "Error fetching designs"};
    }
}
export async function createDesignAction(designData:any){
    try{
        const design = await saveDesign(designData);
        return design;
    }catch(error){
        console.error("Error creating design:",error);
        return {error: "Error creating design"};
    }
}
export async function deleteDesignAction(designId:string){
    try{
        const design = await deleteDesign(designId);
        return design;
    }catch(error){
        console.error("Error deleting design:",error);
        return {error: "Error deleting design"};
    }
}
export async function getDesignByIdAction(designId:string){
    try{
        const design = await getUserDesignById(designId);
        return design;
    }catch(error){
        console.error("Error fetching design by id:",error);
        return {error: "Error fetching design by id"};
    }
}   