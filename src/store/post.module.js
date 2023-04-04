
export const post = {
  namespaced: true,
  state: {
    dataPost: [
      {
        id: 1,
        name: "Hello World",
        description: "Testing",
      }
    ]
  },
  getters: {
    posts: state => state.dataPost
  },
  mutations: {
    UPDATE_POST(state, payload) {
      state.dataPost.forEach((data, i) => {
        if (data.id == payload.id) {
          // set data by index
          // make clone obj using  JSON.parse(JSON.stringify(payload)
          state.dataPost[i] = JSON.parse(JSON.stringify(payload));
        }
      })
    }
  },
  actions: {
    ADD_NEW({ state }, payload) {
      var id = state.dataPost.length + 1;
      // set new id to data 
      payload.id = id;
      // make clone obj using  JSON.parse(JSON.stringify(payload)
      state.dataPost.push(JSON.parse(JSON.stringify(payload)));
      return "success";
    },
    GET_POST({ state }, id) {
      var data = state.dataPost.filter(data => data.id == id);
      return data;
    },
    UPDATE_POST({ commit, state }, payload) {
      state.dataPost.forEach(element => {
        // check if id update == obj data update 
        if (element.id == payload.id) {
          // set updated data by Mutations
          commit('UPDATE_POST', payload);
        }
      });
      return "success";
    },
    DELETE_POST({ state }, id) {
      //  find index of object that want to delete
      state.dataPost.forEach((element, index) => {
        if (element.id == id) {
          // delete index i , 1 item
          state.dataPost.splice(index, 1)
        }
      });
      return "success";
    }
  }
}