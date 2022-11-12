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
            let hasSong = false
            let index = 0
            for (let i = 0; i < state.state.listData.length; i++) {
                if (state.state.listData[i].songId == data.songId) {
                    hasSong = true
                    index = i
                    break
                }
            }
            if (hasSong) {
                state.commit("upToList", index)
            } else {
                state.commit("addToList", data)
            }
        },
        playList(state, list) {
            console.log(list);
            let newList = list.map(e => {
                let { name, songName, songId, singerList, img1, album, albumId
                } = e
                let obj = {
                    name: songName || name,
                    singerList: singerList,
                    songId: songId,
                    toneFlag: 'ZQ32',
                    cover: img1,
                    album: album,
                    albumId: albumId
                }
                return obj
            })
            state.commit("changeList", newList)
            state.dispatch("playOnList", { data: newList[0], index: 0 })
            console.log(state);
        },
        deleteSongOnList(state, id) {
            let index
            let newList = state.state.listData.filter((e, i) => {
                if (e.songId == id) {
                    index = i
                }
                return e.songId != id
            })
            if (index < state.state.highLight) {
                state.commit("changeHighNum", state.state.highLight - 1)
            } else if (index == state.state.highLight) {
                index = index % (state.state.listData.length - 1)
                console.log(index, state.state.listData.length);
                state.dispatch("playOnList", { data: newList[index], index: index })
            }
            state.commit("changeList", newList)
            // console.log(newList, index);
        }
    },
    mutations: {
        initPlaylist(state) {
            let data = localStorage.getItem("playlist") ? JSON.parse(localStorage.getItem("playlist")) : {
                listData: [],
                highLight: 0
            }
            state.listData = data.listData
            state.highLight = data.highLight
        },
        addToList(state, data) {
            state.listData = [...[data], ...state.listData]
            // console.log(state);
        },
        upToList(state, index) {
            let data = state.listData[index]
            state.listData = [...[data], ...state.listData.slice(0, index), ...state.listData.slice(index + 1)]
            // console.log(state);

        },
        changeHighNum(state, num) {
            state.highLight = num
            localStorage.setItem("playlist", JSON.stringify(state));
        },
        initHighNum(state) {
            state.highLight = 0
            // console.log(state.highLight);
        },
        changeList(state, data) {
            state.listData = data
            localStorage.setItem("playlist", JSON.stringify({
                listData: data,
                highLight: 0
            }));
        },
        cleanListData(state) {
            state.listData = []
            state.highLight = 0
            localStorage.removeItem("playlist");
        }

    }
}