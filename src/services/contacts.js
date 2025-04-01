import { contactsCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

/*export const getAllContacts = async () => {
  return await contactsCollection.find();
};*/

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find({ userId }); 
  const contactsCount = await contactsCollection.find({ userId }).countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder }) 
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
};

export const getContactById = async ({ _id, userId }) => {
   return await contactsCollection.findOne({ _id, userId }); 
};

export const addContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
  userId
}) => {
  const newContact = new contactsCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId
  });

  return await newContact.save();
};

export const updateContactById = async ({ _id, userId }, updates) => {
  return await contactsCollection.findByIdAndUpdate({ _id, userId }, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteContactById = async ({ _id, userId }) => {
  return await contactsCollection.findByIdAndDelete({ _id, userId });
};