<template>
    <div>
        这个是默认框架
    </div>
</template>

<script>
    export default {
        name:'layout',
        created(){
            this.$store.dispatch('InfoList').then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>