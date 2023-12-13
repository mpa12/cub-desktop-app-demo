interface IProfileData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  midl_name: string;
  email: string;
  passport_data: {};
  gender: string;
  birth_date?: string;
  photo?: string;
  role: string;
}

export default IProfileData;
