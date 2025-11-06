
import { useEffect, useState } from 'react';
import { productService } from '../../../api/product.service';

const useDetailProduct = (productId?: string | number) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		if (!productId) return;
		setLoading(true);
		setError(null);
		productService.getById(productId)
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false));
	}, [productId]);

	return { data, loading, error };
}

export default useDetailProduct;
