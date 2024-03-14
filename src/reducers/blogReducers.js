import { actions } from "../actions";

const initialState = {
  blogs: [],
  currentPage: 1,
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case actions.blog.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.blog.DATA_FETCHED: {
      return {
        ...state,
        blogs: [...state.blogs, ...action.data],
        loading: false,
      };
    }

    case actions.blog.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.blog.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }

    case actions.blog.BLOG_DELETED: {
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((item) => item.id !== action.data),
      };
    }

    case actions.blog.DATA_EDITED: {
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) => {
          if (blog.id === action.data.id) {
            return action.data;
          } else {
            return blog;
          }
        }),
      };
    }

    case actions.blog.CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.data,
      };
    }
    case actions.blog.LIKE: {
      return {
        ...state,
        blogs: state.blogs.map((blog) => {
          if (blog.id === action.data.id) {
            return action.data;
          } else {
            return blog;
          }
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export { blogReducer, initialState };
