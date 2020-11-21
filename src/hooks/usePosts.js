import { reactive, watch } from 'vue';
import API from '@/lib/API';

export default function usePosts(subreddit) {
    const postState = reactive({
        loading: false,
        error: '',
        data: [],
    });

    async function loadData() {
        try {
            postState.loading = true;
            postState.error = '';
            postState.data = [];

            const response = await API.getPosts(subreddit);
            postState.data = response.data.children;
        } catch (error) {
            postState.error = error.message || 'Error loading posts.';
        } finally {
            postState.loading = false;
        }
    }

    watch(() => subreddit, loadData, {immediate: true});

    return postState;
}