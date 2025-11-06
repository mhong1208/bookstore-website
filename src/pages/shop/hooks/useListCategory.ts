import { useEffect, useState } from 'react';
import { categoryService } from '../../../api/category.service';

interface Category {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
}

const useListCategory = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await categoryService.getAll();
        setData(response.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { 
    categories: data, 
    loading, 
    error,
    refresh: () => {
      setLoading(true);
      categoryService.getAll()
        .then(response => setData(response.data || []))
        .catch(setError)
        .finally(() => setLoading(false));
    }
  };
}
export default useListCategory;