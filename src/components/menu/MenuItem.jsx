import Image from "next/image";
const MenuItem = () => {
  return (
    <div
      className="bg-gray-200 hover:bg-white transition-all
    hover:shadow-2xl hover:shadow-black/50
    p-4 rounded-lg  flex flex-col justify-center items-center text-center"
    >
      <div className="text-center">
        <Image
          src="/pizza.png"
          className="max-h-auto block mx-auto"
          width={120}
          height={120}
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold my-3 text-xl">Pepporoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Mollit enim id consectetur non anim fugiat sit dolor nulla.
      </p>
      <button className="bg-primary mt-4 text-white rounded-full px-8 py-2">
        Add To Cart ₹250
      </button>
    </div>
  );
};

export default MenuItem;
