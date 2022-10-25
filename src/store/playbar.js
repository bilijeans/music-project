export default {
    state: {
        playId: null,
        playURL: null,
        lrcURL: null,
        lrcData: null,
        axios: null,
        songData: null,
        toneFlag: ['PQ', 'HQ', 'SQ', 'ZQ', 'ZQ24', 'ZQ32'],
        toneFlagIndex: 5
    },
    actions: {
        getPlayURL(state, id) {
            let toneFlag = state.state.toneFlag[state.state.toneFlagIndex]
            state.state.axios({
                methods: "GET",
                url: `/MIGUM2.0/strategy/listen-url/v2.4?resourceType=2&songId=${id}&toneFlag=${toneFlag}`,
                headers: {
                    channel: "0146921",
                    aversionid:
                        "DF94878D95A2A88B64928AA5D0ADC975C497B590C29DD38A939884A18AAD996E9B99868D8ED4A68962948E9E86ACCBA29ADFD0D3C5A8A28C6495899EB7829FA5C498848DDDECEE8968978CA389829E759C9A8A87",
                    timestamp: Date.parse(new Date()),
                },
            }).then(({ data }) => {
                if (data.data.cannotCode == "440018") {
                    state.commit("lowerTongFlagIndex")
                    state.dispatch("getPlayURL", id)
                } else {
                    state.commit("newId", id)
                    state.commit("initTongFlagIndex")
                    state.commit("newURL", data.data.url)
                    state.commit("newLrcURL", data.data.lrcUrl)
                    state.dispatch("getLrcData")
                    state.commit("commitSongData", data.data.song)
                    // state.commit("addToList", { ...data.data.song, id: id })
                    console.log(data, data.data.song.songName);
                    state.dispatch("hasSong", { name: data.data.song.songName, singerList: data.data.song.singerList, songId: id, toneFlag: toneFlag })
                }
            });
        },
        playOnList(state, obj) {
            state.state.axios({
                methods: "GET",
                url: `/MIGUM2.0/strategy/listen-url/v2.4?resourceType=2&songId=${obj.data.songId}&toneFlag=${obj.data.toneFlag}`,
                headers: {
                    channel: "0146921",
                    aversionid:
                        "DF94878D95A2A88B64928AA5D0ADC975C497B590C29DD38A939884A18AAD996E9B99868D8ED4A68962948E9E86ACCBA29ADFD0D3C5A8A28C6495899EB7829FA5C498848DDDECEE8968978CA389829E759C9A8A87",
                    timestamp: Date.parse(new Date()),
                },
            }).then(({ data }) => {
                if (data.data.cannotCode == "440018") {
                    let index = 0
                    state.state.toneFlag.forEach((e, i) => {
                        if (e == obj.data.toneFlag) {
                            index = i - 1
                        }
                    })
                    if (index < 0) {
                        console.log('暂无该歌曲播放数据，敬请期待');
                    } else {
                        obj.data.toneFlag = state.state.toneFlag[index]
                        state.dispatch("playOnList", obj)
                    }
                } else {
                    console.log(data);
                    state.commit("newId", obj.data.songId)
                    state.commit("initTongFlagIndex")
                    state.commit("newURL", data.data.url)
                    state.commit("newLrcURL", data.data.lrcUrl)
                    state.dispatch("getLrcData")
                    state.commit("commitSongData", data.data.song)
                    state.commit("changeHighNum", obj.index)
                }
            });
        },
        getLrcData(state) {
            state.state.axios.get(state.state.lrcURL).then(({ data }) => {
                let arr = data.split('\n')
                arr.pop()
                let lrcData = []
                console.log(arr);
                arr.forEach(e => {
                    let time = e.slice(1, 9)
                    let lrcStr = e.slice(10, -1)
                    let min = Number(time.slice(0, 2))
                    let sec = Number(time.slice(3, 5))
                    let ms = Number(time.slice(6, 8))
                    time = min * 60 + sec + ms / 100
                    lrcData.push({
                        value: lrcStr,
                        time: time
                    })
                })
                console.log(lrcData);
                state.commit("getLrcData", lrcData)

            })
        }
    },
    mutations: {
        newId(state, id) {
            state.playId = id
        },
        newURL(state, url) {
            state.playURL = url
        },
        newLrcURL(state, url) {
            console.log(url);
            state.lrcURL = url
        },
        getLrcData(state, data) {
            state.lrcData = data
        },
        getAxios(state, f) {
            state.axios = f
        },
        commitSongData(state, data) {
            state.songData = data
        },
        lowerTongFlagIndex(state) {
            state.toneFlagIndex = state.toneFlagIndex - 1
        },
        initTongFlagIndex(state) {
            state.toneFlagIndex = 5
        },
    }
}