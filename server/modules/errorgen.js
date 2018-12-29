/**
 * Make a key-value error object.
 * Keys are error fields; Values are error messages.
 * @param {ValidationErrorItem[]} errors Error items.
 */
export default function (errors) {
  let errorObject = {}

  errors.forEach(error => {
    let recursive = errorObject
    error.path.forEach((fieldName, index, list) => {
      if (index === list.length - 1) {
        recursive[fieldName] = error.message
      } else if (!errorObject[fieldName]) {
        errorObject[fieldName] = {}
      }
      recursive = recursive[fieldName]
    })
  })

  return errorObject
}
