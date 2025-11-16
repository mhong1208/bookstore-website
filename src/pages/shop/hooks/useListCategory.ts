import { useEffect, useState } from 'react';
import { categoryService } from '../../../api/category.service';
import type { ICategory } from '../../../types/category';

const useListCategory = () => {
  const [data, setData] = useState<ICategory[]>([]);
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