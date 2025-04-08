import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getContactsController = async (req, res) => {
  const pagination = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query);

  const { contacts, totalItems, totalPages } = await getAllContacts({
    userId: req.user.id,
    ...pagination,
    ...sortParams,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      ...pagination,
      totalItems,
      totalPages,
      hasPreviousPage: pagination.page > 1,
      hasNextPage: pagination.page < totalPages,
    },
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById({ _id: contactId, userId: req.user.id });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    isFavourite = false,
    contactType,
  } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber, contactType',
    );
  }

  let photoUrl = null;

  if (req.file) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file);
    } else {
      photoUrl = await saveFileToUploadDir(req.file);
    }
  }

  const newContact = await addContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId: req.user.id,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updates = req.body;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }

    updates.photo = photoUrl;
  }

  const updatedContact = await updateContactById(
    { _id: contactId, userId: req.user.id },
    updates,
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactById({
    _id: contactId,
    userId: req.user.id,
  });

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};