import { PlusOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
export const CreateButton = (props: ButtonProps) => {
    return <Button {...props} color="geekblue" variant="solid" icon={<PlusOutlined />}>Thêm mới</Button>
}