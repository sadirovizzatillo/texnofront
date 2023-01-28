<template>
    <apexchart type="line" height="550" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import store from '@/store';
import api from '../../../api/api';
export default {
     mounted(){
        this.getAllStatisticChart()
    },
    methods:{
        async getAllStatisticChart(){
            try{
                const { data: users } = await api.get("/auth/users/chart");
                if(users.success){
                    const configUsers = await users?.user.map(user => {
                        return{
                            categories: user?.createdAt,
                            quantity: user?.quantity
                        }
                    })
                    
                    await configUsers.forEach(item => {
                        this.chartOptions.xaxis.categories.push(item.categories)
                        this.series[0].data.push(item.quantity)
                    })                    
                }
            }catch(err){
                store.dispatch("toast/error", {
                    title: err.name,
                    message: err.response,
                });           
            }
        }
    },
    data(){
        return{
            series: [{
                name: "Desktops",
                data: []
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
                    text: 'Users visit per Day',
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
                    categories: []
                }
            }, 
        }
    }
}
</script>

<style>

</style>