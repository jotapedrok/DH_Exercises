const { Router } = require('express');
const USERS = [];

const userRouter = Router();

userRouter.post('/', (req, res, next) => {
  try {
    const user = req.body;
    const created = {
      id: USERS.length ? USERS[USERS.length - 1].id + 1 : 1,
      ...user
    }
    USERS.push(created);
    return res.status(201).json(created);
  } catch (e) {
    next(e)
  }
});

userRouter.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const found = USERS.find((user) => user.id === Number(id));
    if (!found) {
      return res.status(404).json({ error: 'User not found' })
    }
    USERS[USERS.indexOf(found)] = user;
    return res.status(200).json(user);
  } catch (e) {
    next(e)
  }
});

userRouter.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...payload } = req.body;
    const found = USERS.find((user) => user.id === Number(id));
    if (!found) {
      return res.status(404).json({ error: 'User not found' })
    }
    const changed = {
      ...found,
      ...payload,
    };
    USERS[USERS.indexOf(found)] = changed
    return res.status(200).json(changed);
  } catch (e) {
    next(e)
  }
});

userRouter.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const found = USERS.find((user) => user.id === Number(id));
    if (!found) {
      return res.status(404).json({ error: 'User not found' })
    }
    USERS.splice(USERS.indexOf(found), 1)
    return res.status(200).json({ message: 'Deleted!' });
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', (_req, res, next) => {
  try {
    return res.status(200).json(USERS);
  } catch (e) {
    next(e)
  }
});

module.exports = userRouter;
