export default {
    state: {
        listData: []
        /*
        {
            name:最伟大的作品，
            singger：周杰伦
            songID：1139846641
        }
         */
    },
    mutations: {
        addToList(state, data) {
            // state.listData = [...state.listData,...[data]]
            let newArr = []
            let newSong = {
                name: data.songName,
                singer: data.singerList,
                songId: data.id
            }
            let hasSong = false
            for (let i = 0; i < state.listData.length; i++) {
                if (state.listData[i].songId == data.id) {
                    hasSong = true
                    break
                } else {
                    newArr.push(state.listData[i])
                }
            }
            if (!hasSong) {
                state.listData = [...[newSong], ...newArr]
            }
        }
    }
}