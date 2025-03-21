import { contactsCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  return await contactsCollection.find();
};

export const getContactById = async (contactId) => {
  return await contactsCollection.findById(contactId);
};

export const addContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  const newContact = new contactsCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  return await newContact.save();
};

export const updateContactById = async (contactId, updates) => {
  return await contactsCollection.findByIdAndUpdate(contactId, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteContactById = async (contactId) => {
  return await contactsCollection.findByIdAndDelete(contactId);
};