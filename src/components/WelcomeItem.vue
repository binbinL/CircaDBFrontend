<template>
    <div id="app">
        <el-container class="full-height">
            <el-header class="header">Header</el-header>
            <el-container class="main-container">
                <el-aside class="aside">Aside</el-aside>
                <el-main class="main">Main</el-main>
            </el-container>
            <el-footer class="footer">Footer</el-footer>
        </el-container>
    </div>
</template>

<script>

</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.full-height {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.header, .footer {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
}

.main-container {
    flex: 10;
    display: flex;
    background-color: #e9ecef;
}

.aside {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d1d5da;
}

.main {
    flex: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
}

.footer {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dee2e6;
}
</style>