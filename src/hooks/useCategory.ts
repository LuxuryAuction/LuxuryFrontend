import { ICategory } from "@/src/services/CategoriesService/types";
import { useEffect, useState } from "react";
import { categoryService } from "../services/CategoriesService";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
  };
};