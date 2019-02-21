<template>
  <div class="refund-edit">
    <v-container
      fluid
      class="container">
      <v-layout
        row>
        <v-flex
          xs12>
          <div
            class="header-toolbar">
            <v-toolbar
              app
              :flat="true"
              color="white">
              <i
                @click="onBack()"
                class="iconfont icon-return"/>
              <v-spacer/>
              <span class="header-title">申请退款</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="product-information">
            <template v-for="item in refundDetailData.items">
              <div
                :key="item.orderItemId"
                class="product-information__image">
                <img :src="item.product.thumb">
              </div>
              <div
                :key="item.orderItemId+'1'"
                class="product-information__text">
                <span class="product-information__text-name">{{ item.product.name }}</span>
                <span class="product-information__text-specification">
                  规格:
                  <template v-for="(item,index) in item.product.attributes">
                    <span :key="index">
                      {{ item.value }}
                    </span>
                  </template>
                </span>
              </div>
            </template>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        wrap
        row>
        <v-flex
          xs12>
          <div class="status-cause">
            <div
              v-if="goodsState"
              @click="onGoodsState()"
              class="status-cause__action">
              <v-list>
                <v-list-tile>
                  <v-list-tile-content class="status-cause__action-content">
                    <v-list-tile-title>货物状态:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="status-cause__action-enter">
                    <span v-if="GoodsText===''">请选择&nbsp;&nbsp;</span>
                    <span v-else>{{ GoodsText }}</span>
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
            <div
              @click="onRefundReason()"
              class="status-cause__action">
              <v-list>
                <v-list-tile>
                  <v-list-tile-content class="status-cause__action-content">
                    <v-list-tile-title>退款原因:</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="status-cause__action-enter">
                    <span v-if="refundReasonText===''">请选择&nbsp;&nbsp; </span>
                    <span v-else>{{ refundReasonText }}</span>
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
            <div class="status-cause__refund-sum">
              <span>退款金额:</span>
              <v-text-field
                :disabled="modifyAmount"
                v-model="productRefundPrice"
                prefix="￥"
                single-line/>
            </div>
            <div class="status-cause__refund-message">
              <span>最多￥{{ productRefundPrice }}元，含发货邮费￥0.00</span>
            </div>
            <div class="status-cause__refund-explain">
              <span>退款说明:</span>
              <v-text-field
                v-model="refundDescription"
                rows="3"
                placeholder="请输入"/>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="upload">
            <div><span>上传凭证</span></div>
            <div class="upload-image">
              <template v-for="(image,index) in thumbnail">
                <div
                  :key="index"
                  class="upload-image__images">
                  <img :src="image.thumb">
                  <i
                    @click="onRemoved(index)"
                    class="iconfont icon-roundclose close-top"/>
                </div>
              </template>
              <div
                id='Adds'
                style="display:none"/>
              <div
                v-if="isHideDropzone"
                class="upload-image__btn">
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :destroy-dropzone="true"
                  :options="dropzoneOptions"
                  @vdropzone-success="onUploadSuccess"
                  @vdropzone-thumbnail="onThumbnail"
                  @vdropzone-error="onUploadError"
                  @vdropzone-max-files-exceeded="onMaxFilesExceeded"/>
                <span class="upload-image__prompt">(最多三个文件)</span>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="btn-save"
        row>
        <v-flex
          xs12>
          <div
            class="btn-save__item">
            <v-btn
              block
              color="blue"
              @click="onSubmit()"
              dark>确认修改申请退款</v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <v-bottom-sheet
            v-model="sheet">
            <div
              class="bottom-sheet-card"
              style="height:100%">
              <div
                style="height:100%"
                class="card-list">
                <div class="card-list__close">
                  <i
                    class="iconfont icon-roundclose"
                    @click="sheet=false"/>
                </div>
                <div
                  class="card-list__actions"
                  v-if="causeAndGoodsState">
                  <div class="card-list__title">
                    <span>货物状态</span>
                  </div>
                  <div
                    class="card-list__action">
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>未收到货</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          @click="onNotReceived()"
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="notReceiving"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider/>
                      <v-list-tile>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>已收到货</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          @click="onReceived()"
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="receiving"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                </div>
                <div
                  class="card-list__actions"
                  v-else>
                  <div class="card-list__title">
                    <span>退款原因</span>
                  </div>
                  <div
                    class="card-list__action">
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>拍错/不想要</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          @click="onTakeWrong()"
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="takeWrong"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider/>
                      <v-list-tile>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>快递一直未送到</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          @click="onExpressNot()"
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="expressNot"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider/>
                      <v-list-tile>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>商品破损</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          @click="onDamageGoods()"
                          class="list__action--enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="damageGoods"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider/>
                      <v-list-tile>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>其他</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          @click="onOtherQuestion()"
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="otherQuestion"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                </div>
                <div
                  class="card-list__btn">
                  <v-btn
                    block
                    color="blue"
                    @click="onSave()"
                    dark>保存
                  </v-btn>
                </div>
              </div>
            </div>
          </v-bottom-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import tokenStorage from '@/utils/auth/token-storage';
import {EXIF} from 'exif-js';

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      sheet: false,
      notReceiving: false,
      receiving: false,
      thumbnail: [],
      imageUrl: '',
      productRefundPrice: '',
      dropzoneOptions: {
        url: function() {
          return `${window.AUTH_BASE_URL}files`;
        },
        headers: {
          Authorization: `Bearer ${tokenStorage.getToken().access_token}`
        },
        capture: null,
        multiple: null,
        acceptedFiles: 'image/*',
        maxFilesize: 1,
        dictFileTooBig: '文件大小不能超过0.5MB',
        dictInvalidFileType: '文件类型不限制',
        dictResponseError: '图片上传失败',
        dictFallbackMessage: '浏览器不支持',
        dictDefaultMessage: '添加图片',
        dictMaxFilesExceeded: '最多只能上传3个',
        resizeWidth: 80,
        resizeHeight: 88,
        resizeQuality: 0.5,
        resizeMethod: 'contain',
        resizeMimeType: 'image/jpeg',
        previewsContainer: '#Adds'
      },
      isHideDropzone: true,
      goodsState: false,
      GoodsText: '',
      applicationRefund: {},
      modifyAmount: false,
      causeAndGoodsState: false,
      takeWrong: false,
      expressNot: false,
      damageGoods: false,
      otherQuestion: false,
      refundDescription: '',
      refundReason: '',
      refundReasonText: ''
    };
  },

  computed: {
    ...mapState({
      refundItem: state => state.refund.refundItem,
      refundId: state => state.refund.refundId,
      refundDetailData: state => state.refund.refundDetail,
      refundOrderId: state => state.refund.refundOrderId
    })
  },
  created() {
    if (this.$route.params.id !== undefined) {
      this.refundDetail(this.$route.params.id).then(() => {
        if (this.refundDetailData.type === 'REFUND') {
          this.goodsState = true;
          this.modifyAmount = true;
        } else {
          this.goodsState = false;
          this.modifyAmount = false;
        }
        if (this.refundDetailData.refundReason === 'WRONG_TRADE') {
          this.refundReason = 'WRONG_TRADE';
          this.refundReasonText = '拍错/不想要';
        }
        if (this.refundDetailData.refundReason === 'EXPRESS_NONDELIVERY') {
          this.refundReason = ' EXPRESS_NONDELIVERY';
          this.refundReasonText = '快递一直未送到';
        }
        if (this.refundDetailData.refundReason === 'PRODUCT_DAMAGED') {
          this.refundReason = 'PRODUCT_DAMAGED';
          this.refundReasonText = '商品破损';
        }
        if (this.refundDetailData.refundReason === 'OTHER') {
          this.refundReason = 'OTHER';
          this.refundReasonText = '其他';
        }
        if (this.refundDetailData.isDelivered === false) {
          this.GoodsText = '未收到货';
          this.notReceiving = true;
          this.receiving = false;
        } else {
          this.GoodsText = '已收到货';
          this.notReceiving = false;
          this.receiving = true;
        }
        this.refundDescription = this.refundDetailData.refundDescription;
        this.productRefundPrice = this.refundDetailData.refundAmount;
        this.thumbnail = _.cloneDeep(this.refundDetailData.pictures);
        if (this.thumbnail.length === 3) {
          this.isHideDropzone = false;
        }
      });
    }
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['refundRequest', 'amendRefundApplication', 'refundDetail']),
    ...mapMutations([]),
    onBack() {
      this.$router.push(`/order/detail/${this.refundOrderId}`);
    },
    onGoodsState() {
      this.sheet = true;
      this.causeAndGoodsState = true;
    },
    onRefundReason() {
      this.sheet = true;
      this.causeAndGoodsState = false;
    },
    onMaxFilesExceeded(file) {
    },
    onThumbnail(file, dataUrl) {
      this.imageUrl = dataUrl;
    },
    onUploadSuccess(file, response) {
      let that = this;
      let orientation = 0;
      EXIF.getData(file, function() {
        EXIF.getAllTags(file);
        orientation = EXIF.getTag(file, 'Orientation');
        let width, height;
        let MAX_WH = 200;
        let image = new Image();
        image.src = that.imageUrl;
        image.onload = function() {
          if (image.height > MAX_WH) {
            image.width *= MAX_WH / image.height;
            image.height = MAX_WH;
          }
          if (image.width > MAX_WH) {
            image.height *= MAX_WH / image.width;
            image.width = MAX_WH;
          }
          // 压缩处理
          let cvs = document.createElement('canvas');
          cvs.width = width = image.width;
          cvs.height = height = image.height;
          switch (orientation) {
            case 6:
            case 8:
              cvs.width = height;
              cvs.height = height;
              break;
          }
          let context = cvs.getContext('2d');
          switch (orientation) {
            case 3:
              // 180度左旋转
              context.translate(width, height);
              context.rotate(Math.PI);
              break;
            case 6:
              // 竖着拍时
              context.rotate(0.5 * Math.PI);
              context.translate(0, -height);
              break;
              // 竖着倒着拍
            case 8:
              // 逆时针旋转90度
              context.rotate(-0.5 * Math.PI);
              context.translate(-width, 0);
              break;
          }
          context.drawImage(image, 0, 0, image.width, image.height);
          that.cvsImageDataUrl = cvs.toDataURL('image/jpeg', 1);
          that.thumbnail.push({fileId: response.id, thumb: that.imageUrl});
          if (that.thumbnail.length === 3) {
            that.isHideDropzone = false;
          }
        };
      });
    },
    onUploadError(file, message, xhr) {
      if (message === 'Upload canceled' || message === '图片上传失败') {
        this.$chip({
          chipOptions: '图片上传失败'
        });
      }
    },
    onRemoved(index) {
      this.thumbnail.forEach((obj, key) => {
        if (index === key) {
          this.thumbnail.splice(key, 1);
          if (this.thumbnail.length < 3) {
            this.isHideDropzone = true;
          }
        }
      });
    },
    onSubmit() {
      if (this.goodsState) {
        if (this.GoodsText === '') {
          this.$chip({
            chipOptions: '货物状态必须选择'
          });
          return;
        }
        if (this.productRefundPrice === '') {
          this.$chip({
            chipOptions: '退款金额必须填写'
          });
          return;
        }
        if (this.productRefundPrice > this.refundDetailData.refundAmount) {
          this.$chip({
            chipOptions: `退款金额最多${this.refundDetailData.refundAmount}`
          });
          return;
        }
      }
      if (this.refundReasonText === '') {
        this.$chip({
          chipOptions: '退款原因必须必须选择'
        });
        return;
      }
      this.amendRefundApplication({refundId: this.$route.params.id,
        refundParams: {
          refundAmount: this.refundDetailData.refundAmount,
          type: this.refundDetailData.type,
          isDelivered: this.notReceiving === true ? 'false' : 'true',
          refundReason: this.refundReason,
          refundDescription: this.refundDescription,
          pictures: this.thumbnail
        }}).then(() => {
        this.$router.push(`/order/detail/${this.refundOrderId}`);
      }).catch((error) => {
        this.$error.show(error, '');
      });
    },
    onSave() {
      this.sheet = false;
    },
    onTakeWrong() {
      this.takeWrong = true;
      this.expressNot = false;
      this.damageGoods = false;
      this.otherQuestion = false;
      this.refundReason = 'WRONG_TRADE';
      this.refundReasonText = '拍错/不想要';
    },
    onExpressNot() {
      this.takeWrong = false;
      this.expressNot = true;
      this.damageGoods = false;
      this.otherQuestion = false;
      this.refundReason = 'EXPRESS_NONDELIVERY';
      this.refundReasonText = '快递一直未到';
    },
    onDamageGoods() {
      this.takeWrong = false;
      this.expressNot = false;
      this.damageGoods = true;
      this.otherQuestion = false;
      this.refundReason = 'PRODUCT_DAMAGED';
      this.refundReasonText = '商品破损';
    },
    onOtherQuestion() {
      this.takeWrong = false;
      this.expressNot = false;
      this.damageGoods = false;
      this.otherQuestion = true;
      this.refundReason = 'OTHER';
      this.refundReasonText = '其他';
    },
    onNotReceived() {
      this.notReceiving = true;
      this.receiving = false;
      this.GoodsText = '未收到货';
    },
    onReceived() {
      this.notReceiving = false;
      this.receiving = true;
      this.GoodsText = '已收到货';
    }
  }
};

</script>

<style lang="scss" scoped>
.close-top {
  position: absolute;
  top: -18px;
  right: 0;
}
.product-information {
  height: 62px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  &__image {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      max-height: 50px;
      width: 100%;
    }
  }
  &__text {
    height: 50px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  }
}
.status-cause {
  background: #ffffff;
  &__action {
    height: 44px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
    margin-left: 15px;
    margin-right: 15px;
    &-content {
      font-size: 12px;
    }
    &-enter {
      flex-direction: row;
      align-items: center;
      color: #666666;
      font-size: 12px;
      .icon-enter {
        font-size: 16px;
      }
    }
  }
  &__refund-sum {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    .input-group {
      padding: 0;
    }
  }
  &__refund-message {
    height: 38px;
    display: flex;
    align-items: center;
    background: #ebebeb;
    font-size: 12px;
    color: #999999;
    padding-left: 15px;
  }
  &__refund-explain {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    .input-group {
      padding: 0;
    }
  }
}
.card-list {
  &__close {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
  }
  &__title {
    display: flex;
    justify-content: center;
    font-size: 13px;
  }
  &__actions {
    margin-bottom: 30px;
  }
  &__action {
    .list {
      padding: 0;
      margin-left: 15px;
      margin-right: 15px;
    }
    &-content {
      font-size: 12px;
    }
    &-enter {
      flex-direction: row;
      align-items: center;
      color: #666666;
      font-size: 12px;
      .icon-enter {
        font-size: 16px;
      }
    }
  }
  &__btn {
    position: relative;
    width: 100%;
    padding: 0 15px;
  }
}
.btn-save__item {
  padding: 0 15px;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: block;
  left: 0;
}
.upload {
  padding: 0 15px;
  margin-top: 10px;
}
.upload-image {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  &__images {
    position: relative;
    > img {
      max-width: 70px;
      max-height: 70px;
      margin-right: 10px;
    }
  }
  &__btn {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
  }
  &__prompt {
    font-size: 12px;
    color: #999999;
    display: flex;
    align-items: center;
  }
}
</style>
