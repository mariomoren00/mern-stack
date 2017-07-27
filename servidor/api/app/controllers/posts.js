'use strict';

import { Post, Posts } from '../models/post';
import { Tag, Tags } from '../models/tag';
import { Category } from '../models/category';

import _ from 'lodash';

function saveTags(tags) {
  // create tag objects
  var tagObjects = tags.map((tag) => {
		return {
			name: tag,
			slug: tag.replace(/ /g, '-').toLowerCase()
		};
  });
  
  return Tags.forge()
  // fetch tags that already exist
  .query('whereIn', 'slug', _.map(tagObjects, 'slug'))
  .fetch()
  .then((existingTags) => {
		var doNotExist = [];
		existingTags = existingTags.toJSON();
		// filter out existing tags
		if (existingTags.length > 0) {
			var existingSlugs = _.map(existingTags, 'slug');
			doNotExist = tagObjects.filter((t) => {
				return existingSlugs.indexOf(t.slug) < 0;
			});
		}else {
			doNotExist = tagObjects;
		}
		// save tags that do not exist
		return new Tags(doNotExist).mapThen((model) => {
			return model.save()
			.then(() => {
				return model.get('id');
			});
		})
		// return ids of all passed tags
		.then((ids) => {
			return _.union(ids, _.map(existingTags, 'id'));
		});
  });
}

export let getPost = (req, res, next) => {
  Posts.forge()
  .query('where', 'deleted', '=', '0')
  .fetch()
  .then((collection) => {
  	res.json({ error : false, data : collection.toJSON() });
  })
  .catch((err) => {
  	res.status(500).json({error : true, data : {message : err.message}});
  });
};

export let getPostById = (req, res, next) => {
	Post.forge({ id : req.params.id })
	.query('where', 'deleted', '=', '0')
	.fetch({withRelated : ['categories','tags', 'author'] })
	.then((post) => {
		if(!post){
			res.status(404).json({error : true, data : {} })
		}else{
			res.json({error : false, data : post.toJSON()});
		}
	})
	.catch((err) => {
		res.status(500).json({error : true, data : {message : err.message}})
	});
};

export let savePost = (req, res, next) => {
	var tags = req.body.tags;

	// Parse tags variable
	if(tags){
		tags = tags.split(',').map((tag) => {
			return tag.trim();
		});
	}else{
		tags = ['uncategorised'];
	}

	console.log('Tags', tags)

	Post.forge({
		users_id : req.body.user_id,
		categories_id : req.body.category_id,
		title : req.body.title,
		slug : req.body.title.replace(/ /g, '-').toLowerCase(),
		html : req.body.post
	})
	.save()
	.then((post) => {
		saveTags(tags)
		.then((ids) => {
			post.load(['tags'])
			.then((model) => {
				model.tags().attach(ids);
				res.json({
					error : false,
					data : {message : 'Tags saved'}
				})
			})
			.catch((err) => {
				res.status(500)
				.json({
					error : true,
					data : {message : err.message}
				})
			})
		})
		.catch((err) => {
			res.status(500)
			.json({
				error : true,
				data : {message : err.message}
			})
		})
	})
	.catch((err) => {
		res.status(500)
		.json({
			error : true,
			data : {message : err.message}
		})
	})
};

export let getCategoryById = (req, res, next) => {
	Category.forge({ id : req.params.id })
	.fetch({withRelated : ['posts']})
	.then((category) => {
		var posts = category.related('posts');
		res.json({error : false, data : posts.toJSON()});
	})
	.catch((err) => {
		res.status(500).json({error:true, data : {message: err.message}})
	})
};

export let getTagSlug = (req, res, next) => {
    Tag.forge({slug: req.params.slug})
    .fetch({withRelated: ['posts']})
    .then((tag) => {
      var posts = tag.related('posts');
      res.json({error: false, data: posts.toJSON()});
    })
    .catch((err) => {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}