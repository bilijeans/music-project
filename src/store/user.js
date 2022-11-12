export default {
    state: {
        collectSongList: [],
        latelyListen: {
            songs: [],
            playlist: [],
            mv: [],
            album: []
        },
        mySongList: [],
        config: {},
        userCollect: {
            mv: [],
            album: []
        },
        fav: {
            singer: [],
            user: [],
            song: []
        }
    },

    mutations: {
        initUserState(state, obj) {
            for (const key in obj) {
                state[key] = obj[key]
            }
            // console.log(localStorage.getItem("moyuM-user"));
            // console.log(state);
        },
        freshLatelySongData(state, obj) {
            let newArr = state.latelyListen.songs.filter(e => {
                return e.songId != obj.songId
            });
            state.latelyListen.songs = [...[obj], ...newArr]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        freshLatelyPlaylistData(state, obj) {
            let newArr = state.latelyListen.playlist.filter(e => {
                return e.playlistId != obj.playlistId
            });
            state.latelyListen.playlist = [...[obj], ...newArr]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        freshLatelyAlbumData(state, obj) {
            let newArr = state.latelyListen.album.filter(e => {
                return e.albumId != obj.albumId
            });
            state.latelyListen.album = [...[obj], ...newArr]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        freshLatelyMvData(state, obj) {
            let newArr = state.latelyListen.mv.filter(e => {
                return e.resId != obj.resId
            });
            state.latelyListen.mv = [...[obj], ...newArr]
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
        addCollectSongList(state, obj) {
            state.collectSongList = [...[obj], ...state.collectSongList]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delCollectSongList(state, id) {
            state.collectSongList = state.collectSongList.filter(e => {
                return e.playlistId != id
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
        },
        addFavSinger(state, obj) {
            state.fav.singer = [...[obj], ...state.fav.singer]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delFavSinger(state, id) {
            state.fav.singer = state.fav.singer.filter(e => {
                return e.singerId != id
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        addFavUser(state, obj) {
            state.fav.user = [...[obj], ...state.fav.user]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delFavUser(state, id) {
            state.fav.user = state.fav.user.filter(e => {
                return e.userId != id
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        addFavSong(state, obj) {
            state.fav.song = [...[obj], ...state.fav.song]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delFavSong(state, id) {
            state.fav.song = state.fav.song.filter(e => {
                return e.songId != id
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        addCollectAlbum(state, obj) {
            state.userCollect.album = [...[obj], ...state.userCollect.album]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delCollectAlbum(state, id) {
            state.userCollect.album = state.userCollect.album.filter(e => {
                return e.albumId != id
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        addCollectMv(state, obj) {
            state.userCollect.mv = [...[obj], ...state.userCollect.mv]
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        delCollectMv(state, id) {
            state.userCollect.mv = state.userCollect.mv.filter(e => {
                return e.resId != id
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        },
        addToMySongList(state, obj) {
            console.log(obj);
            state.mySongList.forEach(e => {
                if (e.playlistId == obj.id) {
                    let idArr = []
                    obj.songlist.forEach(el => {
                        idArr.push(el.songId)
                    })
                    e.list.filter(item => idArr.indexOf(item.songId) != -1)
                    e.list = [...obj.songlist, ...e.list]
                }
            })
            localStorage.setItem("moyuM-user", JSON.stringify(state))
        }
    }
}