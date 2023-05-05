import Image from "next/image";

type AvatarImageProps = {
  imageUrl?: string;
};

export const AvatarImage = ({ imageUrl }: AvatarImageProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-28 h-28">
        <Image
          src={imageUrl ?? "/noimage.png"}
          className="rounded-full border"
          alt="Avatar"
          fill={true}
        />
      </div>
    </div>
  );
};
