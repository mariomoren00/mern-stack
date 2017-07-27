'use strict';

import { User, Users } from '../models/user';

export let getUsers = (req, res, next) => {
  Users.forge()
  .query('where', 'deleted', '=', '0')
  .fetch()
  .then((collection) => {
    res.json({
      error : false,
      data : collection.toJSON()
    });
  })
  .catch((err) => {
      res.status(500)
    .json({
      error: true,
      data: {message: err.message}
    });
  });
};

export let getUserById = (req, res, next) => {
  User.forge({
    id : req.params.id
  })
  .query('where', 'deleted', '=', '0')
  .fetch()
  .then((user) => {
    if(!user){
      res.status(404)
      .json({
        error : true,
        data : {}
      })
    }else{
      res.json({
        error : false,
        data : user.toJSON()
      })
    }
  })
  .catch((err) => {
    res.status(500)
    .json({
      error : false,
      data : {message : err.message}
    })
  })
};

export let saveUser = (req, res, next) => {
  User.forge({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  })
  .save()
  .then((user) => {
    res.json({
      error: false,
      data: {
        id : user.get('id'),
        name : user.get('name'),
        email : user.get('email')
      },
      message : 'User deatils create'
    });
  })
  .catch((err) => {
    res.status(500)
    .json({
      error: true,
      data: {message: err.message}
    });
  });
};

export let updateUser = (req, res, next) => {
  User.forge({ id : req.params.id })
  .fetch({ require : true })
  .then((user) => {
    user.save({
      name : req.body.name || user.get('name'),
      email : req.body.name || user.get('name')
    })
    .then(() => {
      res.json({
        error : false,
        data : {
          id : user.get('id'),
          name : user.get('name'),
          email : user.get('email')
        },
        message : 'User deatils update'
      });
    })
    .catch((err) => {
      res.json({
        error : true,
        data : { message : err.message }
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

export let deleteUser = (req, res, next) => {
  User.forge({id : req.params.id})
  .fetch({require : true})
  .then((user) => {
    //user.destroy()
    user.save({
			deleted : 1
		})
    .then(() => {
      res.json({
        error : false,
        data : {
          id : user.get('id'),
          name : user.get('name'),
          email : user.get('email')
        },
        message : 'User successfully deleted'
      })
    })
    .catch((err) => {
      res.status(500)
      .json({error : true, data : {message : err.message}})
    })
  })
  .catch((err) => {
    res.status(500)
    .json({error : true, data : {message : err.message}})
  })
};
