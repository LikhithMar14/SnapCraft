import { getDesignAction } from "@/app/actions/design";

async function RecentDesigns() {
  
  const response = await getDesignAction(); 
  console.log(response);
  

  if (response.error || !response.data) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
        <p className="text-gray-500">No designs found or error loading designs.</p>
      </div>
    );
  }
  
  const designs = response.data;
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {designs.map((design:any) => (
          <div key={design._id} className="group cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-lg">
              <img
                src={design.image || "/SnapCraft.png"}
                alt={design.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-sm truncate">{design.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentDesigns;
