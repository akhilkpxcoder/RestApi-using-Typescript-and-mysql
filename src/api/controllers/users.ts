import { Request, Response, NextFunction } from 'express';
import { UserAddModel, User,UserModel } from '../models/user'
const logger = require("../middlewares/logger");

// getting all posts
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try
  {
  User.findAll().then((users) => {
    // Send all users as response
    res.status(200).json({
      status: true,
      data: users,
    });
  });
} catch (err) {
  logger.info(err);
  res.status(500).json({
    Message: "Please try again later",
  });
}
};

// getting a single post
const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try
    {
    User.findByPk(req.params.id).then((user) => {
      res.status(200).json({
        status: true,
        data: user,
      });
    });
  } catch (err) {
    logger.info(err);
    res.status(500).json({
      Message: "Please try again later",
    });
  }
};

// updating a post
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = req.body as UserAddModel
    try
    {
    User.update(user,{ where: { id: req.params.id } } ).then(() => {
      res.status(200).json({
          status: true,
          message: "User updated successfully with id = " + id
      });
    });
  } catch (err) {
    logger.info(err);
    res.status(500).json({
        Message: "Please try again later",
    });
  }
};

// deleting a post
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try
    {
    User.destroy({
      where: { id: id },
    }).then(() => {
      res.status(200).json({
          status: true,
          message: "User deleted successfully with id = " + id
      });
    });
  } catch (err) {
    logger.info(err);
    res.status(500).json({
        Message: "Please try again later",
    });
  }
};

// adding a post
const addUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as UserAddModel
  try
  {
  User.create(user).then((user) => {
    res.status(200).json({
      status: true,
      message: "User created successfully",
    });
  });
} catch (err) {
  logger.info(err);
  res.status(500).json({
    Message:"Please try again later",
  });
}
};

export default { getUsers, getUser, updateUser, deleteUser, addUser };