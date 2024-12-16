import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableField: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filter(){
    const queryObj = this.query;
    const excludedFields = ['searchTerm', 'sort' , 'limit' , 'page' , 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }
  sort(){
    const sort = this?.query?.sort ||  '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
  }
  

}
