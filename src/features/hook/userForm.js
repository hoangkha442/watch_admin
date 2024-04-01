import { useState, useCallback } from 'react';

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const resetFields = useCallback(() => {
    setForm(initialValues);
  }, [initialValues]);

  return [form, handleChange, resetFields];
};

export default useForm;
