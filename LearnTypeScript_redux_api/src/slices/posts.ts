import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { getPosts } from "~/api/getPosts";
import { Post } from "~/api/types";

// 첫 번째 파라미터에는 '슬라이스 이름/함수 이름'을 넣어주세요.
// 두 번째 파라미터에는 요청하고 싶은 함수를 넣어주세요.
export const fetchPosts = createAsyncThunk('posts/fetchUsers', getPosts);

interface PostsState {
    posts: {
        loading: boolean;
        data: Post[] | null;
        error: Error | null;
    };
}

const initialState: PostsState = {
    // 로딩, 결과, 오류 상태를 다룹니다.
    posts: {
        loading: false,
        data: null,
        error: null,
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // 요청이 시작했을 때 loading을 false로 설정하고 나머지 값들은 null로 설정합니다.
        [fetchPosts.pending.type]: (state) => {
            state.posts = {
                loading: true,
                data: null,
                error: null,
            };
        },
        [fetchPosts.fulfilled.type]: (state, action: PayloadAction<Post[]>) => {
            // 요청이 성공했을 때, loading을 false로 하고 data 값을 설정합니다.
            state.posts.data = action.payload;
            state.posts.loading = false;
        },
        // [fetchPosts.rejected.type]: (
        //     state,
        //     action: ReturnType<typeof fetchPosts.rejected>,
        // ) => {
        [fetchPosts.rejected.type]: (state, action: PayloadAction<Error>) => {            
            // 요청이 실패했을 때, loading을 false로 하고 error값을 설정합니다.
            //state.posts.error = action.error;
            state.posts.error = action.payload;
            state.posts.loading = false;
        },
    },
});

export default postsSlice.reducer;