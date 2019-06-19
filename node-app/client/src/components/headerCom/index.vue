<template>
    <div class="header">
        <el-row>
           <el-col :span="12">
               <div class="logo">
                   后台管理系统
               </div>
           </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:'headerCom',

    }
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #000;
    padding: 0 20px;
    .logo{
        font-size: 30px;
        color: #fff;
    }
}
</style>