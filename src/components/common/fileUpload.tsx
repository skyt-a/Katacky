import { PropsWithChildren } from "react";
import { Button } from "~/components/common/button";
import { useToast } from "~/components/common/use-toast";

type FileUploadButtonProps = PropsWithChildren<{
  setValue: (target: string) => void;
}>;

export const FileUploadButton = ({
  setValue,
  children,
}: FileUploadButtonProps) => {
  const { toast } = useToast();
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = event.target;
      const file = files?.[0];
      if (!file) {
        return;
      }
      //   if (!["JPEG", "GIF"].includes(await getImageFileFormat(file))) {
      //     toast({
      //         description: ""
      //     });
      //     return;
      //   }
      if (file.size > 691200) {
        toast({
          toastType: "error",
          description: "画像サイズが大きすぎます",
        });
        return;
      }
      setValue(URL.createObjectURL(file));
    } catch {
      toast({
        toastType: "error",
        description: "ファイルアップロードに失敗しました",
      });
    }
  };
  return (
    <>
      <Button type="button" className="p-0">
        <label
          htmlFor="imageFile"
          className="w-full h-full grid place-content-center"
        >
          {children}
        </label>
      </Button>
      <input
        type="file"
        accept="image/*"
        id="imageFile"
        className="hidden"
        onChange={onChange}
      />
    </>
  );
};
