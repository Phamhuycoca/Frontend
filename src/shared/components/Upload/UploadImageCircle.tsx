import { useState } from 'react';
import { Upload, message, Modal, Image } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

interface UploadResponse {
  message?: string;

  file?: {
    originalName?: string;
    fileName?: string;
    size?: number;
    url?: string;
  };
}

interface UploadImageCircleProps {
  endpoint?: string;
  maxSizeMB?: number;
  defaultImage?: string;

  onUploaded?: (response: UploadResponse) => void;

  onDeleted?: () => void;
}

export const UploadImageCircle = ({
  endpoint = 'http://localhost:3000/api/upload',
  maxSizeMB = 5,
  defaultImage,
  onUploaded,
  onDeleted,
}: UploadImageCircleProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [hover, setHover] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultImage
      ? [
          {
            uid: '-1',
            name: 'image',
            status: 'done',
            url: defaultImage,
          },
        ]
      : []
  );

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');

    if (!isImage) {
      message.error('Chỉ được tải lên file ảnh');

      return Upload.LIST_IGNORE;
    }

    const isUnderLimit = file.size / 1024 / 1024 < maxSizeMB;

    if (!isUnderLimit) {
      message.error(`Ảnh phải nhỏ hơn ${maxSizeMB}MB`);

      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    const latestFile = info.fileList[info.fileList.length - 1];

    if (!latestFile) {
      setFileList([]);
      setImageUrl(undefined);
      return;
    }

    setFileList([latestFile]);

    // Preview local ngay khi chọn ảnh
    if (latestFile.originFileObj) {
      const previewUrl = URL.createObjectURL(latestFile.originFileObj as RcFile);

      setImageUrl(previewUrl);
    }

    if (latestFile.status === 'done') {
      const response = latestFile.response as UploadResponse;

      const url = response?.file?.url;

      if (url) {
        setImageUrl(url);
      }

      message.success('Upload ảnh thành công');

      onUploaded?.(response);
    }

    if (latestFile.status === 'error') {
      message.error('Upload ảnh thất bại');
    }
  };

  // =========================
  // XÓA ẢNH TRÊN SERVER
  // =========================

  const deleteImage = async () => {
    const file = fileList[0];

    if (!file) return;

    const response = file.response as UploadResponse | undefined;

    const fileName = response?.file?.fileName;

    try {
      // Chỉ gọi API nếu ảnh đã upload
      if (fileName) {
        const res = await fetch(`${endpoint}/${fileName}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error('Không thể xóa ảnh');
        }
      }

      setFileList([]);
      setImageUrl(undefined);

      message.success('Đã xóa ảnh');

      onDeleted?.();
    } catch (error) {
      console.error(error);

      message.error('Xóa ảnh thất bại');
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa ảnh này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',

      onOk: deleteImage,
    });
  };

  return (
    <>
      <Upload
        name="file"
        action={endpoint}
        listType="picture-circle"
        maxCount={1}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={false}
      >
        <div
          onMouseEnter={() => {
            if (imageUrl) {
              setHover(true);
            }
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          style={{
            width: 104,
            height: 104,
            borderRadius: '50%',
            border: imageUrl ? 'none' : '1px dashed #d9d9d9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="upload"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Overlay khi hover */}
              {hover && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    color: '#fff',
                  }}
                >
                  {/* Preview */}
                  <EyeOutlined
                    style={{
                      fontSize: 20,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewOpen(true);
                    }}
                  />

                  {/* Delete */}
                  <DeleteOutlined
                    style={{
                      fontSize: 20,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1,
                }}
              >
                +
              </div>

              <div
                style={{
                  marginTop: 8,
                }}
              >
                Tải ảnh lên
              </div>
            </>
          )}
        </div>
      </Upload>

      {/* Preview */}
      {imageUrl && (
        <Image
          style={{
            display: 'none',
          }}
          src={imageUrl}
          preview={{
            open: previewOpen,
            onOpenChange: (visible) => {
              setPreviewOpen(visible);
            },
          }}
        />
      )}
    </>
  );
};
