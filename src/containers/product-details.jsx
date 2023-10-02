import Image from "next/image";

const ProductDetails = ({ title, category, description, images }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-bold text-gray-400 uppercase">
        {category.replace('-', ' ')}
      </span>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="my-6">{description}</p>
      <div className="flex flex-col p-4 bg-gray-200">
        <h3 className="mb-2 text-sm font-bold uppercase">More Images</h3>
        <div className="flex flex-wrap gap-2">
          {images.slice(0, 4).map((src, index) => {
            return (
              <div
                key={`image-${title}-${index}`}
                className="relative aspect-[4/3] w-[150px]"
              >
                <Image alt={`image-${title}-${index}`} src={src} fill className="object-contain" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
