import BaseService from '../../../api/BaseService';

interface User {
  username: string;
  email: string;
  password?: string;
}

class UserService extends BaseService<User> {
  constructor() {
    super('/Auth/login');
  }
}

export default new UserService();
