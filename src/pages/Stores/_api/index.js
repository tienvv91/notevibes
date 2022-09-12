import { getAPI } from "../../../services";

export const getStore = (title, page=1, limit=10) => getAPI(`/stores?page=${page}&limit=${limit}&title=${title}`)