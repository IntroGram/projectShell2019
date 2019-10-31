import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Categories from '../entities/categories';

const router = Router();
router.route('/categories')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.userCategories);
  })
  .post((req, res) => {
    const { name } = req.body;
    const manager = getManager();
    const category = manager.create(Categories, {name});
    category.user = req.user;
    manager.save(category).then((savedCategory) => {
      res.send(savedCategory);
    });
  });
router.route('/categories/:id')
  .all(isAuthenticated)
  .get((req, res) => {
    getRepository(Categories).findOneOrFail(
      req.params.id,
    ).then((_foundCategory) => {
      res.send(_foundCategory);
    }, () => {
      res.send(404);
    });
  });

export default router;