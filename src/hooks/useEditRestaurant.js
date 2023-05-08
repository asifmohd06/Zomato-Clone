import { useMutation } from "react-query";
import axios from "axios";

export const useEditRestaurant = (id, clientToken, onSuccess, onError) => {
  const {
    mutateAsync,
    data: responseData,
    isLoading,
    isError,
    error,
  } = useMutation(
    (data) => {
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
      return axios.post(
        `https://zomato06.onrender.com/api/clients/editrestaurant/${id}`,
        formData,
        config
      );
    },
    { onSuccess, onError }
  );
  const editFormSubmit = async (data) => {
    try {
      const result = await mutateAsync(data);
      //some error here
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  return { editFormSubmit, responseData, isLoading, isError, error };
};
