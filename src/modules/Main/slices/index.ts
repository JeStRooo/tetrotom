import { createSlice } from '@reduxjs/toolkit';
import { LoadingStage } from '@/core/enum';
import { createComment, createPost, getNews, getPosts, setLike } from '@/modules/Main/service';
import { INews, IPost } from '@/modules/Main/models';
import { ApiStatusState } from '@/core/models';
import { initialApiState } from '@/core/constants';

interface InitialState {
  posts: ApiStatusState<IPost[]>;
  news: ApiStatusState<INews[]>
  comments: {
    apiStatus: LoadingStage | null
  };
}

const initialState: InitialState = {
  posts: {
    ...initialApiState,
    apiData: []
  },
  news: {
    ...initialApiState,
    apiData: []
  },
  comments: {
    apiStatus: null
  }
};

const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => ({
        ...state,
        posts: {
          ...state.posts,
          apiStatus: LoadingStage.LOADING,
        },
      }))
      .addCase(getPosts.fulfilled, (state, { payload }) => ({
        ...state,
        posts: {
          ...state.posts,
          apiData: payload,
          apiStatus: LoadingStage.LOAD,
        },
      }))
      .addCase(getPosts.rejected, (state, { payload }) => ({
        ...state,
        posts: {
          ...state.posts,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(setLike.pending, () => {
      })
      .addCase(setLike.fulfilled, (state, { payload }) => {
        const updatedPosts = state.posts.apiData?.map(post =>
          post.id === payload.id ? payload : post,
        ) || [];

        return {
          ...state,
          posts: {
            ...state.posts,
            apiData: updatedPosts,
            apiStatus: LoadingStage.LOAD,
          },
        };
      })
      .addCase(setLike.rejected, (state, { payload }) => ({
        ...state,
        posts: {
          ...state.posts,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(createPost.pending, () => {})
      .addCase(createPost.fulfilled, (state, { payload }) => ({
        ...state,
        posts: {
          ...state.posts,
          apiData: [...(state.posts.apiData || []), payload],
          apiStatus: LoadingStage.LOAD,
        },
      }))
      .addCase(createPost.rejected, (state, { payload }) => ({
        ...state,
        posts: {
          ...state.posts,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
      .addCase(createComment.pending, (state) => ({
        ...state,
        comments: {
          ...state.comments,
          apiStatus: LoadingStage.LOADING
        }
      }))
      .addCase(createComment.fulfilled, (state, { payload }) => {
        const updatedPosts = state.posts.apiData?.map(post =>
          post.id === payload.id ? { ...post, comments: [...payload.comments] } : post
        ) || [];

        return {
          ...state,
          posts: {
            ...state.posts,
            apiData: updatedPosts,
            apiStatus: LoadingStage.LOAD,
          },
          comments: {
            ...state.comments,
            apiStatus: LoadingStage.LOAD
          }
        };
      })
      .addCase(createComment.rejected, (state, { payload }) => ({
        ...state,
        posts: {
          ...state.posts,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
        comments: {
          ...state.comments,
          apiStatus: LoadingStage.LOAD
        }
      }))
      .addCase(getNews.pending, (state) => ({
        ...state,
        news: {
          ...state.news,
          apiStatus: LoadingStage.LOADING,
        },
      }))
      .addCase(getNews.fulfilled, (state, { payload }) => ({
        ...state,
        news: {
          ...state.news,
          apiData: payload.articles,
          apiStatus: LoadingStage.LOAD,
        },
      }))
      .addCase(getNews.rejected, (state, { payload }) => ({
        ...state,
        news: {
          ...state.news,
          apiStatus: LoadingStage.LOAD,
          apiError: payload || null,
        },
      }))
  },
});

export default mainPageSlice.reducer;