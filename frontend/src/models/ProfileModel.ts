import IProfileData from "@cub-types/IProfileData";

class ProfileModel {
  SUPERUSER = '';
  ADMIN = 'admin';
  PROGRAMMER = 'programmer';
  MANAGER = 'manager';

  constructor(public data: IProfileData) {
  }

  getRoleName() {
    return {
      [this.MANAGER]: 'Руководитель проектов',
      [this.PROGRAMMER]: 'Программист',
      [this.ADMIN]: 'Администратор',
    }[this.data?.role];
  }

  isAdmin() {
    return [this.ADMIN, this.SUPERUSER].includes(this.data?.role);
  }

  getName() {
    return `${this.data?.first_name} ${this.data?.last_name}`;
  }

  getSex() {
    return {
      male: 'Мужской',
      female: 'Женский',
      default: 'Не выбран',
    }[this.data.gender];
  }

  canCreateTask() {
    return [this.ADMIN, this.SUPERUSER, this.MANAGER].includes(this.data?.role);
  }

  getPhotoSrc(): string {
    if (!this.data?.photo) return;

    const url = this.data.photo.substring(1);

    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }
}

export default ProfileModel;
