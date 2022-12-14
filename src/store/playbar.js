export default {
    state: {
        playId: null,
        playURL: null,
        lrcURL: null,
        lrcData: null,
        axios: null,
        songData: null,
        toneFlag: ['PQ', 'HQ', 'SQ', 'ZQ', 'ZQ24', 'ZQ32'],
        toneFlagIndex: 5,
        playStatus: false,
        playbarElement: null,
        vue: null,
        duration: 0,
        canPlay: true
    },
    actions: {
        getPlayURL(state, id) {
            let toneFlag = state.state.toneFlag[state.state.toneFlagIndex]
            if (state.state.toneFlagIndex < 0) {
                state.commit("cannotPlay")
            } else {
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
                    if (data.data.cannotCode == "440016") {
                        state.commit("cannotPlay")
                    } else {
                        if (data.data.cannotCode == "440018") {
                            state.commit("lowerTongFlagIndex")
                            state.dispatch("getPlayURL", id)
                        } else {
                            state.commit("newId", id)
                            state.commit("initTongFlagIndex")
                            state.commit("newURL", data.data.url)
                            state.commit("newLrcURL", data.data.lrcUrl)
                            state.commit("getDuration", data.data.song.duration)
                            state.dispatch("getLrcData")
                            state.commit("commitSongData", data.data.song)
                            state.commit("initHighNum")
                            state.dispatch("hasSong", { name: data.data.song.songName, singerList: data.data.song.singerList, songId: id, toneFlag: toneFlag })
                            state.commit("playOrPause")
                        }
                    }

                });
            }

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
                        state.commit("cannotPlay")
                        console.log('??????????????????????????????????????????');
                    } else {
                        obj.data.toneFlag = state.state.toneFlag[index]
                        state.dispatch("playOnList", obj)
                    }
                } else {
                    state.commit("newId", obj.data.songId)
                    state.commit("initTongFlagIndex")
                    state.commit("newURL", data.data.url)
                    state.commit("newLrcURL", data.data.lrcUrl)
                    state.commit("getDuration", data.data.song.duration)
                    state.dispatch("getLrcData")
                    state.commit("commitSongData", data.data.song)
                    state.commit("changeHighNum", obj.index)
                    state.commit("playOrPause")
                }
            });
        },
        playFirst(state, obj) {
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
                        console.log('??????????????????????????????????????????');
                    } else {
                        obj.data.toneFlag = state.state.toneFlag[index]
                        state.dispatch("playOnList", obj)
                    }
                } else {
                    state.commit("newId", obj.data.songId)
                    state.commit("initTongFlagIndex")
                    state.commit("newURL", data.data.url)
                    state.commit("newLrcURL", data.data.lrcUrl)
                    state.commit("getDuration", data.data.song.duration)
                    state.dispatch("getLrcData")
                    state.commit("commitSongData", data.data.song)
                    state.commit("changeHighNum", obj.index)
                    state.commit("firstPlay")
                }
            });
        },
        getLrcData(state) {
            state.state.axios.get(state.state.lrcURL).then(({ data }) => {
                let arr = data.split('\n')
                arr.pop()
                let lrcData = []
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
                lrcData.unshift({
                    value: '',
                    time: 0
                }, {
                    value: '',
                    time: 0
                }, {
                    value: '',
                    time: 0
                }, {
                    value: '',
                    time: 0
                }, {
                    value: '',
                    time: 0
                }, {
                    value: '',
                    time: 0
                })
                lrcData.push({
                    value: '',
                    time: 999
                }, {
                    value: '',
                    time: 999
                }, {
                    value: '',
                    time: 999
                }, {
                    value: '',
                    time: 999
                }, {
                    value: '',
                    time: 999
                }, {
                    value: '',
                    time: 999
                })
                state.commit("getLrcData", lrcData)

            })
        },
        cleanList(state) {
            state.commit("initPlaybar")
            state.commit("cleanListData")
        }
    },
    mutations: {
        cannotPlay(state) {
            state.canPlay = false
        },
        initCanPlayStatus(state) {
            state.canPlay = true
        },
        getElement(state, el) {
            state.playbarElement = el
        },
        playOrPause(state) {
            state.vue.$nextTick(() => {
                state.playbarElement.play()
            })
        },
        firstPlay(state) {
            state.vue.$nextTick(() => {
                state.playbarElement.pause()
            })
        },
        getDuration(state, num) {
            state.duration = num
        },
        getVue(state, vue) {
            state.vue = vue
        },
        newId(state, id) {
            state.playId = id
        },
        newURL(state, url) {
            state.playURL = url
        },
        newLrcURL(state, url) {
            state.lrcURL = url
        },
        getLrcData(state, data) {
            state.lrcData = data
        },
        getAxios(state, f) {
            state.axios = f
        },
        commitSongData(state, data) {
            if (data.img1.indexOf('http') != -1) {
                data.img1 = '/prod/playlist-service/playListimg/a982971d-27e4-4a70-8c3c-3abdfda852c9.jpg'
                data.img2 = '/prod/playlist-service/playListimg/a982971d-27e4-4a70-8c3c-3abdfda852c9.jpg'
                data.img3 = '/prod/playlist-service/playListimg/a982971d-27e4-4a70-8c3c-3abdfda852c9.jpg'
            }
            state.songData = data
        },
        lowerTongFlagIndex(state) {
            state.toneFlagIndex = state.toneFlagIndex - 1
        },
        initTongFlagIndex(state) {
            state.toneFlagIndex = 5
        },
        initPlaybar(state) {
            state.playId = null
            state.playURL = null
            state.lrcURL = null
            state.lrcData = null
            state.songData = null
        },
        firstPlaybar(state, data) {
            state.playId = data.songId

        }
    }
}