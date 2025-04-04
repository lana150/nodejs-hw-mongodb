import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import  ctrlWrapper  from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactValidationSchema,
  updateContactValidationSchema,
} from '../validation/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';


const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId',  isValidId, ctrlWrapper(getContactByIdController));
router.post('/', validateBody(createContactValidationSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', isValidId, validateBody(updateContactValidationSchema), ctrlWrapper(updateContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'), // додаємо цю middleware
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  upload.single('photo'), // додаємо цю middleware
  validateBody(createContactSchema),
  ctrlWrapper(upserContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  upload.single('photo'), // додаємо цю middleware
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);


export default router;


