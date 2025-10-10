import { ERROR_MESSAGES } from "./constants";

export const validateForm = (formData) => {
  const newErrors = {};
  if (!formData.firstName.trim()) {
    newErrors.firstName = ERROR_MESSAGES.firstName.required;
  } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
    newErrors.firstName = ERROR_MESSAGES.firstName.invalid;
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = ERROR_MESSAGES.lastName.required;
  } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
    newErrors.lastName = ERROR_MESSAGES.lastName.invalid;
  }

  if (!formData.email.trim()) {
    newErrors.email = ERROR_MESSAGES.email.required;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = ERROR_MESSAGES.email.invalid;
  }

  if (!formData.phoneNo.trim()) {
    newErrors.phoneNo = ERROR_MESSAGES.phoneNo.required;
  } else if (!/^\d{10}$/.test(formData.phoneNo)) {
    newErrors.phoneNo = ERROR_MESSAGES.phoneNo.invalid;
  }

  if (!formData.address.trim()) {
    newErrors.address = ERROR_MESSAGES.address.required;
  }

  return newErrors;
};
