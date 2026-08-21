import { Button, Table } from "antd"
import { PageContainer } from "./shared/components/PageContainer"

export const App = () => {
    const columns = [
        { title: 'Tên', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
    ];
    return (
        <PageContainer
            title="Người dùng"
            breadcrumbItems={[{ title: 'Trang chủ' }, { title: 'Người dùng' }]}
            extra={<Button type="primary">Thêm mới</Button>}
        >
            <Table columns={columns} dataSource={[]} rowKey="email" />
        </PageContainer>
    )
}