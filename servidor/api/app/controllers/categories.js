'use strict';

import { Category, Categories } from '../models/category';

export let getCategories = (req, res, next) => {
	Categories.forge()
	.query('where', 'deleted', '=', '0')
	.fetch({columns: ['id', 'name']})
	.then((collection) => {
		res.json({
			error : false,
			data : collection.toJSON()
		})
	})
	.catch((err) => {
		res.status(500)
		.json({
			error : true,
			data : { message : err.message }
		})
	})
};

export let getCategoryById = (req, res, next) => {
	Category.forge({ id : req.params.id})
	.query('where', 'deleted', '=', '0')
	.fetch()
	.then((category) => {
		if(!category){
			res.status(404)
			.json({
				error : true,
				data : {}
			})
		}else{
			res.json({
				error : false,
				data : category.toJSON()
			})
		}
	})
	.catch((err) => {
		res.status(500)
		.json({
			error : false,
			data : { message : err.message }
		})
	})
};

export let saveCategory = (req, res, next) => {
	Category.forge({name : req.body.name})
	.save()
	.then((category) => {
		res.json({
			error : false,
			data : {
				id : category.get('id')
			}
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

export let updateCategory = (req, res, next) => {
	Category.forge({ id : req.params.id })
	.fetch({ require : true })
	.then((category) => {
		category.save({
			name : req.body.name || category.get('name')
		})
		.then(() => {
			res.json({
				error : false,
				data : {message : "Category update"}
			})
		})
		.catch((err)=> {
			res.json({
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

export let deleteCategory = (req, res, next) => {
	Category.forge({ id : req.params.id })
	.fetch({ require : true })
	.then((category) => {
		//category.destroy()
		category.save({
			deleted : 1
		})
		.then(() => {
			res.json({
				error : false,
				data : { message : 'Category deleted'}
			})
		})
		.catch((err) => {
			res.status(500)
			.json({
				error : true,
				data : { message : err.message}
			})
		})
	})
	.catch((err) => {
		res.status(500)
		.json({
			error : true,
			data : { message : err.message }
		})
	})
};
