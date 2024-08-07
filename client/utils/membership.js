/* eslint-disable no-continue */
const isBeforeExpDate = timestamp => {
  const currentDate = new Date()
  const expirationDate = new Date(timestamp)
  return currentDate < expirationDate
}

const currentMembership = userObj => {}

const remainingMembershipQuota = userObj => {}

const formattedMembershipObj = data => {
  if (!data || (!data._id && !data.categories)) {
    // Skip if data is empty or does not have _id and categories
    return {};
  }

  const mergedCategories = {};

  // Merge _id categories if _id is present and has categories
  if (data?._id && data._id.categories) {
    for (const category of data._id.categories) {
      const categoryId = category._id;
      if (!mergedCategories[categoryId]) {
        mergedCategories[categoryId] = {};
      }
      Object.assign(mergedCategories[categoryId], category);
      delete mergedCategories[categoryId]._id; // Remove redundant _id field
    }
  }

  // Merge categories if categories is present
  if (data.categories) {
    for (const category of data.categories) {
      if (!category._id) {
        continue; // Skip if category._id is missing
      }
      const categoryId = category._id._id;
      if (!mergedCategories[categoryId]) {
        mergedCategories[categoryId] = {};
      }



      Object.assign(mergedCategories[categoryId], category._id); // Merge attributes
      // delete mergedCategories[categoryId]._id; // Remove redundant _id field
                   // Remove unwanted fields
      delete mergedCategories[categoryId].onlineBookingEnabled;
      delete mergedCategories[categoryId].type;
      delete mergedCategories[categoryId].imageId;
      delete mergedCategories[categoryId].createdBy;
      delete mergedCategories[categoryId].updatedBy;
      delete mergedCategories[categoryId].createdAt;
      delete mergedCategories[categoryId].updatedAt;
      delete mergedCategories[categoryId].isDeleted;
      delete mergedCategories[categoryId].isActive;
      delete mergedCategories[categoryId].__v;


      // Add remainingQuota attribute
      mergedCategories[categoryId].remainingQuota = category.remainingQuota;
    }
  }

  // Add additional fields
  const result = {
    _id: data._id._id, 
    startDate: data.startDate || '',
    renewalDate: data.renewalDate || '',
    cancellationRequestedDate: data.cancellationRequestedDate || '',
    status: data.status || '',
    interval: data.interval || '',
    name: data._id ? data._id.name || '' : '', // Check if _id exists before accessing its properties
    description: data._id ? data._id.description || '' : '', // Check if _id exists before accessing its properties
    price: data._id ? data._id.price || 0 : 0, // Check if _id exists before accessing its properties
    categories: Object.values(mergedCategories),
  };

  return result;
};



const transformMembershipData = (membershipData) => {
  if (!membershipData || (!membershipData._id && !membershipData.categories)) {
    return {}; // Early return if data is invalid
  }

  const mergedCategories = {};

  // Find and merge matching categories
  if (membershipData.categories) {
    for (const category of membershipData.categories) {
      const matchingId = category._id._id; // Extract the nested 'id'

      // console.log(`SUBSCRIPTION `, JSON.stringify(category));
      // console.log(`Matching ID: ${matchingId}`); // Log for debugging

      // Find matching categories in both arrays:
      const existingCategory = membershipData._id.categories.find(
        (c) => c._id === matchingId
      );
      const matchingQuota = membershipData.categories.find(
        (q) => q._id._id ===  matchingId // Match with nested 'id'
      );

      // console.log("Existing Category:", existingCategory); // Log for debugging
      // console.log("Matching Quota:", matchingQuota); // Log for debugging

      mergedCategories[matchingId] = {
        ...category._id, 
        ...(existingCategory || {}),
        remainingQuota: matchingQuota?.remainingQuota // Add remainingQuota if found
      };

      delete mergedCategories[matchingId].id; // Remove redundant 'id'
    }
  }

  // Construct the result object
  return {
    _id: membershipData._id._id,
    startDate: membershipData.startDate || '',
    renewalDate: membershipData.renewalDate || '',
    cancellationRequestedDate: membershipData.cancellationRequestedDate || '',
    status: membershipData.status || '',
    interval: membershipData.interval || '',
    name: membershipData._id.name || '',
    description: membershipData._id.description || '',
    price: membershipData._id.price || 0,
    categories: Object.values(mergedCategories),
  };
};

const flattenObject = (obj, maxDepth = 2) => {
  const result = {};
  if (maxDepth <= 0) {
    return obj; // Return the input if we shouldn't flatten
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const flattenedChild = flattenObject(obj[key], maxDepth - 1); // Reduce depth
        // eslint-disable-next-line guard-for-in
        for (const childKey in flattenedChild) {
          result[`${key}_${childKey}`] = flattenedChild[childKey];
        }
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
};


export { formattedMembershipObj, transformMembershipData, flattenObject,  isBeforeExpDate }
