import type { UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { Controller } from "react-hook-form";

type FileType = File;
type TQImagesProps = {
  name: string;
  label?: string;
  others?: Record<string, unknown>;
  maxImageUpload?: number;
};

const OdImages = ({
  name,
  label,
  others,
  maxImageUpload = 1,
}: TQImagesProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const beforeUpload: UploadProps["beforeUpload"] = () => {
    return false;
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="space-y-2 text-sm">
      {label && (
        <label className="block text-zinc-700 dark:text-zinc-300 font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => {
                  setFileList(fileList);
                  const images = fileList.map((item) => item?.originFileObj);
                  field.onChange(images);
                }}
                maxCount={maxImageUpload || 1}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                {...(others || {})}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
            {error && (
              <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
                {error?.message!.length > 40 ? (
                  <small className="  cursor-pointer " title={error.message}>
                    {" "}
                    {error?.message!.slice(0, 40)}...
                  </small>
                ) : (
                  <small>{error.message}</small>
                )}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default OdImages;
