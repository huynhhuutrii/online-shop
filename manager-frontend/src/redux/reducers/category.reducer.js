import * as actionTypes from '../constants';
const initialState = {
  categories: [],
  loading: false,
  error: null,
};
const addNewCategory = (parentID, categories, category) => {
  let currentCategory = [];
  if (parentID === undefined) {
    return [
      ...categories,
      {
        _id: category.id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }
  for (let cat of categories) {
    if (cat._id === parentID) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentID: cat._id,
        children: [],
      };
      currentCategory.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      currentCategory.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? addNewCategory(parentID, cat.children, category)
            : [],
      });
    }
  }
  return currentCategory;
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.filter((cat) => cat !== undefined),
      };

    case actionTypes.GET_ALL_CATEGORY_RQ:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payloads.categories,
        loading: false,
      };
    case actionTypes.GET_ALL_CATEGORY_FAILURE:
      return { ...state, error: action.payloads.error };
    case actionTypes.UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payloads.error,
        loading: false,
      };
    case actionTypes.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payloads.error,
      };
    case actionTypes.ADD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case actionTypes.ADD_CATEGORY_SUCCESS:
      const { category } = action.payloads;
      return {
        ...state,
        loading: false,
        categories: addNewCategory(
          category.parentID,
          state.categories,
          category
        ),
      };

    case actionTypes.ADD_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payloads.error };
    default:
      return state;
  }
};
