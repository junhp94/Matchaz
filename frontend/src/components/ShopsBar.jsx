export default function ShopsBar() {
    const shops = [
      { name: "Maiko", img: "/dummy1.jpg" },
      { name: "Starbucks", img: "/dummy2.jpg" },
      { name: "Gong Cha", img: "/dummy3.jpg" },
      { name: "ShareTea", img: "/dummy4.jpg" },
      { name: "ChaTime", img: "/dummy5.jpg" },
    ];
  
    return (
      <div className="overflow-x-auto flex gap-4 px-4 py-3 scrollbar-hide">
        {shops.map((shop, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={shop.img}
              alt={shop.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
            />
            <p className="text-sm mt-1 text-gray-700">{shop.name}</p>
          </div>
        ))}
      </div>
    );
  }
  