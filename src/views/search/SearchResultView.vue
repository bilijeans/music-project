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
            @click="moreFunc(i.name)"
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
      <div class="morefunc" v-show="moretab">
        <div class="morefunc-title">{{ name }}</div>
        <div class="func">
          <div class="func-item">
            <div>
              <svg
                class="icon"
                width="16px"
                height="16.00px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2c2c2c"
                  d="M138.666667 938.713333a53.58 53.58 0 0 1-53.333334-53.433333V138.72a53.333333 53.333333 0 0 1 80.886667-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046666-810.666666a10.98 10.98 0 0 0-5.333333 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446667-1.586667zM938.666667 917.333333V106.666667a21.333333 21.333333 0 0 0-42.666667 0v810.666666a21.333333 21.333333 0 0 0 42.666667 0z"
                />
              </svg>
            </div>
            <span>下一首播放</span>
          </div>
          <div class="func-item">
            <div>
              <svg
                class="icon"
                width="16px"
                height="16.00px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2c2c2c"
                  d="M970.666667 213.333333H546.586667a10.573333 10.573333 0 0 1-7.54-3.126666L429.793333 100.953333A52.986667 52.986667 0 0 0 392.08 85.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v704a53.393333 53.393333 0 0 0 53.333333 53.333333h874.666667a53.393333 53.393333 0 0 0 53.333333-53.333333V266.666667a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666666 629.333334a10.666667 10.666667 0 0 1-10.666666 10.666666H96a10.666667 10.666667 0 0 1-10.666667-10.666666V138.666667a10.666667 10.666667 0 0 1 10.666667-10.666667h296.08a10.573333 10.573333 0 0 1 7.54 3.126667l109.253333 109.253333A52.986667 52.986667 0 0 0 546.586667 256H970.666667a10.666667 10.666667 0 0 1 10.666666 10.666667z m-298.666666-309.333334a21.333333 21.333333 0 0 1-21.333334 21.333334H554.666667v106.666666a21.333333 21.333333 0 0 1-42.666667 0V554.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666667h106.666667V405.333333a21.333333 21.333333 0 0 1 42.666667 0v106.666667h106.666666a21.333333 21.333333 0 0 1 21.333334 21.333333z"
                />
              </svg>
            </div>
            <span>加到歌单</span>
          </div>
          <div class="func-item">
            <div>
              <svg
                class="icon"
                width="16px"
                height="16.00px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2c2c2c"
                  d="M149.333333 938.666667a21.333333 21.333333 0 0 1-21.333333-21.333334v-106.666666a85.426667 85.426667 0 0 1-85.333333-85.333334V213.333333a85.426667 85.426667 0 0 1 85.333333-85.333333h768a85.426667 85.426667 0 0 1 85.333333 85.333333v512a85.426667 85.426667 0 0 1-85.333333 85.333334H286.166667l-121.746667 121.753333A21.333333 21.333333 0 0 1 149.333333 938.666667zM128 170.666667a42.713333 42.713333 0 0 0-42.666667 42.666666v512a42.713333 42.713333 0 0 0 42.666667 42.666667h21.333333a21.333333 21.333333 0 0 1 21.333334 21.333333v76.5l91.58-91.586666A21.333333 21.333333 0 0 1 277.333333 768h618.666667a42.713333 42.713333 0 0 0 42.666667-42.666667V213.333333a42.713333 42.713333 0 0 0-42.666667-42.666666z"
                />
              </svg>
            </div>
            <span>评论</span>
          </div>
          <div class="func-item">
            <div>
              <svg
                class="icon"
                width="16px"
                height="16.00px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2c2c2c"
                  d="M512 938.666667a21.28 21.28 0 0 1-13.813333-5.08c-106-90.073333-188.12-163.94-251.133334-225.806667-60.82-59.713333-105.446667-109.92-136.44-153.48-28.96-40.713333-47.133333-76.833333-57.193333-113.673333C44.493333 407.94 42.666667 377.293333 42.666667 341.333333a256 256 0 0 1 469.333333-141.573333A256 256 0 0 1 981.333333 341.333333c0 35.96-1.826667 66.606667-10.753333 99.293334-10.06 36.84-28.233333 72.96-57.193333 113.673333-30.993333 43.56-75.62 93.766667-136.44 153.48-63.013333 61.866667-145.153333 135.733333-251.133334 225.806667A21.266667 21.266667 0 0 1 512 938.666667zM298.666667 128c-117.633333 0-213.333333 95.7-213.333334 213.333333 0 60.793333 4.306667 109.88 60.053334 188.233334C203.926667 611.866667 317.293333 723.14 512 889.333333c194.706667-166.173333 308.073333-277.446667 366.613333-359.746666C934.36 451.213333 938.666667 402.126667 938.666667 341.333333c0-117.633333-95.7-213.333333-213.333334-213.333333-83.1 0-159.226667 48.813333-193.946666 124.353333a21.333333 21.333333 0 0 1-38.773334 0C457.893333 176.813333 381.766667 128 298.666667 128z"
                />
              </svg>
            </div>
            <span>收藏</span>
          </div>
          <div class="func-item">
            <div>
              <svg
                t="1665739418463"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="23523"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
              >
                <path
                  d="M857.593333 826c-24.666667-23.333333-51.1-41.633333-80.733333-55.9-26.186667-12.606667-52.6-21.066667-78.14-29.246667-27.106667-8.666667-55.14-17.653333-84.533333-31.933333-30.54-14.833333-47.833333-40.52-51.513334-76.433333C607 603.12 636.973333 558.333333 646.406667 508c17.473333-1.74 33.333333-14.066667 44-34.433333 9.433333-18 14.626667-41.406667 14.626666-66 0-14.946667 3.18-29.153333 6-41.693334 4.206667-18.753333 7.833333-34.946667-2.526666-47.893333-4-5.033333-11.606667-11.033333-24.8-11.033333a50.666667 50.666667 0 0 0-6.76 0.48q0.186667-2.22 0.32-4.186667c5.886667-90.44 2-145.333333-35.393334-176.366667-57.806667-48-105.8-40.666667-144.373333-34.78-11.406667 1.74-22.24 3.393333-32.373333 3.46 1.873333-3.686667 5.526667-9.373333 12.666666-17.333333a21.333333 21.333333 0 0 0-22.733333-34.413333c-1.473333 0.493333-36.386667 12.32-71.766667 28.38-21.333333 9.7-38.533333 18.993333-51.026666 27.62a120.26 120.26 0 0 0-14.133334 11.2 48.826667 48.826667 0 0 1-3.013333-10 21.086667 21.086667 0 0 0-12-16.366667 21.333333 21.333333 0 0 0-20.426667 1.333333c-24.746667 15.48-42.42 42.22-52.526666 79.48C222.393333 194.033333 218.666667 230 218.666667 275.446667c0 9.493333 0.42 20.04 1.24 31.533333-11.94 0.52-18.773333 6.666667-21.846667 10.433333-10.306667 12.573333-7.04 28.973333-3.26 47.96 2.526667 12.666667 5.38 26.986667 5.38 42.193334 0 24.226667 4.553333 47.333333 12.826667 65.08 11.013333 23.613333 25.44 31.886667 36.446666 34.48a188.206667 188.206667 0 0 0 29.133334 71.206666A199.1 199.1 0 0 0 338.666667 635.886667c-4.513333 34.1-22 58.613333-52.053334 72.973333-29.933333 14.3-58.473333 23.28-86.073333 32-25.96 8.173333-52.806667 16.62-79.413333 29.213333-30.106667 14.253333-56.933333 32.513333-82 55.833334-30.2 28.073333-37.84 70-38.933334 100.173333a53.333333 53.333333 0 0 0 53.333334 55.286667h789.026666a53.333333 53.333333 0 0 0 53.333334-55.253334c-1.1-30.2-8.606667-72.046667-38.293334-100.113333z m-7.373333 109.413333a10.593333 10.593333 0 0 1-7.666667 3.253334H53.446667a10.666667 10.666667 0 0 1-10.666667-11.08c0.8-22.14 5.846667-52.34 25.333333-70.466667 48.62-45.2 93.373333-59.286667 145.193334-75.593333 29.006667-9.133333 59.006667-18.573333 91.646666-34.166667 27.42-13.093333 48-32.566667 61.153334-57.88 9.82-18.88 15.273333-40.586667 16.213333-64.52a21.333333 21.333333 0 0 0-11.386667-19.713333C323.14 580.093333 292.666667 534.32 289.38 482.8a21.333333 21.333333 0 0 0-30.78-17.753333c-5.266667-4.266667-15.746667-24.34-15.746667-57.48 0-19.413333-3.44-36.666667-6.2-50.526667-0.086667-0.453333-0.18-0.906667-0.273333-1.373333a21.333333 21.333333 0 0 0 28.846667-22.333334C262.666667 310.833333 261.333333 291.333333 261.333333 275.406667c-0.033333-41.58 3.233333-73.906667 10-98.82 3.866667-14.273333 8.813333-26 14.92-35.286667 7.233333 10.473333 17.68 19.486667 32.226667 22.786667a21.333333 21.333333 0 0 0 25.966667-18.846667c2.26-3.08 13.773333-15.533333 63.4-37.333333 4.273333-1.873333 8.52-3.686667 12.666666-5.406667a36.366667 36.366667 0 0 0 2.973334 13.053333c5.96 13.733333 20.113333 22.186667 37.866666 22.613334 14.666667 0.346667 28.873333-1.82 42.6-3.913334 36.286667-5.54 67.62-10.326667 110.666667 25.426667 6.753333 5.606667 15.046667 15.333333 19.24 40.886667 3.633333 22.146667 3.886667 52.946667 0.833333 99.88-0.5 7.693333-1.946667 19.74-4.293333 35.793333a21.333333 21.333333 0 0 0 31.6 21.7c2.933333-1.653333 5.62-2.993333 8-4.08-0.206667 0.92-0.406667 1.826667-0.6 2.666667-3.133333 14-7.026667 31.333333-7.026667 51.026666 0 17.533333-3.553333 34.353333-9.746666 46.153334-4.626667 8.826667-9.16 11.8-10.52 11.8a4.513333 4.513333 0 0 1-2-0.926667 21.333333 21.333333 0 0 0-33.373334 16.493333c-2.573333 50-31.24 95.42-76.666666 121.42a21.333333 21.333333 0 0 0-10.733334 18.953334c0.486667 24.366667 5.526667 46.52 14.98 65.84 12.886667 26.333333 33.5 46.526667 61.266667 60 32.126667 15.606667 61.626667 25.053333 90.16 34.193333 50.88 16.286667 94.82 30.36 142.573333 75.506667 19.18 18.14 24.146667 48.4 24.933334 70.593333a10.666667 10.666667 0 0 1-3.026667 7.833333zM853.333333 277.333333a21.333333 21.333333 0 0 1 21.333334-21.333333h128a21.333333 21.333333 0 0 1 0 42.666667h-128a21.333333 21.333333 0 0 1-21.333334-21.333334z m170.666667 256a21.333333 21.333333 0 0 1-21.333333 21.333334h-170.666667a21.333333 21.333333 0 0 1 0-42.666667h170.666667a21.333333 21.333333 0 0 1 21.333333 21.333333z m0 256a21.333333 21.333333 0 0 1-21.333333 21.333334h-42.666667a21.333333 21.333333 0 0 1 0-42.666667h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333z"
                  fill="#5C5C66"
                  p-id="23524"
                ></path>
              </svg>
            </div>
            <span>歌手详情</span>
          </div>
          <div class="func-item">
            <div>
              <svg
                class="icon"
                width="16px"
                height="16.00px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2c2c2c"
                  d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m0 732.16c-121.344 0-220.16-98.816-220.16-220.16s98.816-220.16 220.16-220.16 220.16 98.816 220.16 220.16-98.816 220.16-220.16 220.16zM512 361.472c-82.944 0-150.528 67.584-150.528 150.528s67.584 150.528 150.528 150.528 150.528-67.584 150.528-150.528-67.584-150.528-150.528-150.528z m0 232.448c-45.056 0-81.92-36.864-81.92-81.92s36.864-81.92 81.92-81.92 81.92 36.864 81.92 81.92-36.864 81.92-81.92 81.92z"
                />
              </svg>
            </div>
            <span>专辑详情</span>
          </div>
        </div>
        <div class="morefunc-cancel" @click="cancelmorefunc()">取消</div>
      </div>
      <div class="shadow" v-show="moretab" @click="cancelmorefunc()"></div>
    </div>
    <div class="albums rl" v-if="dataHeader == 'album'">
      <div v-if="searchData">
        <div class="album-item" v-for="i in searchData" :key="i.id">
          <div class="album-img" v-if="i.imgItems">
            <img :src="i.imgItems[0].img" />
            <img class="Album-img" src="@/assets/Album.png" />
          </div>
          <div class="album-msg">
            <div class="album-name">{{ i.name }}</div>
            <div class="album-pro">
              <div class="album-singer">{{ i.singer }}</div>
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
        <div class="mvSong-item" v-for="i in searchData" :key="i.id">
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
            <div class="mvSong-name">{{ i.name }}</div>
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
              <span>{{ i.singers ? dealWithSingerName(i.singers) : "" }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noresult">无搜索结果</div>
    </div>
    <div class="songList rl" v-if="dataHeader == 'songList'">
      <div v-if="searchData">
        <div class="songList-item" v-for="i in searchData" :key="i.id">
          <div class="songList-img">
            <img :src="i.musicListPicUrl" />
          </div>
          <div class="songList-msg">
            <div class="songList-title">{{ i.name }}</div>
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
        <div class="singer-item" v-for="i in searchData" :key="i.id">
          <div class="singer-img" v-if="singerInfo[i.id]">
            <img :src="singerInfo[i.id][0].contents[0].img2" />
          </div>
          <div class="singer-msg" v-if="singerData">
            <div class="singer-name">{{ i.name }}</div>
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
// import SearchCompontents from "@/components/SearchCompontents.vue";
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
      singerData: null,
      singerInfo: {},
      songActiveData: [],
      singerActiveData: [],
      albumActiveData: [],
    };
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
        console.log(this.searchData);
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
        let str = this.dealWithSingerName(e.singers);
        if (e.albums) {
          e.albums = e.albums[0].name.replaceAll(" ", "");
          arr3.push(this.dealWithWord(this.text, e.albums));
        }
        arr1.push(this.dealWithWord(this.text, e.name));
        arr2.push(this.dealWithWord(this.text, str));
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
    moreFunc(name) {
      this.moretab = true;
      this.name = name;
    },
    // 取消点击贡多功能
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
          .song-active {
            color: #e82f60;
          }
        }
      }
    }
    .morefunc {
      display: flex;
      flex-direction: column;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: #fff;
      z-index: 999;
      .morefunc-title {
        padding: 15px;
        font-size: 13px;
        line-height: 20px;
        box-shadow: 0px 4px 4px #ebeaea;
      }
      .func {
        display: flex;
        flex-wrap: wrap;
        .func-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 25%;
          margin: 5px 0 0 0;
          padding: 10px 0;
          font-size: 12px;
          div {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 50px;
            height: 50px;
            border-radius: 999px;
            background-color: rgba($color: #ccc, $alpha: 0.4);
            svg {
              width: 20px;
              height: 20px;
            }
          }
          span {
            display: block;
            padding: 8px 0 0 0;
          }
        }
      }
      .morefunc-cancel {
        border-top: 1px dotted #ccc;
        padding: 15px 0 20px;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
    .shadow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba($color: #ccc, $alpha: 0.4);
      z-index: 1;
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
        img {
          display: block;
          width: 45vw;
          border-radius: 6px;
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