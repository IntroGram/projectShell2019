import { Router } from 'express';
import { getRepository } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Categories from '../entities/categories';

const router = Router();
router.route('/categories')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.userCategories);
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