import BlobInfo from "@cub-types/tinymce/BlobInfo";
import ProgressFn from "@cub-types/tinymce/ProgressFn";

type UploadHandler = (blobInfo: BlobInfo, progress: ProgressFn) => Promise<string>;

export default UploadHandler;
