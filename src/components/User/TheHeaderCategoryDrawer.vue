<template>
    <ul class="header-categories__list">
        <li class="header-categories__item"  v-for="(category, id) in categories" :key="id">
            <div class="header-real__categories">
                <div class="category-item__wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.75" fill-rule="evenodd" clip-rule="evenodd" d="M7.99963 3H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V3H16.0004C15.0882 4.21445 13.6358 5 12 5C10.3642 5 8.91184 4.21445 7.99963 3Z" fill="#1AB2FF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.89431 4.55279L4.99989 3V9.25L4.39431 9.55279C3.90033 9.79978 3.29966 9.59955 3.05267 9.10557L1.4471 5.89443C1.20011 5.40045 1.40034 4.79978 1.89431 4.55279ZM22.1053 4.55279L18.9998 3V9.25L19.6053 9.55279C20.0993 9.79978 20.7 9.59955 20.947 9.10557L22.5525 5.89443C22.7995 5.40045 22.5993 4.79978 22.1053 4.55279Z" fill="#1AB2FF"></path></svg>       
                    <p class="category-name">{{ category.name }}</p>
                </div>
                <svg data-v-45337954="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.64645 6.14455C9.84171 5.94929 10.1583 5.94929 10.3536 6.14456L15.8554 11.6465C16.0507 11.8417 16.0507 12.1583 15.8554 12.3536L10.3536 17.8555C10.1583 18.0507 9.84171 18.0507 9.64645 17.8555C9.45118 17.6602 9.45118 17.3436 9.64645 17.1483L14.7948 12L9.64644 6.85166C9.45118 6.6564 9.45119 6.33981 9.64645 6.14455Z" fill="#A0A2A7"></path>
                </svg>
            </div>
            <div class="header-subcategories">
                <div class="header-subcategories__header">
                    <h3>{{ category.name }}</h3>
                    <svg data-v-45337954="" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.64645 6.14455C9.84171 5.94929 10.1583 5.94929 10.3536 6.14456L15.8554 11.6465C16.0507 11.8417 16.0507 12.1583 15.8554 12.3536L10.3536 17.8555C10.1583 18.0507 9.84171 18.0507 9.64645 17.8555C9.45118 17.6602 9.45118 17.3436 9.64645 17.1483L14.7948 12L9.64644 6.85166C9.45118 6.6564 9.45119 6.33981 9.64645 6.14455Z" fill="#A0A2A7"></path>
                    </svg>
                </div>
                <div class="header-subcategories__wrapper" >
                    <div class="header-subcategories__item" v-for="(subs, id) in category.subcategories" :key="id">
                        <h3>{{ subs.name }}</h3>
                        <div>
                            <p>{{ subs.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { useStore} from 'vuex';
import { computed } from 'vue';
const store = useStore()

const categories = computed(() => {
    return store.state.category?.categoryWithSubs
})

</script>

<style scoped>
.header-categories__list{
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 100%;
}
.header-categories__list:hover ~ .header-subcategories{
    display: block;
}
.header-subcategories__wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
}
.header-categories__item{
    width: 100%;
}
.header-real__categories{
    border-right: 1px solid rgb(219, 201, 201);
    padding-right: 18px;
    display: flex;
    justify-content: space-between;
    width: 250px;
    margin-right: 24px;
    cursor: pointer;
    padding: 8px;
}
.header-real__categories:hover ~ .header-subcategories{
    display: block;
}

.header-real__categories:hover{
    background-color: rgba(49,49,196,0.1);
}

.header-real__categories:hover .category-name{
    color: blue;
}
.header-subcategories__item p{
    color: #27282a;
}

.header-subcategories{
    position: absolute;
    left: 280px;
    padding: 0 20px;
    top: 25px;
    width: 100%;
    text-align: left;
    display: none;
    height: 100%;
}
.header-subcategories__header{
    display: flex;
    align-items: center;
}
.header-subcategories:hover{
    display: block;
}
.category-name{
    font-weight: bold;
    font-size: 16px;
}
.category-item__wrapper{
    display: flex;
    align-items: center;
}
.category-item__wrapper p{
    margin-left: 8px;
}
</style>