<template>
    <div class="header">
        <div class="float-left-child">
            <div class="combine">
                <img src="../../assets/logo.png" alt="" />
                <div class="title">
                    <h1>PQ title here</h1>
                </div>
            </div>
        </div>
        <div class="float-left-child2">
            <h3 class="completion">Completion status here</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PqHeader',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');

.header {
    display: flex;
    padding-inline-start: 100px;
    padding-inline-end: 100px;
    font-family: 'PT Serif', serif;
}

.title {
    padding-inline-start: 60px;
    padding-block-start: 60px;
}

.combine {
    display: flex;
}

.float-left-child {
    flex: 1;
    text-align: end;
}

.float-left-child2 {
    flex: 1;
    text-align: end;
    padding-block-start: 60px;
}

.completion {
    background-color: purple;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px 8px;
}
</style>
