import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from '@/core/models';
import { Api } from '@/core/enum';
import { HandleError } from '@/core/utils/handleError.ts';
import { configuredAxios } from '@/core/utils/axios.utils.ts';
import { CreatePost, INews, IPost } from '@/modules/Main/models';
import axios from 'axios';

export const getPosts = createAsyncThunk<
  IPost[],
  void,
  { rejectValue: ErrorMessageType }
>('posts/getPosts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get<IPost[]>(Api.POSTS)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const createPost = createAsyncThunk<
  IPost,
  { post: CreatePost },
  { rejectValue: ErrorMessageType }
>('posts/createPosts', async ({ post }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.post<IPost>(Api.POSTS, post)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const createComment = createAsyncThunk<
  IPost,
  { id: string; post: IPost },
  { rejectValue: ErrorMessageType }
>('posts/createComment', async ({ id, post }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.put<IPost>(`${Api.POSTS}/${id}`, post)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const setLike = createAsyncThunk<
  IPost,
  { id: string, post: IPost },
  { rejectValue: ErrorMessageType }
>('posts/setLike', async ({ id, post }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.put<IPost>(`${Api.POSTS}/${id}`, post)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const getNews = createAsyncThunk<
  { articles: INews[] },
  void,
  { rejectValue: ErrorMessageType }
>('news/getNews', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{ articles: INews[] }>(Api.NEWS)

    return data;
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
});