import { useMutation } from "react-query";
import api from "../components/utils/axiosInstance";
export const useCreateRestaurant = (clientToken, onError) => {
  const {
    mutateAsync,
    data: responseData,
    isLoading,
    isError,
    error,
  } = useMutation(
    async (data) => {
      const formData = new FormData();
      formData.append("name", data.name); //string
      formData.append("city", data.city); //string
      formData.append("category", data.category); //string

      for (const key of Object.keys(data.image)) {
        formData.append("image", data.image[key]);
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${clientToken}`,
        },
      };
      return api.post(`/clients/restaurants/add`, formData, config);
    },
    { onError }
  );
  const formSubmit = async (data) => {
    try {
      const result = await mutateAsync(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { formSubmit, responseData, isLoading, isError, error };
};
