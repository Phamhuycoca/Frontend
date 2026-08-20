import { DeleteOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
export const DeleteButton = (props: ButtonProps) => {
    return <Button {...props} color="danger" variant="solid" icon={<DeleteOutlined />}>Xóa</Button>
}