export default {
    state: {
        listData: [],
        highLight: 0
        /*
        {
            name:最伟大的作品，
            singger：周杰伦
            songID：1139846641
        }
         */
    },
    actions: {
        hasSong(state, data) {
            console.log(3);
            console.log(state, data);
            let hasSong = false
            let index = 0
            for (let i = 0; i < state.state.listData.length; i++) {
                if (state.state.listData[i].songId == data.songId) {
                    hasSong = true
                    index = i
                    break
                }
            }
            console.log(hasSong);
            if (hasSong) {
                state.commit("upToList", index)
            } else {
                state.commit("addToList", data)
            }
        },
        playList(state, list) {
            let newList = list.map(e => {
                let { songName, songId, singerList } = e
                let obj = {
                    name: songName,
                    singerList: singerList,
                    songId: songId,
                    toneFlag: 'ZQ32'
                }
                return obj
            })
            state.commit("changeList", newList)
            state.dispatch("playOnList", { data: newList[0], index: 0 })
        }
    },
    mutations: {
        addToList(state, data) {
            console.log(1);
            state.listData = [...[data], ...state.listData]
            console.log(state, state.listData);
        },
        upToList(state, index) {
            console.log(2);
            let data = state.listData[index]
            state.listData = [...[data], ...state.listData.slice(0, index), ...state.listData.slice(index + 1)]
        },
        changeHighNum(state, num) {
            state.highLight = num
        },
        initHighNum(state) {
            state.highLight = 0
        },
        changeList(state, data) {
            state.listData = data
        }

    }
}