import {instance} from "../api.config";
import getCookie from "@utils/getCookie";

class FileService {
  uploadImage(formData: FormData, onUploadProgress) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.post('/api/pc/upload/img', formData, {
      onUploadProgress
    });
  }
}

export default new FileService;
