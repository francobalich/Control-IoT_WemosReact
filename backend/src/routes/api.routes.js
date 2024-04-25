import { check } from 'express-validator'
import { getLogin, postRegisterUser, putModifiedUser, deleteUser, revalidarToken, putImagesUser, postReadImages } from '../controllers/api.controllers.js'
import { Router } from 'express'
import { validarCampos } from '../middleware/validarCampos.js'
import { validarJWT } from '../middleware/validarJwt.js'

export const apiRouter = Router()

apiRouter.get('/renew', validarJWT, revalidarToken)

apiRouter.post('/login',
  [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], getLogin)

apiRouter.post('/register',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], postRegisterUser)

apiRouter.put('/user/:id',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('surname', 'El apellido es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe tener como minimo 6 caracteres.').isLength({ "min": 6 }),
    validarCampos
  ], putModifiedUser)

apiRouter.put('/images',
  [
    check('images', 'Las imagenes son obligatorias.').not().isEmpty(),
    validarCampos
  ], putImagesUser)

apiRouter.post('/images', postReadImages)

apiRouter.delete('/:id', deleteUser)
