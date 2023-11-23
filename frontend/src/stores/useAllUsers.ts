import {useEffect, useState} from "react";
import IProfileData from "@cub-types/IProfileData";
import AuthService from "@services/AuthService";

interface AllUsersState {
  isLoading: boolean;
  data: IProfileData[];
}

const useAllUsers = () => {
  const [allUsersState, setAllUsersState] = useState<AllUsersState>({
    isLoading: true,
    data: []
  });

  const getAllUsers = () => {
    AuthService.getAllUsers().then(response => {
      setAllUsersState({
        ...allUsersState,
        data: response.data,
        isLoading: false,
      })
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    allUsersState
  };
};

export default useAllUsers;
