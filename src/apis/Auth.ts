import axios from "axios";
import config from "../../config.json";
export type LoginFormData = {
  username?: string,
  password?: string,
};

export const authenticateUser = async (payload: LoginFormData) => {
  const response = await axios.post(config.serverURL + "/authenticate", payload);
  return {...response.data, ...payload};
}