import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createData, updateData, deleteData } from '@/services/api';
import type { Post } from '@/types';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const data = await fetchData<Post[]>('posts', 10);
  return data;
});

export const addPost = createAsyncThunk<Post, Omit<Post, 'id'>>('posts/addPost', async (post) => {
  const data = await createData<Post, Omit<Post, 'id'>>('posts', post);
  return data;
});

export const editPost = createAsyncThunk<Post, { id: number; post: Partial<Post> }>('posts/editPost', async ({ id, post }) => {
  const data = await updateData<Post, Partial<Post>>('posts', id, post);
  return data;
});

export const removePost = createAsyncThunk<number, number>('posts/removePost', async (id) => {
  await deleteData('posts', id);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
