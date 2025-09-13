import React from "react";

interface propTypes {
  author: string;
  title: string;
  description: string;
  image: string;
  publisher : string;
}

const ItemCard: React.FC<propTypes> = ({
  image,
  author,
  title,
  description,
  publisher
}) => {
  return (
    <div className="border border-white/20 rounded-2xl shadow-md bg-white/5 backdrop-blur-md transition-transform hover:scale-105 hover:shadow-xl max-w-sm">
      <div className="relative w-full h-48 overflow-visible">
        <img
          src={image || "/newsDefault.jpg"}
          alt={author || "news image"}
          width={400}
          height={300}
          className="object-cover w-full h-full"
        />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px] border border-red-500 rounded-full px-1">
          {publisher}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-2">
        <span className="text-lg font-semibold text-white line-clamp-2">
          {title}
        </span>
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
        {author && (
          <p className="absolute bottom-2 left-2 text-xs text-gray-400 italic mt-2">By {author}</p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
