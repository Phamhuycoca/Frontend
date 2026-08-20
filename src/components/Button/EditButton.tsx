import { EditOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
export const EditButton = (props: ButtonProps) => {
    return <Button {...props} color="orange" variant="solid" icon={<EditOutlined />}>Chỉnh sửa</Button>
}