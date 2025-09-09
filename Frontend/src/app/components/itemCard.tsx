import React from "react";

interface propTypes {
  author: string;
  title: string;
  description: string;
  image: string;
}

const ItemCard: React.FC<propTypes> = ({
  image,
  author,
  title,
  description,
}) => {
  return (
    <div className="border border-white/20 rounded-2xl shadow-md bg-white/5 backdrop-blur-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl max-w-sm">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={author || "news image"}
          width={400}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <span className="text-lg font-semibold text-white line-clamp-2">
          {title}
        </span>
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
        {author && (
          <p className="text-xs text-gray-400 italic mt-2">By {author}</p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
