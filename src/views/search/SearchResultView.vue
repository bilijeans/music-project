<template>
  <div class="result">
    <div class="search-head">
      <i class="wd-icon-thin-arrow-left" @click="goToLenovo"></i>
      <div class="search-input" @click="goToLenovo">
        <input
          type="search"
          :placeholder="text"
          maxlength="25"
          v-model="text"
        />
        <i class="wd-icon-close"></i>
      </div>
    </div>
    <div class="container">
      <div
        :class="{ on: i.chooseStatus }"
        @click="changeContainer(i.key)"
        v-for="i in container"
        :key="i.key"
      >
        {{ i.showName }}
      </div>
    </div>
    <div class="song rl" v-if="dataHeader == 'song'">
      <div v-if="searchData">
        <div class="song-play">
          <div class="play-all">
            <svg
              class="icon"
              width="14px"
              height="14.00px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#2c2c2c"
                d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
              />
            </svg>
            <span>播放全部 </span>
          </div>
          <svg
            class="icon"
            width="20px"
            height="20.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2c2c2c"
              d="M149.333333 938.666667a21.266667 21.266667 0 0 1-15.086666-6.246667l-42.666667-42.666667a21.333333 21.333333 0 0 1 30.173333-30.173333l27.58 27.586667 112.913334-112.92a21.333333 21.333333 0 0 1 30.173333 30.173333l-128 128A21.266667 21.266667 0 0 1 149.333333 938.666667z m768-42.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666667h512a21.333333 21.333333 0 0 1 0 42.666667zM149.333333 618.666667a21.266667 21.266667 0 0 1-15.086666-6.246667l-42.666667-42.666667a21.333333 21.333333 0 0 1 30.173333-30.173333L149.333333 567.166667l112.913334-112.92a21.333333 21.333333 0 0 1 30.173333 30.173333l-128 128A21.266667 21.266667 0 0 1 149.333333 618.666667z m768-64H405.333333a21.333333 21.333333 0 0 1 0-42.666667h512a21.333333 21.333333 0 0 1 0 42.666667zM149.333333 256a21.266667 21.266667 0 0 1-15.086666-6.246667l-42.666667-42.666666a21.333333 21.333333 0 0 1 30.173333-30.173334L149.333333 204.5l112.913334-112.92a21.333333 21.333333 0 0 1 30.173333 30.173333l-128 128A21.266667 21.266667 0 0 1 149.333333 256z m768-42.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666666h512a21.333333 21.333333 0 0 1 0 42.666666z"
            />
          </svg>
        </div>
        <div class="song-item" v-for="(i, index) in searchData" :key="i.id">
          <div class="song-msg">
            <div class="song-name">
              <span
                v-for="(n, nindex) in songActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
            <div class="song-pro">
              <div
                class="toneflag"
                :style="{
                  backgroundPosition: toneflagChoose(i),
                  width: toneflagWidth(i),
                }"
                v-if="
                  i.newRateFormats[i.newRateFormats.length - 1]?.formatType !=
                  'PQ'
                "
              ></div>
              <span
                v-for="(n, nindex) in singerActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >·
              <span
                v-for="(n, nindex) in albumActiveData[index]"
                :key="nindex + '0'"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
          </div>
          <svg
            @click="moreFunc(i.name, i.id)"
            class="icon"
            width="16px"
            height="16.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2c2c2c"
              d="M469.333333 896a42.666667 42.666667 0 1 1 42.666667 42.666667 42.713333 42.713333 0 0 1-42.666667-42.666667m-42.666666 0a85.333333 85.333333 0 1 0 85.333333-85.333333 85.333333 85.333333 0 0 0-85.333333 85.333333z m42.666666-384a42.666667 42.666667 0 1 1 42.666667 42.666667 42.713333 42.713333 0 0 1-42.666667-42.666667m-42.666666 0a85.333333 85.333333 0 1 0 85.333333-85.333333 85.333333 85.333333 0 0 0-85.333333 85.333333z m42.666666-384a42.666667 42.666667 0 1 1 42.666667 42.666667 42.713333 42.713333 0 0 1-42.666667-42.666667m-42.666666 0A85.333333 85.333333 0 1 0 512 42.666667a85.333333 85.333333 0 0 0-85.333333 85.333333z"
            />
          </svg>
        </div>
      </div>
      <div v-else class="noresult">无搜索结果</div>
      <songs-more-func
        :name="name"
        :id="id"
        :moretab="moretab"
        @cancelmorefunc="cancelmorefunc"
      ></songs-more-func>
    </div>
    <div class="albums rl" v-if="dataHeader == 'album'">
      <div v-if="searchData">
        <div class="album-item" v-for="(i, index) in searchData" :key="i.id">
          <div class="album-img" v-if="i.imgItems">
            <img :src="i.imgItems[0].img" />
            <img class="Album-img" src="@/assets/Album.png" />
          </div>
          <div class="album-msg">
            <div class="album-name">
              <span
                v-for="(n, nindex) in songActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
            <div class="album-pro">
              <div class="album-singer">
                <span
                  v-for="(n, nindex) in singerActiveData[index]"
                  :key="nindex"
                  :class="{ 'song-active': n.highLight }"
                  >{{ n.word }}</span
                >
              </div>
              <div class="album-time">{{ i.publishDate }}</div>
            </div>
          </div>
          <i class="wd-icon-arrow-right"></i>
        </div>
      </div>
      <div v-else class="noresult">无搜索结果</div>
    </div>
    <div class="mvSong rl" v-if="dataHeader == 'mvSong'">
      <div v-if="searchData && searchData.length > 0">
        <div class="mvSong-item" v-for="(i, index) in searchData" :key="i.id">
          <div class="mvSong-img" v-if="i.mvList">
            <img :src="i.mvList[0]?.mvPicUrl[1]?.img" />
          </div>
          <div class="mvSong-playNum">
            <svg
              t="1666840943343"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="23732"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
            >
              <path
                d="M586.666667 213.333333H53.333333a53.393333 53.393333 0 0 0-53.333333 53.333334v490.666666a53.393333 53.393333 0 0 0 53.333333 53.333334h533.333334a53.393333 53.393333 0 0 0 53.333333-53.333334V266.666667a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666666 544a10.666667 10.666667 0 0 1-10.666666 10.666667H53.333333a10.666667 10.666667 0 0 1-10.666666-10.666667V266.666667a10.666667 10.666667 0 0 1 10.666666-10.666667h533.333334a10.666667 10.666667 0 0 1 10.666666 10.666667z m399.72-536.8a52.746667 52.746667 0 0 0-53.613333 0.493334l-192 114a53.553333 53.553333 0 0 0-26.106667 45.853333v262.24a53.54 53.54 0 0 0 26.106667 45.853333l192 114a53.333333 53.333333 0 0 0 80.56-45.853333V266.88a52.746667 52.746667 0 0 0-26.946667-46.346667zM981.333333 757.12a10.666667 10.666667 0 0 1-16.113333 9.166667l-192-114a10.706667 10.706667 0 0 1-5.22-9.166667V380.88a10.706667 10.706667 0 0 1 5.22-9.166667l192-114a10.4 10.4 0 0 1 5.386667-1.54 11.006667 11.006667 0 0 1 5.333333 1.44 10.466667 10.466667 0 0 1 5.386667 9.266667z"
                fill="#fff"
                p-id="23733"
              ></path>
            </svg>
            <span v-if="i.mvList">{{
              dealWithPlayNum(i.mvList[0]?.playNum)
            }}</span>
          </div>
          <div class="mvSong-msg">
            <div class="mvSong-name">
              <span
                v-for="(n, nindex) in songActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
            <div class="mvSong-singer">
              <svg
                t="1666840583066"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="21256"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
              >
                <path
                  d="M807.538 408.872l-99.22 231.336c-5.233 12.162-16.68 19.405-28.892 19.837a86.04 86.04 0 0 1-2.907 0c-12.311-0.416-23.858-7.66-29.108-19.837L561.499 441.17v185.847c0 18.359-14.87 33.228-33.228 33.228s-33.23-14.87-33.23-33.228V527.93l-66.755 115.618c-6.396 11.081-18.208 16.93-30.154 16.448-11.43 0.482-22.745-5.367-28.86-16.448l-73.601-133.28v116.749c0 18.359-14.87 33.228-33.229 33.228s-33.229-14.87-33.229-33.228V394.418c0-18.36 14.87-33.229 33.23-33.229 14.104 0 26.067 8.822 30.902 21.2 4.719 2.824 104.786 180.48 104.786 180.48l96.91-167.853s14.87-33.827 33.229-33.827c10.051 0 18.94 4.553 25.037 11.597 3.09-3.538 6.895-6.53 11.414-8.573 16.83-7.642 36.435-0.016 43.778 17.013l69.447 160.908 69.015-160.908c7.31-17.03 26.799-24.656 43.53-17.013 16.714 7.626 24.357 27.63 17.047 44.66z"
                  fill="#D81E06"
                  p-id="21257"
                ></path>
                <path
                  d="M927.011 294.733c0-82.573-66.939-149.528-149.528-149.528H245.83c-82.59 0-149.528 66.955-149.528 149.528v431.969c0 82.589 66.939 149.527 149.528 149.527h531.653c82.59 0 149.528-66.938 149.528-149.527v-431.97zM794.097 942.686H229.214c-110.102 0-199.37-89.268-199.37-199.37V278.117c0-110.102 89.268-199.37 199.37-199.37h564.883c110.102 0 199.37 89.268 199.37 199.37v465.197c0 110.103-89.268 199.371-199.37 199.371z"
                  fill="#D81E06"
                  p-id="21258"
                ></path>
              </svg>
              <span
                v-for="(n, nindex) in singerActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noresult">无搜索结果</div>
    </div>
    <div class="songList rl" v-if="dataHeader == 'songList'">
      <div v-if="searchData">
        <div class="songList-item" v-for="(i, index) in searchData" :key="i.id">
          <div class="songList-img">
            <img :src="i.musicListPicUrl" />
          </div>
          <div class="songList-msg">
            <div class="songList-title">
              <span
                v-for="(n, nindex) in songActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
            <div class="songList-times">
              <svg
                t="1666947494755"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12298"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
              >
                <path
                  d="M770.051533 313.11157869H254.83220512c-24.00821911 0-43.59774757 19.58952848-43.59774758 43.59774759v494.15690252c0 24.00821911 19.58952848 43.59774757 43.59774758 43.59774759h515.21932788c24.00821911 0 43.59774757-19.58952848 43.59774761-43.59774759V356.85661596c0-24.15550879-19.58952848-43.74503728-43.59774761-43.74503727z m15.7599966 537.75465011c0 8.69009158-7.06990501 15.75999659-15.7599966 15.75999659H254.83220512c-8.69009158 0-15.75999659-7.06990501-15.7599966-15.75999659V356.85661596c0-8.69009158 7.06990501-15.75999659 15.7599966-15.75999661h515.21932788c8.69009158 0 15.75999659 7.06990501 15.7599966 15.75999661v494.00961284zM277.22023765 255.52131075h470.29597313c7.65906378 0 13.99252034-6.1861669 13.99252032-13.99252032s-6.1861669-13.99252034-13.99252032-13.99252037H277.22023765c-7.65906378 0-13.99252034 6.1861669-13.99252034 13.99252037s6.33345658 13.99252034 13.99252034 13.99252032zM321.84901307 168.62039497h381.03842231c6.92261532 0 12.51962347-5.59700814 12.51962346-12.51962348s-5.59700814-12.51962347-12.51962346-12.51962346H321.84901307c-6.92261532 0-12.51962347 5.59700814-12.51962347 12.51962346s5.59700814 12.51962347 12.51962347 12.51962348z"
                  fill="#FF2C2C"
                  p-id="12299"
                ></path>
                <path
                  d="M634.10315118 451.71117489l-194.56967758 31.96186226c-3.38766283 0.58915875-5.89158752 3.5349525-5.89158751 6.92261531v173.94912129c0 13.40336159-9.72111939 24.74466755-22.9771913 26.6594335l-19.00036972 2.79850407c-16.20186565 2.35663501-28.13233036 16.34915535-28.13233037 32.55102099v3.38766281c0 20.17868721 17.96934191 35.64410444 37.85344978 32.55102102l24.89195723-3.68224219c22.97719129-3.38766283 39.9155054-23.12448098 39.91550538-46.39625166V563.35675824c0-3.5349525 2.50392469-6.48074626 5.89158751-6.92261533l129.61492527-21.20971503c4.27140094-0.73644845 8.24822251 2.65121438 8.24822251 6.92261531v94.55997958c0 13.40336159-9.72111939 24.74466755-22.97719129 26.65943349l-19.00036975 2.79850406c-16.20186565 2.35663501-28.13233036 16.34915535-28.13233035 32.55102101v3.3876628c0 20.17868721 17.96934191 35.64410444 37.85344976 32.55102103l24.89195723-3.68224221c22.97719129-3.38766283 39.9155054-23.12448098 39.9155054-46.39625166V458.63379022c-0.1472897-4.41869063-4.12411126-7.65906378-8.3955122-6.92261533z"
                  fill="#FF2C2C"
                  p-id="12300"
                ></path>
              </svg>
              <span>
                {{ i.musicNum }}首 播放{{ dealWithPlayNum(i.playNum) }}次
              </span>
            </div>
            <div class="songList-ts">{{ dealWithSongListTS(i.ts) }}</div>
          </div>
          <i class="wd-icon-arrow-right"></i>
        </div>
      </div>
      <div v-else class="noresult">无搜索结果</div>
    </div>
    <div class="tagSong rl" v-if="dataHeader == 'tagSong'">
      <div class="noresult">无搜索结果</div>
    </div>
    <div class="singer rl" v-if="dataHeader == 'singer'">
      <div v-if="searchData">
        <div class="singer-item" v-for="(i, index) in searchData" :key="i.id">
          <div class="singer-img" v-if="singerInfo[i.id]">
            <img :src="singerInfo[i.id][0].contents[0].img2" />
          </div>
          <div class="singer-msg" v-if="singerData">
            <div class="singer-name">
              <span
                v-for="(n, nindex) in songActiveData[index]"
                :key="nindex"
                :class="{ 'song-active': n.highLight }"
                >{{ n.word }}</span
              >
            </div>
            <div class="singer-contents">
              {{
                singerInfo[i.id]
                  ? dealWithSingerInfo(singerInfo[i.id][1].contents)
                  : ""
              }}
            </div>
          </div>
          <i class="wd-icon-arrow-right"></i>
        </div>
      </div>
      <div v-else class="noresult">无搜索结果</div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import SongsMoreFunc from "@/components/SongsMoreFunc";
export default {
  data() {
    return {
      text: "",
      pageNo: 1,
      pageSize: 10,
      swtich: {
        song: 1,
        album: 0,
        singer: 0,
        tagSong: 0,
        mvSong: 0,
        songList: 0,
        bestShow: 0,
      },
      container: [
        {
          showName: "单曲",
          key: "song",
          chooseStatus: true,
        },
        {
          showName: "专辑",
          key: "album",
          chooseStatus: false,
        },
        {
          showName: "视频",
          key: "mvSong",
          chooseStatus: false,
        },
        {
          showName: "歌单",
          key: "songList",
          chooseStatus: false,
        },
        {
          showName: "歌词",
          key: "tagSong",
          chooseStatus: false,
        },
        {
          showName: "歌手",
          key: "singer",
          chooseStatus: false,
        },
      ],
      dataHeader: "song",
      searchData: null,
      moretab: false,
      name: "",
      id: "",
      singerData: null,
      singerInfo: {},
      songActiveData: [],
      singerActiveData: [],
      albumActiveData: [],
    };
  },
  components: {
    SongsMoreFunc,
  },
  created() {
    this.text = this.$route.query.word;
    this.getSearchResultData = debounce(this.getSearchResultData, 1500);
  },
  computed: {
    resultUrl() {
      return `/v1.0/content/search_all.do?text=${this.text}&pageNo=${this.pageNo}&pageSize=${this.pageSize}&searchSwitch={"song":${this.swtich.song},"album":${this.swtich.album},"singer":${this.swtich.singer},"tagSong":${this.swtich.tagSong},"mvSong":${this.swtich.mvSong},"songlist":${this.swtich.songList},"bestShow":${this.swtich.bestShow}}`;
    },
  },
  watch: {
    resultUrl() {
      this.searchData = [];
      this.getSearchResultData();
    },
  },
  methods: {
    getSearchResultData() {
      this.$axios.get(this.resultUrl).then(({ data }) => {
        // console.log(data);
        this.searchData = data[this.dataHeader + "ResultData"]?.result;
        // console.log(this.searchData);
        if (this.searchData) {
          this.dealWithActiveData(this.searchData);
        }
        if (this.dataHeader == "singer" && this.searchData) {
          // this.getSingerInfo(this.searchData[0].id);
          this.searchData.forEach((e) => {
            this.getSingerInfo(e.id);
          });
        }
      });
    },
    changeContainer(key) {
      // console.log(key);
      this.dataHeader = key;

      // 点击高亮
      for (const e in this.container) {
        this.container[e].chooseStatus = false;
        if (key == this.container[e].key) {
          this.container[e].chooseStatus = true;
        }
      }
      // 修改key => Url
      for (const skey in this.swtich) {
        this.swtich[skey] = 0;
        if (key == skey) {
          this.swtich[skey] = 1;
        }
      }
    },
    // 处理多个歌手
    dealWithSingerName(arr) {
      let str = "";
      arr.forEach((e) => {
        str = str + e.name + "/";
      });
      str = str.slice(0, -1);
      return str;
    },
    // 处理搜索结果高亮
    dealWithActiveData(data) {
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      data.forEach((e) => {
        e.name = e.name.replaceAll(" ", "");
        arr1.push(this.dealWithWord(this.text, e.name));
        if (e.singers) {
          let str = this.dealWithSingerName(e.singers);
          arr2.push(this.dealWithWord(this.text, str));
        } else if (e.singer) {
          let str = e.singer;
          arr2.push(this.dealWithWord(this.text, str));
        }
        if (e.albums) {
          e.albums = e.albums[0].name.replaceAll(" ", "");
          arr3.push(this.dealWithWord(this.text, e.albums));
        }
      });
      this.songActiveData = arr1;
      this.singerActiveData = arr2;
      this.albumActiveData = arr3;
    },
    dealWithWord(key, str) {
      let arr = [];
      let num = str.indexOf(key);
      if (num != -1) {
        let preStr = str.slice(0, num);
        if (preStr) {
          arr.push({
            word: preStr,
            highLight: false,
          });
        }
        str = str.slice(num + key.length);
        arr.push({
          word: key,
          highLight: true,
        });
        if (str.indexOf(key) != -1) {
          arr = [...arr, ...this.dealWithWord(key, str)];
        } else {
          if (str) {
            arr.push({
              word: str,
              highLight: false,
            });
          }
        }
      } else {
        return [
          {
            word: str,
            highLight: false,
          },
        ];
      }
      return arr;
    },
    // 点击更多功能
    moreFunc(name, id) {
      this.moretab = true;
      this.name = name;
      this.id = id;
    },
    // 取消显示更多功能
    cancelmorefunc() {
      this.moretab = false;
    },
    // 处理视频观看人数
    dealWithPlayNum(num) {
      let num1 = 0;
      let num2 = 0;
      if (num > 10000) {
        num1 = parseInt(num / 10000);
        num2 = parseInt(num % 10000);
        num2 = String(num2).slice(0, 1);
        num = num1 + "." + num2 + "万";
        return num;
      } else {
        return num;
      }
    },
    // 处理SongList标签
    dealWithSongListTS(ts) {
      if (!ts) {
        return "";
      }
      let str = "";
      ts.forEach((e) => {
        str = str + e + ",";
      });
      str = str.slice(0, -1);
      return str;
    },
    // 请求歌手信息
    getSingerInfo(id) {
      this.$axios
        .get(`/bmw/singer/info/v1.0?singerId=${id}`)
        .then(({ data }) => {
          // console.log(data);
          this.singerData = data.data.contents;
          // console.log(this.singerData);
          this.setInSingerInfo(id, data.data.contents);
        });
    },
    // 处理歌手信息
    setInSingerInfo(id, data) {
      this.singerInfo[id] = data;
      // console.log(this.singerInfo);
    },
    // 处理歌手信息
    dealWithSingerInfo(contents) {
      // console.log(contents);
      let str = "";
      contents = contents.slice(1);
      contents.forEach((e) => {
        str = str + e.txt + e.txt2 + " ";
      });
      return str;
    },
    // 歌曲音质图片
    toneflagChoose(i) {
      let toneflag = i.newRateFormats[i.newRateFormats.length - 1].formatType;
      if (toneflag == "ZQ") {
        return "-117px 0";
      } else if (toneflag == "SQ") {
        return "-25px 0";
      } else if (toneflag == "HQ") {
        return "-49px 0";
      } else {
        return "";
      }
    },
    // 歌曲音质图片宽度
    toneflagWidth(i) {
      let toneflag = i.newRateFormats[i.newRateFormats.length - 1].formatType;
      if (toneflag == "ZQ") {
        return "32px";
      } else {
        return "20px";
      }
    },
    goToLenovo() {
      this.$router.push({
        path: "/search",
      });
    },
    goBackHome() {
      this.$router.push({
        path: "/home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  background-color: #f7f7f7;
  .rl {
    height: calc(100vh - 141px);
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .song-active {
    color: #e82f60;
  }
  .noresult {
    text-align: center;
    line-height: calc(100vh - 116px);
  }
  .search-head {
    padding: 8px 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    .wd-icon-thin-arrow-left {
      padding: 0 10px;
      font-size: 14px;
    }
    .search-input {
      position: relative;
      padding: 5px 0px 5px 5px;
      width: 85%;
      font-size: 13px;
      border-bottom: 2px solid #ccc;
      input {
        width: 100%;
        outline: none;
        border: none;
      }
      .wd-icon-close {
        position: absolute;
        top: 6px;
        right: 0;
        width: 18px;
        height: 18px;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        border-radius: 999px;
        color: #fff;
        background-color: #ccc;
        transform: scale(0.9);
      }
    }
  }
  .container {
    width: 100vw;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 4px #eee;
    background-color: #fff;

    div {
      width: calc(100vw / 6);
      font-size: 13px;
      padding: 10px 0;
      text-align: center;
      color: #747474;
    }
    .on {
      font-size: 16px;
      color: #e82f60;
    }
  }
  .song {
    width: 95%;
    margin: 10px auto 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: rgba(255, 255, 255, 0.888);
    .song-play {
      width: 95%;
      margin: 10px auto;
      padding: 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .play-all {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 110px;
        padding: 6px 20px;
        font-size: 12px;
        border-radius: 999px;
        color: #666;
        border: 1px #999 solid;
      }
    }
    .song-item {
      width: 95%;
      height: 50px;
      margin: 0 auto 10px;
      border-bottom: 1px #ccc dotted;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .song-msg {
        width: 80%;
        .song-name {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .song-active {
            color: #e82f60;
          }
        }
        .song-pro {
          display: flex;
          align-items: center;
          padding: 5px 0;
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .toneflag {
            background-image: url("@/assets/acousticfidelity.png");
            background-repeat: no-repeat;
            background-size: 148px 12px;
            height: 12px;
            margin: 0 5px 0 0;
          }
          span {
            // width: 80%;
            // display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .song-item:nth-last-child(1) {
    border: 0;
  }
  .albums {
    width: 90%;
    margin: 10px auto 0;
    .album-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      .album-img {
        position: relative;
        img {
          position: relative;
          z-index: 2;
          display: block;
          width: 20vw;
          border-radius: 6px;
        }
        .Album-img {
          z-index: 1;
          position: absolute;
          top: 0;
          right: -13px;
        }
      }
      .album-msg {
        width: 65%;
        margin: 0 0 0 10px;
        .album-name {
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .album-pro {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 250px;
          height: 15px;
          margin: 6px 0;
          color: #999;
          .album-singer {
            font-size: 12px;
            height: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .album-time {
            font-size: 12px;
            width: 65px;
            height: 15px;
            margin: 0 0 0 10px;
            align-items: center;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .mvSong {
    width: 95%;
    margin: 10px auto 0;
    .mvSong-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 10px 0;
      .mvSong-img {
        position: relative;
        img {
          display: block;
          width: 45vw;
          border-radius: 6px;
        }
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 100px;
          border-radius: 6px;
          background: rgb(0, 0, 0);
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(125, 98, 98, 0) 25%
          );
        }
      }
      .mvSong-playNum {
        position: absolute;
        display: flex;
        align-items: center;
        left: 5px;
        bottom: 12px;
        font-size: 12px;
        color: #fff;
        svg {
          padding: 0 2px 0 0;
        }
      }
      .mvSong-msg {
        width: 45%;
        margin: 0 0 0 10px;
        .mvSong-name {
          font-size: 15px;
          padding: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mvSong-singer {
          display: flex;
          align-items: center;
          font-size: 13px;
          padding: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #999;
          svg {
            padding: 0 5px 0 0;
          }
        }
      }
    }
  }
  .songList {
    width: 95%;
    margin: 10px auto 0;
    .songList-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .songList-img {
        img {
          display: block;
          width: 25vw;
          border-radius: 6px;
        }
      }
      .songList-msg {
        width: 65%;
        margin: -0 0 0 10px;
        .songList-title {
          padding: 2px;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .songList-times {
          display: flex;
          align-items: center;
          padding: 2px;
          font-size: 13px;
        }
        .songList-ts {
          margin: 20px 0 0;
          padding: 2px;
          font-size: 12px;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .tagSong {
    // display: flex;
    // align-items: center;
    // justify-content: space-around;
    width: 95%;
    margin: 10px auto 0;
  }
  .singer {
    width: 95%;
    margin: 10px auto 0;
    .singer-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .singer-img {
        img {
          width: 20vw;
          display: block;
          border-radius: 999px;
        }
      }
      .singer-msg {
        width: 70%;
        margin: 0 0 0 10px;
        .singer-name {
          padding: 2px;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer-contents {
          padding: 2px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>