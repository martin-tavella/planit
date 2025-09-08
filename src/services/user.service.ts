import api from "./api";

export const updatePictureService = async (picture): Promise<string> => {
    const res = await api.post("/upload/image", picture);
    return res.data.access_token;
}