'use strict';

import { Bookshelf } from '../../config/database';
import { Post } from './post';

// Declare collection, model and relation to table Categories
var Category = Bookshelf.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,
  hidden: ['deleted'],

  posts () {
	  return this.hasMany('Post', 'id');
  }

});

Category = Bookshelf.model('Category', Category);

var Categories = Bookshelf.Collection.extend({
	model : Category
});

export { Category, Categories };
