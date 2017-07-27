
'use strict';

import { Bookshelf } from '../../config/database';
import { Category } from './category';
import { Tag } from './tag';
import { User } from './user';

// Declare collection, model and relation to table Posts
var Post = Bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  hidden: ['deleted'],

  categories () {
    return this.belongsTo('Category', 'categories_id');
  },

  tags () {
    return this.belongsToMany(Tag);
  },

  author () {
    return this.belongsTo('User', 'users_id');
  }

});

Post = Bookshelf.model('Post', Post);

var Posts = Bookshelf.Collection.extend({
	model : Post
});

export { Post, Posts };
