import Image from "next/image";

type GroupAvatarImageProps = {
  imageUrl?: string;
  name: string;
};

export const GroupAvatarImage = ({ imageUrl, name }: GroupAvatarImageProps) => {
  return (
    <figure className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <Image
          src={imageUrl ?? "/noimage.png"}
          className="rounded-full border"
          alt="Avatar"
          fill={true}
        />
      </div>
      <figcaption className="text-xs break-all">{name}</figcaption>
    </figure>
  );
};
