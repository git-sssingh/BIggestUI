import React, { memo } from "react";
import type { UploadProps } from "antd";
import { Form, message, Upload } from "antd";
import { InboxIcon } from "../utilities/icons";
import { API_URLS } from "../constants";
import { getAuthLocalStorage } from "../storage/local";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  action: API_URLS.POST_FILE,
  method: "POST",
  headers: {
    authorization: `Bearer ${getAuthLocalStorage()}`,
  },
  onDrop(e: any) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

type DragAndDropProps = {
  loadImage: (file: File) => void;
  className?: string;
};

const DragAndDrop: React.FC<DragAndDropProps> = ({ loadImage, className }) => {
  return (
    <Form.Item className={className}>
      <Dragger {...props} onChange={(e: any) => loadImage(e.fileList[0])}>
        <p className="ant-upload-drag-icon">
          <InboxIcon />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </Form.Item>
  );
};

export default memo(DragAndDrop);
