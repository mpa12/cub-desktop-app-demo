import IProfileData from "@cub-types/IProfileData";
import convertDateFormat from "@utils/convertDateFormat";

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

  isProgrammer() {
    return this.data?.role === this.PROGRAMMER;
  }

  isManager() {
    return this.data?.role === this.MANAGER;
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

  getFields() {
    if (!this.data) return [];

    return [
      {key: 'first_name', value: this.data.first_name, label: 'Имя'},
      {key: 'last_name', value: this.data.last_name, label: 'Фамилия'},
      {key: 'midl_name', value: this.data.midl_name, label: 'Отчество'},
      {key: 'email', value: this.data.email, label: 'E-mail'},
      {key: 'gender', value: this.getSex(), label: 'Пол'},
      {key: 'birth_date', value: convertDateFormat(this.data.birth_date), label: 'День рождения'},
      {key: 'role', value: this.getRoleName(), label: 'Должность'},
    ];
  }
}

export default ProfileModel;
