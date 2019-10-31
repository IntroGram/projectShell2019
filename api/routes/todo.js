import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import ToDo from '../entities/todo';
import Categories from '../entities/categories';

const router = Router();
router.route('/todos')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.todos)
  })
  .post((req, res) => {
    const { done, title, category:categoryid} = req.body;
    const manager = getManager();
    const todo = manager.create(ToDo, { done, title});
    todo.user = req.user;
    getRepository(Categories).findOne(
      categoryid
    ).then((_foundCategory) => {
      todo.category = _foundCategory;
      manager.save(todo).then((savedTodo) => {
        res.send(savedTodo);
      });
    })
  });
router.route('/todos/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(ToDo).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundTodo) => {
      req.todo = _foundTodo;
      next();
    }, () => {
      res.send(404);
    });
  })
  .put((req, res) => {
    const foundTodo = req.todo;
    const { title, done } = req.body;
    foundTodo.title = title;
    foundTodo.done = done;
    getManager().save(foundTodo).then((updatedTodo) => {
      res.send(updatedTodo);
    });
  })
  .get((req, res) => {
    res.send(req.todo);
  })
  .delete((req, res) => {
    getManager().delete(ToDo, req.todo.id).then(() => {
      res.send(200);
    });
  });

export default router;
