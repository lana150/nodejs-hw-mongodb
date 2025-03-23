import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite = false, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      return next(createError(400, 'Missing required fields: name, phoneNumber, contactType'));
    }

    const newContact = await addContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return next(createError(400, 'No fields to update'));
    }

    const updatedContact = await updateContactById(contactId, updates);

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await deleteContactById(contactId);

    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};





/*import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) return next(createError(404, 'Contact not found'));

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite = false, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      return next(createError(400, 'Missing required fields: name, phoneNumber, contactType'));
    }

    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return next(createError(400, 'No fields to update'));
    }

    const updatedContact = await updateContactById(contactId, updates);
    if (!updatedContact) return next(createError(404, 'Contact not found'));

    res.status(200).json({
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await deleteContactById(contactId);
    if (!deletedContact) return next(createError(404, 'Contact not found'));

    res.sendStatus(204);
  } catch (error) {
    next(createError(500, error.message));
  }
};*/