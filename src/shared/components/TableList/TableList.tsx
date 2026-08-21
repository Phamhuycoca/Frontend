import { DownOutlined, UpOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Button,
  type TableProps,
  TreeSelect,
} from 'antd';
import viVN from 'antd/locale/vi_VN';
import { useRef, useState } from 'react';
import type { SorterResult } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import CustomPagination from './CustomPagination';
const { RangePicker } = DatePicker;

export type FilterFieldType = 'input' | 'select' | 'dateRange' | 'date' | 'tree-select';
export type FilterTreeNode = {
  title: string;
  value: string | number;
  key?: string | number;
  children?: FilterTreeNode[];
};
export type FilterField = {
  name: string;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  treeData?: FilterTreeNode[];
  span?: number;
  format?: 'DD/MM/YYYY' | 'DD/MM/YY' | 'DD-MM-YYYY' | 'DD-MM-YY';
};

export type TableChangeParams = {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
};

type PropsTableList<T> = TableProps & {
  key?: string;
  page?: number;
  pageSize?: number;
  total?: number;
  loading?: boolean;
  dataSource?: T[];
  search?: string;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  filterFields?: FilterField[];
  onFilter?: (values: Record<string, unknown>) => void;
  columns?: TableProps<T>['columns'];
  onTableChange?: (params: TableChangeParams) => void;
  customPage?: boolean;
};

export const TableList = <T extends object>(props: PropsTableList<T>) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [showSorterTooltip, setShowSorterTooltip] = useState<string>('nhấp để sắp xếp tăng dần');
  // State để control mũi tên hiển thị trên cột
  const [sortState, setSortState] = useState<{ field?: string; order?: 'ascend' | 'descend' }>({});
  // Ref để dedupe — chặn event "ảo" antd tự phát sinh lại khi prop sortOrder đổi
  const lastEmitted = useRef<{ field?: string; order?: 'ascend' | 'descend' }>({});

  const {
    key,
    page,
    pageSize,
    total,
    loading,
    dataSource,
    search,
    showSearch,
    onSearch,
    filterFields,
    onFilter,
    columns,
    onTableChange,
    customPage,
  } = props;

  const handleFilter = () => {
    const values = form.getFieldsValue();
    onFilter?.(values);
  };

  const handleResetFilter = () => {
    form.resetFields();
    onFilter?.({});
  };

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            placeholder={field.placeholder ?? `Chọn ${field.label.toLowerCase()}`}
            options={field.options}
            allowClear
            style={{ width: '100%' }}
          />
        );
      case 'tree-select':
        return (
          <TreeSelect
            placeholder={field.placeholder ?? `Chọn ${field.label.toLowerCase()}`}
            treeData={field.treeData}
            allowClear
            showSearch
            treeDefaultExpandAll
            style={{ width: '100%' }}
            treeNodeFilterProp="title"
          />
        );
      case 'dateRange':
        return <RangePicker style={{ width: '100%' }} placeholder={['Từ ngày', 'Đến ngày']} />;
      case 'date':
        return <DatePicker format={field.format} />;
      case 'input':
      default:
        return (
          <Input
            placeholder={field.placeholder ?? `Nhập ${field.label.toLowerCase()}`}
            allowClear
          />
        );
    }
  };

  const hasFilter = !!filterFields?.length;

  // Ép sortOrder hiển thị đúng theo state control (chỉ cột đang active mới có order)
  const mappedColumns: ColumnsType<T> | undefined = columns?.map((col): ColumnsType<T>[number] => {
    const colKey = ((col as { dataIndex?: string | string[] }).dataIndex ?? col.key) as string;
    return {
      ...col,
      sortOrder: sortState.field === colKey ? sortState.order : null,
    } as ColumnsType<T>[number];
  });

  return (
    <ConfigProvider locale={viVN}>
      <Card size="small">
        {(showSearch || hasFilter) && (
          <Row className="mb-2" align="middle">
            <Col>
              {showSearch && (
                <Input.Search
                  defaultValue={search}
                  placeholder={'Tìm kiếm thông tin'}
                  allowClear
                  onSearch={onSearch}
                  style={{ maxWidth: 420 }}
                />
              )}
            </Col>
            {hasFilter && (
              <Col className="ms-2">
                <Row justify={'center'} align={'middle'}>
                  <Col>
                    <Button onClick={() => setShowFilter((prev) => !prev)} type="link">
                      Tìm kiếm nâng cao
                      {showFilter ? (
                        <UpOutlined style={{ marginLeft: 6 }} />
                      ) : (
                        <DownOutlined style={{ marginLeft: 6 }} />
                      )}
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        )}

        {showFilter && hasFilter && (
          <Row className="mb-2">
            <Col span={24}>
              <div
                style={{
                  position: 'relative',
                  border: '1px solid #d9d9d9',
                  borderRadius: 8,
                  padding: '20px 16px 16px',
                  marginTop: 12,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 12,
                    background: '#fff',
                    padding: '0 8px',
                    // color: '#1677ff',
                    fontWeight: 500,
                  }}
                >
                  Tham số tìm kiếm
                </span>

                <Form form={form} layout="vertical" onFinish={handleFilter}>
                  <Row gutter={16}>
                    {filterFields.map((field) => (
                      <Col span={field.span ?? 6} key={field.name}>
                        <Form.Item
                          name={field.name}
                          label={field.label}
                          style={{ marginBottom: 12 }}
                        >
                          {renderField(field)}
                        </Form.Item>
                      </Col>
                    ))}
                  </Row>
                  <Row justify="center">
                    <Space>
                      <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        htmlType="submit"
                        style={{
                          borderRadius: '10px',
                        }}
                      >
                        Tìm kiếm
                      </Button>
                      <Button
                        icon={<ReloadOutlined />}
                        onClick={handleResetFilter}
                        style={{
                          borderRadius: '10px',
                        }}
                      >
                        Làm mới
                      </Button>
                    </Space>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        )}

        <Table<T>
          showSorterTooltip={{ title: showSorterTooltip }}
          rowKey={key ?? 'id'}
          columns={mappedColumns}
          dataSource={dataSource}
          loading={loading}
          onChange={(pagination, _filters, sorter) => {
            const s = Array.isArray(sorter) ? sorter[0] : (sorter as SorterResult<T>);
            const rawField = s?.field as string | undefined;
            const rawOrder = s?.order;

            // Chỉ nhận ascend/descend — undefined (cancel) ép về ascend
            const order: 'ascend' | 'descend' =
              rawOrder === 'ascend' || rawOrder === 'descend' ? rawOrder : 'ascend';
            const field = rawField ?? lastEmitted.current.field;
            setShowSorterTooltip(
              order === 'ascend' ? 'Nhấp để sắp xếp giảm dần' : 'Nhấp để sắp xếp tăng dần'
            );
            // Dedupe: bỏ qua nếu trùng với lần emit gần nhất
            // (chặn event "ảo" antd tự phát sinh khi nhận controlled sortOrder mới)
            if (lastEmitted.current.field === field && lastEmitted.current.order === order) {
              // vẫn phải cập nhật page nếu người dùng đổi trang mà không đổi sort
              onTableChange?.({
                page: pagination.current ?? 1,
                pageSize: pagination.pageSize ?? 10,
                sortField: field,
                sortOrder: order,
              });
              return;
            }

            lastEmitted.current = { field, order };
            setSortState({ field, order });

            onTableChange?.({
              page: pagination.current ?? 1,
              pageSize: pagination.pageSize ?? 10,
              sortField: field,
              sortOrder: order,
            });
          }}
          pagination={
            customPage
              ? false
              : {
                  current: page,
                  pageSize: pageSize,
                  total: total,
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} bản ghi`,
                  pageSizeOptions: ['10', '20', '50', '100'],
                }
          }
        />
        {customPage && (
          <CustomPagination
            page={page ?? 1}
            pageSize={pageSize ?? 10}
            total={total ?? 0}
            onChange={(newPage, newPageSize) => {
              onTableChange?.({
                page: newPage,
                pageSize: newPageSize,
                sortField: sortState.field,
                sortOrder: sortState.order,
              });
            }}
          />
        )}
      </Card>
    </ConfigProvider>
  );
};
