import BaseService from '../../services/api/BaseService';

export interface ICategory {
  id?: string | number;
  name?: string;
  index?: string | number;
  level?: number;
  children?: ICategory[] | [];
}

class CategoryService extends BaseService<ICategory> {
  constructor() {
    super('/Category');
  }
}

export default new CategoryService();
