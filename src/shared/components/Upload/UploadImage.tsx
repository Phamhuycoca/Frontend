import { useState } from 'react';
import { Upload, Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile as AntUploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

interface UploadResponse {
  message?: string;
  file?: {
    originalName?: string;
    fileName?: string;
    size?: number;
    url?: string;
  };
  [key: string]: unknown;
}

interface UploadImageProps {
  endpoint?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  defaultFileList?: AntUploadFile[];
  onUploaded?: (response: UploadResponse) => void;
  onDeleted?: (file: AntUploadFile) => void;
}

export const UploadImage = ({
  endpoint = 'http://localhost:3000/api/upload',
  accept = 'image/*',
  multiple = false,
  maxSizeMB = 5,
  defaultFileList = [],
  onUploaded,
  onDeleted,
}: UploadImageProps) => {
  const [fileList, setFileList] = useState<AntUploadFile[]>(defaultFileList);

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ được tải lên file ảnh (jpg, png, gif, webp...)');
      return Upload.LIST_IGNORE;
    }

    const isUnderLimit = file.size / 1024 / 1024 < maxSizeMB;
    if (!isUnderLimit) {
      message.error(`Ảnh phải nhỏ hơn ${maxSizeMB}MB`);
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handlePreview = (file: AntUploadFile) => {
    const response = file.response as UploadResponse | undefined;
    const url = file.url || response?.file?.url;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (file.originFileObj) {
      const blobUrl = URL.createObjectURL(file.originFileObj as RcFile);
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
    } else {
      message.warning('Chưa có đường dẫn để xem ảnh này');
    }
  };

  const deleteFileOnServer = async (file: AntUploadFile): Promise<boolean> => {
    const response = file.response as UploadResponse | undefined;
    const fileId = response?.file?.fileName;

    if (file.status !== 'done' || !response || !fileId) {
      return true;
    }

    try {
      const res = await fetch(`${endpoint}/${fileId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return true;
    } catch (err) {
      console.error(err);
      message.error(`Xóa "${file.name}" thất bại`);
      return false;
    }
  };

  const handleRemove = (file: AntUploadFile): Promise<boolean> => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Xác nhận xóa',
        content: `Bạn có chắc muốn xóa "${file.name}"?`,
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk: async () => {
          const success = await deleteFileOnServer(file);
          if (success) {
            message.success(`Đã xóa "${file.name}"`);
            onDeleted?.(file);
          }
          resolve(success);
        },
        onCancel: () => resolve(false),
      });
    });
  };

  const props: UploadProps = {
    name: 'file',
    action: endpoint,
    listType: 'picture',
    multiple,
    accept,
    fileList,
    beforeUpload,
    onPreview: handlePreview,
    onRemove: handleRemove,
    onChange(info) {
      let newFileList = info.fileList;

      // Nếu chỉ cho phép 1 ảnh: luôn chỉ giữ ảnh mới nhất
      if (!multiple) {
        const latest = newFileList[newFileList.length - 1];
        const oldFile = fileList[0];

        if (oldFile && oldFile.uid !== latest?.uid && oldFile.status === 'done') {
          deleteFileOnServer(oldFile);
        }

        newFileList = latest ? [latest] : [];
      }

      const { status } = info.file;
      if (status === 'error') {
        newFileList = newFileList.filter((f) => f.uid !== info.file.uid);
      }
      setFileList(newFileList);
      if (status === 'done') {
        message.success(`${info.file.name} upload thành công`);
        onUploaded?.(info.file.response as UploadResponse);
      } else if (status === 'error') {
        message.error(`${info.file.name} upload thất bại`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Tải ảnh</Button>
    </Upload>
  );
};
