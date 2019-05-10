export const SAVE_FORM = 'SAVE_FORM'
export const REMOVE_FORM_FIELDS = 'REMOVE_FORM_FIELDS'
export const RESET_FORM = 'RESET_FORM'

export const saveFormAction = ({ name, changedFields }) => {
  return {
    type: SAVE_FORM,
    name,
    changedFields,
  }
}

export const removeFormFieldsAction = ({ name, removeFields }) => {
  return {
    type: REMOVE_FORM_FIELDS,
    name,
    removeFields,
  }
}

export const resetFormAction = ({ name }) => {
  return {
    type: RESET_FORM,
    name,
  }
}
