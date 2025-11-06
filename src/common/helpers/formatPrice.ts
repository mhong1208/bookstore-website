// viết hàm format giá tiền với định dạng VND
export const formatPrice = (price: number): string => {
  return price?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}