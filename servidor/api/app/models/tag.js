
'use strict';

import { Bookshelf } from '../../config/database';
import { Post } from './post';

// Declare collection, model and relation to table Tags 
var Tag = Bookshelf.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  hidden: ['deleted'],

  posts (){
   return this.belongsToMany(Post);
  }

});

Tag = Bookshelf.model('Tag', Tag);

var Tags = Bookshelf.Collection.extend({
	model : Tag
});

export { Tag, Tags };
