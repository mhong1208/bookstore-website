import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Space,
  Popconfirm,
  notification,
  InputNumber,
  Select,
  DatePicker,
  Switch,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { productService } from '../../../api/product.service';
import { categoryService } from '../../../api/category.service';
import type { IProduct } from '../../../types/product';
import type { ICategory } from '../../../types/category';

const { Title } = Typography;
const { Option } = Select;

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [form] = Form.useForm();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch {
      notification.error({ message: 'Lỗi', description: 'Không thể tải danh sách sản phẩm.' });
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch {
      notification.error({ message: 'Lỗi', description: 'Không thể tải danh mục.' });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (product: IProduct) => {
    setEditingProduct(product);
    form.setFieldsValue({
      ...product,
      publishedDate: product.publishedDate ? moment(product.publishedDate) : null,
      categories: product.categories.map(c => typeof c === 'string' ? c : c._id),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  // Submit form
  const onFinish = async (values: any) => {
    setLoading(true);
    const payload = {
      ...values,
      publishedDate: values.publishedDate ? values.publishedDate.toISOString() : null,
    };
    try {
      if (editingProduct) {
        await productService.update(editingProduct._id, payload);
        notification.success({ message: 'Cập nhật thành công' });
      } else {
        await productService.create(payload);
        notification.success({ message: 'Tạo sản phẩm thành công' });
      }
      fetchProducts();
      handleCancel();
    } catch (err: any) {
      notification.error({ message: 'Lỗi', description: err?.response?.data?.message || 'Có lỗi xảy ra' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (product: IProduct) => {
    setLoading(true);
    try {
      await productService.update(product._id, { ...product, isActive: !product.isActive });
      fetchProducts();
      notification.success({ message: 'Cập nhật trạng thái thành công' });
    } catch {
      notification.error({ message: 'Lỗi', description: 'Không thể cập nhật trạng thái.' });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Ảnh Bìa',
      dataIndex: 'coverImage',
      render: (coverImage: string) => <img src={coverImage} alt="cover" style={{ width: 50 }} />,
    },
    { title: 'Tên Sản Phẩm', dataIndex: 'title' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Tồn kho', dataIndex: 'stock' },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      render: (isActive: boolean) => <span style={{ color: isActive ? 'green' : 'red' }}>{isActive ? 'Hoạt động' : 'Không hoạt động'}</span>
    },
    {
      title: 'Hành động',
      render: (_: any, record: IProduct) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>Sửa</Button>
          <Popconfirm
            title={`Bạn có chắc muốn ${record.isActive ? 'hủy kích hoạt' : 'kích hoạt'} sản phẩm?`}
            onConfirm={() => handleToggleActive(record)}
          >
            <Button danger={record.isActive}>{record.isActive ? 'Hủy kích hoạt' : 'Kích hoạt'}</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Quản lý sản phẩm</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>Thêm sản phẩm</Button>
      </div>
      <Table columns={columns} dataSource={products} rowKey="_id" loading={loading} />

      <Modal
        title={editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Tên sản phẩm" rules={[{ required: true, message: 'Nhập tên sản phẩm' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Nhập giá' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="stock" label="Tồn kho">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="author" label="Tác giả">
            <Input />
          </Form.Item>
          <Form.Item name="publisher" label="Nhà xuất bản">
            <Input />
          </Form.Item>
          <Form.Item name="publishedDate" label="Ngày xuất bản">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="coverImage" label="URL Ảnh bìa" rules={[{ required: true, message: 'Nhập URL ảnh bìa' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categories" label="Danh mục">
            <Select mode="multiple" placeholder="Chọn danh mục">
              {categories.map(cat => <Option key={cat._id} value={cat._id}>{cat.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingProduct ? 'Lưu' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagementPage;
