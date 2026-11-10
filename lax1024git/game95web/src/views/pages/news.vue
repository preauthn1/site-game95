<template>
  <div
    class="app"
    :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`"
  >
    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
    <div class="wrapper" >
      <div class="wrapper__inner">
        <div class="container">
          <el-skeleton v-if="!skeletonShow" :rows="1" :count="1" animated :throttle="500" >
            <template slot="template">
              <div class="main-news">
                <div
                  class="newsbig-preview"
                >
                  <div class="newsbig-preview__image" >
                    <div class="newsbig-image">
                      <el-skeleton-item variant="image" style="width: 100%; height:100%;" />
                    </div>
                  </div>
                  <div class="newsbig-preview__body">
                    <div class="newsbig-body">
                    <div style="width: 100%;">
                    <h2 ><el-skeleton-item variant="p"  /></h2>
                      <h2 ><el-skeleton-item variant="h1"  /></h2>
                      <h2><el-skeleton-item variant="h3"  /></h2>
                      <p><el-skeleton-item variant="button"  /></p>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="news-row" >
                <div
                  class="news-preview" v-for="(item,index) in 3"
                >
                  <div class="news-preview__image"  >
                    <div class="news-image">
                      <el-skeleton-item variant="image" style="width: 100%; height:100%;" />
                    </div>
                  </div>
                  <div class="news-preview__body">
                    <div class="news-body">
                      <div class="news-body__head">
                        <span class="datetime news-body__time"><el-skeleton-item variant="h1"  /></span>
                      </div>
                      <h3 class="news-body__title"><el-skeleton-item variant="h3"  /></h3>
                      <p class="news-body__subtitle"><el-skeleton-item variant="text"  /></p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
          <div class="page-news" v-if="skeletonShow">
            <div class="news-header">
              <h2 class="news-header__title">
                <span>{{$t('新闻')}}</span>
              </h2>
              <div
                v-if="options.length > 1"
                class="dropdown news-header__dropdown dropdown_lg dropdown_bottom dropdown_fullwidth"
              >
                <el-select v-model="selectValue" @change="selectChange" :placeholder="$t('请选择')">
                  <el-option
                    v-for="(item,index) in options"
                    :key="`options${index}`"
                    :value="$t(item.name)"
                    :label="$t(item.label)"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="main-news">
              <div
                class="newsbig-preview"
                v-for="(item,index) in newsList"
                :key="`newsList${index}`"
                v-show="index == 0 && listPage == 1"
              >
                <div class="newsbig-preview__image" @click="goNewsDetails(item.id)">
                  <div class="newsbig-image">
                    <el-image :src="item.pic" lazy style="width: 100%; height: 100%" fit="cover"></el-image>
                  </div>
                </div>
                <div class="newsbig-preview__body">
                  <div class="newsbig-body">
                    <div class="newsbig-body__head">
                      <span class="datetime newsbig-body__time">{{item.addtime}}</span>
                    </div>
                    <h2 class="newsbig-body__title">{{$t(item.title)}}</h2>
                    <p class="newsbig-body__subtitle">{{item.brief}}</p>
                    <button
                      @click="goNewsDetails(item.id)"
                      class="button newsbig-body__btn-readmore button_md button_blue button_center"
                    >{{$t('阅读更多')}}</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="news-row" v-if="newsList.length > 0">
              <div
                class="news-preview"
                v-for="(item,index) in newsList"
                :key="`newsList2${index}`"
                v-show="index > 0 || listPage > 1"
              >
                <div class="news-preview__image"  @click="goNewsDetails(item.id)">
                  <div class="news-image">
                    <el-image :src="item.pic" lazy style="width: 100%; height: 100%" fit="cover"></el-image>
                  </div>
                </div>
                <div class="news-preview__body">
                  <div class="news-body">
                    <div class="news-body__head">
                      <span class="datetime news-body__time">{{item.addtime}}</span>
                    </div>
                    <h3 class="news-body__title">{{$t(item.title)}}</h3>
                    <p class="news-body__subtitle">{{item.brief}}</p>
                  </div>
                </div>
              </div>
            </div>
            <el-empty v-else :image="$t('no_empty')" :description="$t('暂无数据')" />
            <div class="container-class" v-if="newsList.length > 0">
              <el-pagination
                background
                :small="isMobileFlag"
                :pager-count="5"
                layout="prev, pager, next"
                :current-page.sync="currentPage"
                @current-change="handleSizeChange"
                :page-size="listLimit"
                :total="listTotal"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
    <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
    <div
      class="app-overlay"
      v-if="isMobileFlag"
      :class="openedleft?'visible':''"
      @click="menuClick"
    ></div>
  </div>
</template>

<script>
import CacheMixin from '@/common/CacheMixin'
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import { journalism_list_api, journalism_type_api } from "@/api/news";
export default {
  name: 'NewsList',
  mixins: [CacheMixin],
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar
  },
  data() {
    return {
      currentPage: 1,
      options: [
        {
          name: this.$t("所有新闻"),
          label: this.$t("所有新闻"),
          id: 0
        }
      ],

      selectValue: this.$t("所有新闻"),
      createdId: 0,
      listPage: 1,
      listLimit: 9,
      newsList: [],
      listTotal: 0,
      skeletonShow:false
    };
  },
  methods: {
    selectChange(e) {
      for (let i in this.options) {
        if (this.options[i].name == e) {
          this.createdId = this.options[i].id;
          this.listPage = 1;
          this.getJournalismList();
        }
      }
    },
    //   新闻列表
    async getJournalismList() {
      let data = {
        page: this.listPage,
        limit: this.listPage == 1 ? 10 : this.listLimit,
        type_id: this.createdId
      };
      await journalism_list_api(data).then(res => {
        if (res && res.data.code == 1) {
          this.newsList = res.data.data;
          this.listTotal = res.data.total;
          this.skeletonShow = true
        }
      });
    },
    // 新闻分类
    async getJournalismType() {
      await journalism_type_api().then(res => {
        if (res && res.data.code == 1) {
          let arr = res.data.data;
          for (let i in arr) {
            arr[i].label = this.$t(arr[i].name);
            arr[i].name = this.$t(arr[i].name);
          }
          this.options = this.options.concat(arr);
          this.getJournalismList();
        }
      });
    },
    menuClick() {
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
    goNewsDetails(id) {
      this.$router.push({ path: `/news-detail/${id}` });
    },
    handleSizeChange(e) {
      this.listPage = e;
      // this.newsList = [];
      this.getJournalismList();
    }
  },
  mounted() {
    this.getJournalismType();
  },
  created() {
    this.isPhone();
  }
};
</script>
<style scoped>
/* news */
.news-preview {
  background-color: #161f2c;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
	cursor: pointer;
}

.news-preview__image {
  position: relative;
  -webkit-transform: translateZ(0);
}

.news-preview__image:hover img {
  opacity: 0.7;
  transform: scale(1.025);
}

.news-preview__body {
  padding: 24px;
}

@media (max-width: 768px) {
  .news-preview__body {
    padding-right: 16px;
    padding-left: 16px;
  }
}

.news-image {
  background-color: #111923;
  height: 0;
  position: relative;
  overflow: hidden;
  padding-top: 56%;
}

.news-image img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
.news-image .el-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.news-body__head {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.news-body__title {
  font-size: 18px;
  height: 43.2px;
  line-height: 1.2;
}

.news-body__subtitle,
.news-body__title {
  display: -webkit-box;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.news-body__subtitle {
  color: #93acd3;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  margin-bottom: 10px;
}

.news-body__time {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #55657e;
  margin-right: auto;
}

.spinner__bounce {
  background-color: #55657e !important;
}

.page-news {
  min-height: 400px;
  position: relative;
}

.news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

@media (max-width: 1100px) {
  .news-header {
    flex-wrap: wrap;
  }
}

.news-header__title {
  margin: 0 0.5em 0 0;
}

@media (max-width: 1100px) {
  .news-header__title {
    margin-bottom: 0;
  }
}

.news-header__dropdown {
  position: relative;
}

.main-news {
  margin-bottom: 40px;
}

@media (max-width: 1000px) {
  .main-news {
    margin-bottom: 24px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .main-news {
    margin-bottom: 24px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .main-news {
    margin-bottom: 24px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .main-news {
    margin-bottom: 24px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .main-news {
    margin-bottom: 24px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .main-news {
    margin-bottom: 24px;
  }
}

.news-row {
  display: grid;
  grid-column: center-start/center-end;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 24px;
  margin-bottom: 24px;
}

.newsbig-preview {
  width: 100%;
  display: flex;
  grid-gap: 54px;
  gap: 54px;
  text-decoration: none;
}

@media (max-width: 1000px) {
  .newsbig-preview {
    grid-gap: 24px;
    gap: 24px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .newsbig-preview {
    grid-gap: 24px;
    gap: 24px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .newsbig-preview {
    grid-gap: 24px;
    gap: 24px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .newsbig-preview {
    grid-gap: 24px;
    gap: 24px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .newsbig-preview {
    grid-gap: 24px;
    gap: 24px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .newsbig-preview {
    grid-gap: 24px;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .newsbig-preview {
    display: block;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .newsbig-preview {
    display: block;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .newsbig-preview {
    display: block;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .newsbig-preview {
    display: block;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .newsbig-preview {
    display: block;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .newsbig-preview {
    display: block;
  }
}

.newsbig-preview__image {
  position: relative;
  width: 50%;
}

@media (max-width: 768px) {
  .newsbig-preview__image {
    display: block;
    margin-bottom: 24px;
    width: 100%;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .newsbig-preview__image {
    display: block;
    margin-bottom: 24px;
    width: 100%;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .newsbig-preview__image {
    display: block;
    margin-bottom: 24px;
    width: 100%;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .newsbig-preview__image {
    display: block;
    margin-bottom: 24px;
    width: 100%;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .newsbig-preview__image {
    display: block;
    margin-bottom: 24px;
    width: 100%;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .newsbig-preview__image {
    display: block;
    margin-bottom: 24px;
    width: 100%;
  }
}

.newsbig-preview__body {
  width: 50%;
}

@media (max-width: 768px) {
  .newsbig-preview__body {
    width: 100%;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .newsbig-preview__body {
    width: 100%;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .newsbig-preview__body {
    width: 100%;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .newsbig-preview__body {
    width: 100%;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .newsbig-preview__body {
    width: 100%;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .newsbig-preview__body {
    width: 100%;
  }
}

.newsbig-image {
  border-radius: 14px;
  background-color: #111923;
  height: 0;
  position: relative;
  overflow: hidden;
  padding-top: 56%;
}

.newsbig-image img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
.newsbig-image .el-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.newsbig-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.newsbig-body__head {
  display: flex;
  width: 100%;
  margin-bottom: 16px;
}

.newsbig-body__title {
  font-size: 24px;
  height: 57.6px;
  line-height: 1.2;
}

.newsbig-body__title {
  width: 100%;
  display: -webkit-box;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.newsbig-body__subtitle {
  color: #93acd3;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.newsbig-body__time {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #93acd3;
  margin-left: auto;
}

.newsbig-body__btn-readmore {
  margin-top: auto;
}

.news {
  min-height: 400px;
}

.news__header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.news__headerbutton {
  margin-right: auto;
}

.news__headerbutton svg {
  fill: #fff;
}

.news__banner {
  margin-bottom: 20px;
}

.news__banner img {
  max-width: 100%;
  border-radius: 25px;
}

.news__content {
  max-width: 856px;
  margin: auto;
}

.news__text {
  width: 100%;
}

.news__title {
  font-weight: 500;
  font-size: 40px;
  line-height: 50px;
  color: #fff;
  margin-top: 16px;
  margin-bottom: 12px;
}

.news__date {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #93acd3;
}

.news__text-read {
  margin-bottom: 0;
}

.news__share {
  width: 100%;
  background: #1c2532;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px;
  margin: 30px 0;
}

@media (max-width: 575.98px) {
  .news__share {
    padding: 26px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.news__share-title {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: #3a07f2;
  margin-top: 14px;
  margin-bottom: 14px;
}

@media (max-width: 575.98px) {
  .news__share-title {
    width: 100%;
    text-align: center;
    margin-top: 0;
    margin-bottom: 32px;
  }
}

.news__socials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none !important;
  padding: 0 !important;
}

.news__socials li {
  margin-left: 20px;
}

.news__socials li:first-child {
  margin-left: 0;
}

.news__socials li:first-child a {
  background: #ff3f18;
}

.news__socials li:nth-child(2) a {
  background: linear-gradient(203.21deg, #37aee2 21.68%, #1e96c8 69.99%);
}

.news__socials li a {
  outline: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50% !important;
  transition: all 0.4s;
}

.news__socials li a:hover {
  cursor: pointer;
  transform: scale(1.2);
  transform-origin: center;
}

.news__socials li svg {
  fill: #fff;
}

.news__body a {
  color: #2281f6;
}

.news__body a::-moz-selection {
  background: #2281f6;
  text-shadow: none;
  color: #fff;
}

.news__body a::selection {
  background: #2281f6;
  text-shadow: none;
  color: #fff;
}

.news__body h1,
.news__body h2,
.news__body h3,
.news__body h4 {
  margin: 30px 0 10px;
}

.news__body h1,
.news__body h2 {
  font-weight: 500;
  font-size: 40px;
  line-height: 50px;
}

.news__body h1 {
  color: #fff;
}

.news__body h2 {
  margin-bottom: 20px;
}

.news__body h3 {
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
}

.news__body h4 {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
}

.news__body h6 {
  font-size: 15px;
  line-height: 24px;
  color: #3a07f2;
  margin-bottom: 8px;
  width: 170px;
  height: 41px;
  background-color: rgba(34, 131, 246, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news__body p {
  font-size: 16px;
  line-height: 24px;
  color: #9cb3df;
  margin: 10px 0;
  padding: 10px 0 !important;
}

.news__body ul {
  list-style-type: disc;
}

.news__body ol,
.news__body ul {
  font-size: 16px;
  line-height: 30px;
  margin: 16px 0;
  padding: 0 40px;
  color: #9cb3df;
}

.news__body figure img {
  width: 100%;
  border-radius: 25px;
}

.news__body figure.image {
  clear: both;
  text-align: center;
  margin: 1em auto;
}

.news__body figure.image-style-align-left {
  float: left;
  margin: 20px 40px 20px 0;
}

.news__body figure.image-style-align-right {
  float: right;
  margin-left: 21px;
}

.news__body figure.media {
  clear: both;
  margin: 1em auto;
}

@media (max-width: 575.98px) {
  .news__body figure {
    width: 100% !important;
  }

  .news__body figure.image {
    float: none;
    margin: 10px 0;
  }
}

.tag {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 12px;
  color: #55657e;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #55657e;
  background-color: transparent;
  white-space: nowrap;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
  max-width: 250px;
}

.tag:not(:last-child) {
  margin-right: 0.5em;
}

.tag:hover {
  color: #93acd3;
  border-color: #93acd3;
}

.tag.active,
.tag:active,
.tag:focus {
  color: #1c2532;
  border-color: #93acd3;
  background-color: #93acd3;
}

.newsbig-image .el-skeleton__image,
.news-image .el-skeleton__image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
</style>
