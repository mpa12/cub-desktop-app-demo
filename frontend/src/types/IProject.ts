import IFolder from "@cub-types/IFolder";
import IFile from "@cub-types/IFile";
import ICustomer from "@cub-types/ICustomer";
import ILeader from "@cub-types/ILeader";

interface IProject {
  id: number,
  title: string,
  leader_info: ILeader,
  customer_info: ICustomer,
  start_date: string,
  stop_date: string,
  folders: IFolder[],
  files: IFile[],
}

export default IProject;
