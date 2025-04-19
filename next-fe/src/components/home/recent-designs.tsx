function RecentDesigns() {
  const designs = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    title: `Design ${index + 1}`,
    image: `/SnapCraft.png`,
    createdAt: new Date(),
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Designs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {designs.map((design) => (
          <div key={design.id} className="group cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-lg">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-sm truncate">{design.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentDesigns;
