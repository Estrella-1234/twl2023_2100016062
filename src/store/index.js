import { createStore } from "vuex";
import {post} from './post.module'
const store = createStore({
  modules: {
    post
  }
});

export default store;