<template>
  <div class="refund-apply">
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
            <div class="product-information__image">
              <img :src="orderRefundItem.productThumb">
            </div>
            <div class="product-information__text">
              <span class="product-information__text-name">{{ orderRefundItem.productName }}</span>
              <span class="product-information__text-specification">
                规格:
                <template v-for="(item,index) in orderRefundItem.productAttributes">
                  <span :key="index">
                    {{ item.value }}
                  </span>
                </template>
              </span>
            </div>
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
                class="input-price"
                :disabled="modifyAmount"
                v-model="productRefundPrice"
                type='number'
                prefix="￥"/>
            </div>
            <div class="status-cause__refund-message">
              <span>最多￥{{ orderRefundItem.productPrice }}元，含发货邮费￥0.00</span>
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
                  @vdropzone-error="onUploadError"
                  @vdropzone-thumbnail="onThumbnail"
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
              dark>申请退款</v-btn>
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
                      <v-divider/>
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
                      <v-list-tile
                        v-if="expressNotArrive">
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
                          class="card-list__action-enter">
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
                          class="list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="otherQuestion"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider/>
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
import {EXIF} from 'exif-js';

import { mapState, mapActions } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import tokenStorage from '@/utils/auth/token-storage';

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      sheet: false,
      totalPrices: 0,
      orders: {items: []},
      orderId: '',
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
        acceptedFiles: 'image/*',
        capture: null,
        maxFilesize: 1,
        multiple: null,
        dictFileTooBig: '文件大小超出最大限制',
        dictInvalidFileType: '文件类型不限制',
        dictResponseError: '图片上传失败',
        dictFallbackMessage: '浏览器不支持',
        dictDefaultMessage: '添加图片',
        dictMaxFilesExceeded: '最多只能上传3个',
        resizeWidth: 600,
        resizeHeight: 800,
        resizeQuality: 0.5,
        resizeMethod: 'contain',
        resizeMimeType: 'image/jpeg',
        previewsContainer: '#Adds'
      },
      isHideDropzone: true,
      goodsState: false,
      GoodsText: '',
      orderRefundItem: {},
      modifyAmount: false,
      causeAndGoodsState: false,
      takeWrong: false,
      expressNot: false,
      damageGoods: false,
      otherQuestion: false,
      expressNotArrive: false,
      refundDescription: '',
      refundReason: '',
      refundReasonText: ''
    };
  },

  computed: {
    ...mapState({
      selectRefundWay: state => state.refund.selectRefundWay,
      refundItem: state => state.refund.refundItem,
      refundOrderId: state => state.refund.refundOrderId,
      refundId: state => state.refund.refundId,
      refundDetailData: state => state.refund.refundDetail
    })
  },
  created() {
    this.orderRefundItem = _.cloneDeep(this.refundItem);
    this.productRefundPrice = this.orderRefundItem.productPrice;
    console.log(this.orderRefundItem);
    if (this.selectRefundWay === 0) {
      this.goodsState = true;
      this.modifyAmount = true;
      this.expressNotArrive = true;
    } else {
      this.goodsState = false;
      this.modifyAmount = false;
      this.expressNotArrive = false;
    }
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['refundRequest', 'refundDetail']),
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
      console.log(file);
      this.$refs.myVueDropzone.removeAllFiles();
      this.$refs.myVueDropzone.addFile(file);
    },
    onThumbnail(file, dataUrl) {
      this.imageUrl = dataUrl;
    },
    onUploadSuccess(file, response) {
      let that = this;
      let orientation = 0;
      EXIF.getData(file, function() {
        console.log(file);
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
          // 压缩图片
          that.cvsImageDataUrl = cvs.toDataURL('image/jpeg', 1);
          that.thumbnail.push({fileId: response.id, thumb: that.imageUrl});
          if (that.thumbnail.length === 3) {
            that.isHideDropzone = false;
          }
        };
      });
    },
    onUploadError(file, message, xhr) {
      console.log(message);
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
      }
      if (this.refundReasonText === '') {
        this.$chip({
          chipOptions: '退款原因必须必须选择'
        });
        return;
      }
      if (this.productRefundPrice === '') {
        this.$chip({
          chipOptions: '退款金额必须填写'
        });
        return;
      }
      if (this.productRefundPrice > this.orderRefundItem.productPrice) {
        this.$chip({
          chipOptions: `退款金额最多${this.orderRefundItem.productPrice}`
        });
        return;
      }
      this.refundRequest({
        orderId: this.refundOrderId,
        items: [{'orderItemId': this.refundItem.id}],
        refundAmount: this.refundItem.productPrice,
        type: this.selectRefundWay === 0 ? 'REFUND' : 'RETURN_REFUND',
        isDelivered: this.selectRefundWay === 1 ? 'true' : this.notReceiving === true ? 'false' : 'true',
        refundReason: this.refundReason,
        refundDescription: this.refundDescription,
        pictures: this.thumbnail
      }).then(() => {
        this.$router.push(`/refund/detail`);
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
      this.refundReason = 'NEVER_RECEIVED';
      this.refundReasonText = '快递一直未到';
    },
    onDamageGoods() {
      this.takeWrong = false;
      this.expressNot = false;
      this.damageGoods = true;
      this.otherQuestion = false;
      this.refundReason = 'DEFECTIVE_PRODUCT';
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
.icon-roundclose {
  font-size: 18px;
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
  position: fixed;
  bottom: 0;
  padding: 0 15px;
  width: 100%;
  left: 0px;
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
      max-width: 80px;
      max-height: 88px;
      margin-right: 10px;
    }
  }
  &__btn {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  }
  &__prompt {
    font-size: 12px;
    color: #999999;
    display: flex;
    align-items: center;
  }
}
</style>
