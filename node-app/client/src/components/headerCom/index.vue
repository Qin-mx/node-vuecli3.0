<template>
    <div class="header">
        <el-row>
           <el-col :span="6">
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
    background: $HEAD_BG;
    color: #fff;

}
</style>