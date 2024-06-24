import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from '@/core/models';
import { configuredAxios } from '@/core/utils/axios.utils.ts';
import { Api } from '@/core/enum';
import { HandleError } from '@/core/utils/handleError.ts';
import { CreateUser, IUser } from '@/modules/Auth/models';

export const getUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: ErrorMessageType }
>('users/getUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get<IUser[]>(Api.USERS)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const getUser = createAsyncThunk<
  IUser,
  { id: string },
  { rejectValue: ErrorMessageType }
>('users/getUser', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get<IUser>(`${Api.USERS}/${id}`)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const getCurrentUser = createAsyncThunk<
  IUser,
  { id: string },
  { rejectValue: ErrorMessageType }
>('users/getCurrentUser', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get<IUser>(`${Api.USERS}/${id}`)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const createUser = createAsyncThunk<
  IUser,
  { userData: CreateUser },
  { rejectValue: ErrorMessageType }
>('users/createUser', async ({ userData }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.post<IUser>(Api.USERS, userData)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})

export const updateUser = createAsyncThunk<
  IUser,
  { id: string, userData: IUser },
  { rejectValue: ErrorMessageType }
>('users/updateUser', async ({ id, userData }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.put<IUser>(`${Api.USERS}/${id}`, userData)

    return data
  } catch (error) {
    const errorObject = HandleError(error)
    return rejectWithValue(errorObject)
  }
})