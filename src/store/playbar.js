export default {
    state: {
        playId: null,
        playURL: null,
        axios: null,
        status: false,
        songData: null
    },
    actions: {
        getPlayURL(state, id) {
            console.log(state, id);
            state.commit("newId", id)
            state.state.axios({
                methods: "GET",
                url: `/MIGUM2.0/strategy/listen-url/v2.4?resourceType=2&songId=${id}&toneFlag=ZQ24`,
                headers: {
                    channel: "0146921",
                    aversionid:
                        "DF94878D95A2A88B64928AA5D0ADC975C497B590C29DD38A939884A18AAD996E9B99868D8ED4A68962948E9E86ACCBA29ADFD0D3C5A8A28C6495899EB7829FA5C498848DDDECEE8968978CA389829E759C9A8A87",
                    timestamp: Date.parse(new Date()),
                },
            }).then(({ data }) => {
                console.log(data.data);
                state.commit("newURL", data.data.url)
                state.commit("playNow")
                state.dispatch("getSongData",id)
            });
        },
        getSongData(state,id) {
            state.state.axios(`/MIGUM3.0/resource/song-relation-resource/v1.0?songId=${id}`).then(({data}) => {
                console.log(data.data);
                state.commit("commitSongData",data.data)
            });
        }
    },
    mutations: {
        newId(state, id) {
            state.playId = id
            console.log(state);
        },
        newURL(state, url) {
            state.playURL = url
            console.log(state);
        },
        getAxios(state, f) {
            state.axios = f
        },
        commitSongData(state, data) {
            state.songData = data
            console.log(state);
        },
        toggleStatus(state) {
            state.status = !state.status
        },
        playNow(state){
            state.status = true
        }
    }
}