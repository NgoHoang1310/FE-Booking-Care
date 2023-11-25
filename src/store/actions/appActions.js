import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.ADMIN_START,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguage = (lang) =>({
    type:actionTypes.CHANGE_LANGUAGE,
    language: lang,
});