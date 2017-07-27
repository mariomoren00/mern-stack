'use strict';

import { Bookshelf } from '../../config/database';
import { Post } from './post';

// Declare collection, model and relation to table Users 
var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  hidden: ['password', 'salt', 'secret', 'hashtype', 'deleted'],

  post () {
    return this.hasMany(Post);
  }

});

User = Bookshelf.model('User', User);

var Users = Bookshelf.Collection.extend({
	model : User
});

export { User, Users };
