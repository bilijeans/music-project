export default {
    state: {
        collectSongList: [],
        latelyListen: {
            songs:[],
            playlist:[],
            mv:[],
            album:[]
        },
        mySongList: [],
        config: {},
        fav:{
            singer:[],
            user:[]
        }
    },
    /*
    {
        playlistId:number
        title:String
        list:array
    }
    */
    mutations: {
        initUserState(state, obj) {
            for (const key in obj) {
                state[key] = obj[key]
            }
            // console.log(localStorage.getItem("moyuM-user"));
            // console.log(state);
        },
        freshLatelyData(state, obj) {
            // console.log(state, obj);
            let newArr = state.latelyListen.songs.filter(e => {
                return e.songId != obj.songId
            });
            state.latelyListen.songs = [...[obj], ...newArr]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        addMySongList(state, name) {
            console.log(state.mySongList);
            state.mySongList.unshift({
                title: name,
                playlistId: Date.now(),
                list: []
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        renameMySongList(state, data) {
            state.mySongList.forEach((e) => {
                if (e.playlistId == data.playlistId) {
                    e = data
                }
            });
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delMySongList(state, id) {
            state.mySongList = state.mySongList.filter(e => {
                return e.playlistId != id
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        }
    }
}