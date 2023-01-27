<template>
    <div class="admin-info">
        <div class="info-product__wrapper">
            <div class="info-product__card">
                <h3>Products</h3>
                <p>{{ statisticProduct }}</p>
                <span>Barcha Mahsulotlar soni</span>
            </div>
            <div class="info-product__card">
                <h3>Users</h3>
                <p>{{ statisticUser }}</p>
                <span>Barcha Userlar soni</span>
            </div>
        </div>
        <div id="chart">
            <apexchart type="line" height="550" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import api from '../../../api/api'
export default {
    name:"AdminMain",
    async mounted(){
        await store.dispatch("auth/getUsersStatistic")
        await store.dispatch("product/getProductsStatistic")
        await this.getAllPurchases()
    },
    computed:{
        statisticUser(){
            return store.state.auth?.statisticUsers
        },
        statisticProduct(){
            return store.state.product?.statisticsProducts
        }
    },
    methods:{
        async getAllPurchases(){
            try{
                // var categories = [];
                // var quantity = [];
                const { data: purchases } = await api.get("/purchase/all");
                if(purchases.success){
                    const configPurchase = await purchases?.purchased.map(purchase => {
                        return{
                            categories: purchase?.createdAt,
                            quantity: purchase?.quantity
                        }
                    })
                    
                    await configPurchase.forEach(item => {
                        this.chartOptions.xaxis.categories.push(item.categories)
                        this.series[0].data.push(item.quantity)
                    })

                    console.log(this.chartOptions.xaxis.categories)
                    
                    // this.series[0].data = await quantity
                    // this.chartOptions.xaxis.categories = await categories
                    // console.log(this.chartOptions.xaxis.categories)
                }
            }catch(err){
                store.dispatch("toast/error", {
                    title: err.name,
                    message: err.response.data,
                });           
            }
        }
    },
    data(){
        return{
            series: [{
                name: "Desktops",
                data: [20]
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Sold by Date',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    type:'datetime',
                    categories: ["2023-01-27T15:23:20.954Z"]
                }
            }, 
        }
    }
}
</script>

<style scoped>
.info-product__card{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px;
    box-shadow: 0px 8px 16px -2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    margin-bottom: 32px;
}
.info-product__card h3{
    color: #242625;
}
.admin-info{
}
.info-product__wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
.info-product__card p{
    color: #0F6CB0;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    margin: 34px 0;
}
.info-product__card span{
    color: #AFB3B3;
}
</style>