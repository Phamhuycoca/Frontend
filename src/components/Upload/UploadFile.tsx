import { useState } from "react";
import { Upload, Button, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile as AntUploadFile, UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";

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

interface UploadFileProps {
    endpoint?: string;
    accept?: string;
    multiple?: boolean;
    maxSizeMB?: number;
    defaultFileList?: AntUploadFile[];
    onUploaded?: (response: UploadResponse) => void;
    onDeleted?: (file: AntUploadFile) => void;
}

export const UploadFile = ({
    endpoint = "http://localhost:3000/api/upload",
    accept,
    multiple = false,
    maxSizeMB = 10,
    defaultFileList = [],
    onUploaded,
    onDeleted,
}: UploadFileProps) => {
    const [fileList, setFileList] = useState<AntUploadFile[]>(defaultFileList);

    const beforeUpload = (file: RcFile) => {
        const isUnderLimit = file.size / 1024 / 1024 < maxSizeMB;
        if (!isUnderLimit) {
            message.error(`File phải nhỏ hơn ${maxSizeMB}MB`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const handlePreview = (file: AntUploadFile) => {
        const response = file.response as UploadResponse | undefined;
        const url = file.url || response?.file?.url;
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
            return;
        }
        if (file.originFileObj) {
            const blobUrl = URL.createObjectURL(file.originFileObj as RcFile);
            window.open(blobUrl, "_blank", "noopener,noreferrer");
        } else {
            message.warning("Chưa có đường dẫn để xem file này");
        }
    };

    const deleteFileOnServer = async (file: AntUploadFile): Promise<boolean> => {
        const response = file.response as UploadResponse | undefined;
        const fileId = response?.file?.fileName;

        if (file.status !== "done" || !response || !fileId) {
            return true;
        }

        try {
            const res = await fetch(`${endpoint}/${fileId}`, {
                method: "DELETE",
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
                title: "Xác nhận xóa",
                content: `Bạn có chắc muốn xóa "${file.name}"?`,
                okText: "Xóa",
                okType: "danger",
                cancelText: "Hủy",
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
        name: "file",
        action: endpoint,
        listType: "text",
        multiple,
        accept,
        fileList,
        beforeUpload,
        onPreview: handlePreview,
        onRemove: handleRemove,
        onChange(info) {
            let newFileList = info.fileList;

            // Nếu chỉ cho phép 1 file: luôn chỉ giữ file mới nhất trong list
            if (!multiple) {
                const latest = newFileList[newFileList.length - 1];
                const oldFile = fileList[0];

                // Nếu đang thay file mới (upload file khác) trong khi file cũ đã upload xong -> xóa file cũ trên server
                if (
                    oldFile &&
                    oldFile.uid !== latest?.uid &&
                    oldFile.status === "done"
                ) {
                    deleteFileOnServer(oldFile);
                }

                newFileList = latest ? [latest] : [];
            }

            setFileList(newFileList);
            const { status } = info.file;

            if (status === "done") {
                message.success(`${info.file.name} upload thành công`);
                onUploaded?.(info.file.response as UploadResponse);
            } else if (status === "error") {
                message.error(`${info.file.name} upload thất bại`);
            }
        },
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Tải tệp đính kèm</Button>
        </Upload>
    );
};