export function validateRequiredFields(fields) {
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field) && !fields[field]) {
        return `${field} field is required`; 
      }
    }
    return null; 
  }