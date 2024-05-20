import axios from "axios";
import { ROUTES } from "./API.routes";

//Creo las funciones para solo llamarlas luego
export const CreatePay = async (data) => {
  try {
    const response = await axios.post(ROUTES.CREATEPAY, data);
    return {
      error:false,
      data:response.data
    }
  } catch (error) {
    console.log(error);
    return {
      error:true,
      data: error.response
    }
  }
};

export const ReadPays = async () => {
  try {
    const {data} = await axios.get(ROUTES.READPAYS);

    return {
      error: false ,
      data: data
    };
  } catch (error) {

    return {
      error: true ,
      data: []
    }
  }
};