<template>
  <div class="inner-product">
    <div class="inner-product__features">
      <div class="inner-product__image">
        <Splide
        aria-labelledby="thumbnail-example-heading"
        :options="mainOptions"
        class="main-carousell"
        ref="main"
        >
        <SplideSlide v-for="slide in 8" :key="slide.alt">
          <img :src="`https://source.unsplash.com/random/800x450?sig=${slide}`" alt="slide.alt">
        </SplideSlide>
      </Splide>
      
      <Splide
      aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
      :options="thumbsOptions"
      ref="thumbs"
      >
      <SplideSlide v-for="slide in 8" :key="slide.alt">
        <img :src="`https://source.unsplash.com/random/800x450?sig=${slide}`" alt="slide.alt">
      </SplideSlide>
    </Splide>
    <!-- <img :src="require('../../assets/naushnik.jpg')" :alt="product?.title"> -->
  </div>
  <div class="inner-product__right"> 
    <h2 class="inner-product__right-title">{{ product?.title }}</h2>
    <div class="product-price__brand">
      <div class="inner-product__price">
        <p class="product-price__title">Лучшая цена</p>
        <p class="product-price">{{ priceSpacer(product?.price) }} so'm</p>
        <p>Цены обновляются каждый день</p>
      </div>
      <div class="inner-product__brand">
        <div class="inner-product__check">
          <p>Brand</p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#6FCF97"/>
            <path d="M6.76855 10.0166L9.4846 12.3243L13.4846 7.32428" stroke="white"/>
          </svg>
        </div>
        <p class="product-brand">{{ productBrand?.name }}</p>
      </div>
    </div>
    <p class="product-description">{{ product?.text  }}</p>
    
    
    <div class="product-basket__wrapper">
      <p class="product-quantity">В наличии у {{ product?.quantity }} продавцов</p>
      <el-button class="product-basket" @click="addBasket(product)">Savatga</el-button>
    </div>
  </div>
</div>


<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
  <el-tab-pane label="Kommentlar" name="comment">
    <div class="inner-tab tab-comment">
      <div class="tab-comment-form">
        <div class="tab-comment__wrapper">
          <h2>Baholang</h2>
          <el-rate v-model="commentForm.rate" allow-half />
        </div>
        <textarea name="comment" id="comment" cols="30" rows="10" placeholder="Qo’shimcha izoh yozib qoldiring" v-model="commentForm.comment"></textarea>
        
        <el-button class="send-comment" @click="submitComment">
          Yuborish
        </el-button>
      </div>
      
      <ProductComment :review="review" v-for="(review, id) in productReviews" :key="id"/>
      
      <p class="again-product">Просмотреть ещё</p>
    </div>
  </el-tab-pane>
  <el-tab-pane label="Sharxlar" name="description">
    <div class="inner-tab">
      <p class="desc-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aperiam aliquam temporibus consequuntur ipsa, repellat veniam unde eaque culpa magni. Tempora cum natus adipisci dolorum beatae porro? Fuga, corporis porro impedit quas, omnis quo possimus eius harum minima cumque laborum. Perspiciatis consequatur dicta eum minus, dolore deserunt delectus tenetur similique unde, maiores quod maxime esse laborum harum quae obcaecati quas ut asperiores dignissimos sequi. Praesentium iste error quos quae, maxime pariatur ullam iusto ipsa blanditiis recusandae aperiam, officiis ea sed, unde totam et esse fugit consequuntur laborum eveniet deleniti? Nesciunt cupiditate voluptas quo perferendis. Dolorum illum error exercitationem omnis fugit recusandae vero, quasi doloribus assumenda consequatur similique odit repudiandae magni? Nisi cumque reiciendis culpa veniam. Sint laboriosam vel nobis unde id inventore mollitia nihil voluptates! Dolor architecto tenetur totam inventore dolore libero, possimus assumenda velit illum neque atque. Unde cupiditate distinctio illum consectetur itaque! Mollitia laboriosam commodi voluptate perspiciatis nihil tempora doloribus, laborum et quibusdam consectetur in modi fugiat molestias aperiam eos id culpa ratione maiores earum quod nostrum. Ratione aliquam eaque corrupti neque laboriosam itaque quo dignissimos quos eveniet sequi. Eos id nam consectetur. Qui iste aperiam dolores atque soluta quasi deleniti, est nostrum ullam veritatis ipsum reprehenderit. Earum, asperiores deleniti magni alias corporis porro saepe molestiae maxime enim quod est cum reprehenderit autem adipisci recusandae. Voluptates explicabo eaque iste reprehenderit! Officia sit harum nihil amet neque sint esse accusamus? Saepe fugit asperiores doloribus consectetur porro culpa, dignissimos architecto labore aliquam praesentium modi nemo atque maxime optio? Commodi vero nesciunt omnis fugiat, repellat eaque illo quasi pariatur asperiores earum id placeat doloremque exercitationem est porro, maiores, eveniet quaerat ducimus ex ad quisquam! Placeat explicabo minima officiis labore rerum, nulla ut ducimus aliquam illum natus necessitatibus obcaecati animi cupiditate, sapiente doloremque? Magnam optio minus necessitatibus sit odit vero in cum?</p>
    </div>
  </el-tab-pane>
</el-tabs>
</div>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import priceSpacer from '../../helpers/price.spaces';
import ProductComment from './ProductComment.vue'
import { computed, onMounted, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore()
const activeName = ref('comment')

const main   = ref();
const thumbs = ref();

const commentForm = reactive({
  rate:'',
  comment:'',
  user_id:'',
  product_id:''
})
const thumbsOptions = reactive({
  type        : 'slide',
  rewind      : true,
  gap         : '1rem',
  pagination  : false,
  fixedWidth  : 135,
  fixedHeight : 70,
  cover       : true,
  focus       : 'center',
  isNavigation: true,
  updateOnMove: true,
})

const mainOptions = reactive({
  type      : 'loop',
  perPage   : 1,
  perMove   : 1,
  gap       : '1rem',
  pagination: false,
})

onMounted( () => {
  const thumbsSplide = thumbs.value?.splide;
  if ( thumbsSplide ) {
    main.value?.sync( thumbsSplide );
  }
});

const addBasket = (product) => {
  store.dispatch("basket/addBasket", product)
}
const submitComment = async () => {
  const productId = await store.state.product?.product?._id;
  const user_id = await JSON.parse(localStorage.getItem("users"));
  const isUser = await !!localStorage.getItem("users");
  
  if(!isUser){
    store.dispatch("toast/error", { title: "Ro'yxatdan o'tilmagan", message: "Iltimos, izoh qoldirish uchun ro'yxatdan o'ting!"});
    return;
  }
  const comment = {
    rate:commentForm.rate,
    text: commentForm.comment,
    product_id:productId,
    user_id:user_id?._id
  }
  
  await store.dispatch("review/postReview", comment)
  
  commentForm.comment = ''
  commentForm.rate = 0
}
const handleClick = (tab, event) => {
  console.log(tab, event)
}
// const truncate = (value, lengths) => {
//   const val = value.split("")
//   if (val.length > lengths) {
//     return value.substring(0, lengths) + "...";
//   } else {
//     return value;
//   }
// }
const product = computed(() => {
  return store.state.product.product
})
const productReviews = computed(() => {
  return store.state.product.productReviews
})
const productBrand = computed(() => {
  return store.state.product.brand
})
</script>

<style>
.inner-product .main-carousell{
  margin-bottom: 16px;
}
.inner-product .inner-product__image{
  margin-right: 30px;
  border-radius: 24px;
  max-width: 600px;
}
.inner-product .inner-product__image img{
  width: 600px !important;
  height: 480px !important;
  border-radius: 18px;
}
.inner-product .inner-product__features{
  padding: 40px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.inner-product .inner-product__right{
  display: flex;
  align-items: baseline;
  flex-direction: column;
}
.inner-product .inner-product__right-title{
  margin-bottom: 16px;
}
.inner-product .inner-product__right h2{
  font-weight: 400;
  font-size: 28px;
  line-height: 48px;
}
.inner-product .inner-product__price p{
  text-align: left;
}
.inner-product .inner-product__brand{
  border: 1px solid #E3E6E6;
  border-radius: 12px;
  padding: 12px;
  width: 180px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}
.inner-product .product-price__title{
  color: rgb(112, 0, 255);
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
.inner-product .product-price{
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
}
.inner-product .product-price__brand{
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  align-items: baseline;
  width: 100%;
}
.inner-product .inner-product__check{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}
.inner-product .inner-product__check p{
  color: #AFB3B3;
}
.inner-product .product-description{
  text-align: left;
  color: #707373;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 32px;
}
.inner-product .product-brand{
  color: #4A4D4D;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
.inner-product .product-quantity{
  color: rgb(112, 0, 255);
  text-align: left;
}
.inner-product .product-basket__wrapper{
  margin-top: auto;
}
.inner-product .product-basket{
  background: rgb(112, 0, 255);
  border-radius: 12px;
  color: #fff;
  padding: 20px 0;
  width: 320px;
  border: 2px solid rgb(112, 0, 255);
}
.inner-product .product-basket:hover{
  background: #fff;
  border: 2px solid rgb(112, 0, 255);
  color: rgb(112, 0, 255);
}
.inner-product .demo-tabs > .el-tabs__content {
  font-size: 18px;
  font-weight: 600;
}

.inner-product .tab-comment{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.inner-product .el-rate__icon{
  font-size: 28px !important;
}
.inner-product .inner-tab{
  background: #FAFAFA;
  padding: 24px;
}
.inner-product .tab-comment__wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 48px;
}
.inner-product .el-icon{
  width: 1.3em;
}
.inner-product .inner-tab h2{
  margin-bottom: 16px;
}
.inner-product .tab-comment textarea{
  padding: 10px;
  background: #FAFBFB;  
  border: 1.14286px solid #C8CCCC;
  border-radius: 6.85714px;
  width: 600px;
  margin-bottom: 32px;
}
.inner-product .tab-comment .send-comment{
  background: rgb(112, 0, 255);
  border-radius: 12px;
  color: #fff;
  padding: 20px 0;
  width: 200px;
  border: 2px solid rgb(112, 0, 255);
}
.inner-product .tab-comment .send-comment:hover{
  background: #fff;
  border: 2px solid rgb(112, 0, 255);
  color: rgb(112, 0, 255);
}
.inner-product .tab-comment-form{
  display: flex;
  flex-direction: column;
  margin-bottom: 68px;
}
.inner-product .again-product{
  color: rgb(112, 0, 255);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  align-self: center;
  cursor: pointer;
}
.inner-product .desc-para{
  text-align: left;
  color: #707373;
}
.inner-product .product-quantity{
  margin-bottom: 32px;
}


@media screen  and (max-width: 1040px) {
  .inner-product .inner-product__image img{
    width: 600px !important;
    height: 400px !important;
  }
  .inner-product .inner-product__features{
    grid-template-columns: 1fr;
  }
  .inner-product .product-quantity{
    margin-bottom: 0;
    margin-left: 36px;
  }
  .inner-product .product-basket__wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    padding-right: 30px;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background: #fff;
    width: 97%;
    left: 0;
    box-shadow: 0 -1px 3px 0 rgb(0 0 0 / 10%), 0 -1px 2px 0 rgb(0 0 0 / 20%);
  }
}

@media screen  and (max-width:700px){
  .inner-product .tab-comment textarea{
    width: 385px;
  }
  .inner-product .inner-product__image img{
    width: 500px !important;
    height: 300px !important;
    object-fit: contain;
  }
  .inner-product .product-price{
    font-size: 30px;
    line-height: 42px;
  }
}
@media screen  and (max-width:580px){
  .inner-product .inner-product__image img{
    width: 400px !important;
    height: 400px !important;
  }
  .inner-product .product-price__brand{
    flex-direction: column;
  }
  .inner-product .inner-product__price{
    margin-bottom: 16px;
  }
  .inner-product .tab-comment textarea{
    width: 300px;
  }
  .product-basket{
    width: 160px !important;
  }
  .inner-product__right{
    max-width: 400px;
  }
}

</style>