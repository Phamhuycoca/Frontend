import { SaveOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
export const SaveButton = (props: ButtonProps) => {
    return <Button {...props} color="primary" variant="solid" icon={<SaveOutlined />}>Lưu</Button>
}