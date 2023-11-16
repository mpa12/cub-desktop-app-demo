import IProfileData from "@cub-types/IProfileData";

class ProfileModel {
  ADMIN = ''
  PROGRAMMER = 'programmer'
  MANAGER = 'manager'

  constructor(public data: IProfileData) {
  }

  getRoleName() {
    return {
      [this.MANAGER]: 'Руководитель проекта',
      [this.PROGRAMMER]: 'Программист',
      [this.ADMIN]: 'Администратор',
    }[this.data?.role];
  }

  isAdmin() {
    return this.data?.role === this.ADMIN;
  }
}

export default ProfileModel;
