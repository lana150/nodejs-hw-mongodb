import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
 
  if (!isValidObjectId(contactId)) {
    throw createError(400, 'Bad Request');
  }

  next();
};



/*import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createError(400, `"${contactId}" is not a valid ID`));
  }

  next();
};*/


