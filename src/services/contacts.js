import { contactsCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

/*export const getAllContacts = async () => {
  return await contactsCollection.find();
};*/

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find(); // Базовий запит
  const contactsCount = await contactsCollection.find().merge(contactsQuery).countDocuments(); // Рахуємо всі контакти

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder }) // Додаємо сортування
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
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
