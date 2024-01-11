import Image from "next/image";
import { CardHeader } from "../ui/card";

interface ProductCardHeaderProps {
  image: string;
  title: string;
}

const ProductCardHeader = ({ image, title }: ProductCardHeaderProps) => {
  return (
    <CardHeader className="p-0">
      <div style={{ width: "100%", height: "240px", position: "relative" }}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="100%, 100%"
          draggable={false}
          className="object-cover"
          priority
        />
      </div>
    </CardHeader>
  );
};

export default ProductCardHeader;
