<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="pt-3">Top Categories</h2>
            </div>
        </div>
        <div class="row">
            <div
                v-for="(value, index) in partyQuestData"
                :key="index"
                class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
            >
                <div class="card h-100 w-100">
                    <div class="embed-responsive embed-responsive-16by9">
                        <!-- <div v-if:"{value.image}">
                            <h1> There is not image in the values
                            </div> -->
                        <img
                            class="card-img-top embed-responsive-item"
                            :src="value.imageUrl"
                        />
                        <!-- <p>{{ value.image }}</p> -->
                        <!-- <img v-bind:href="value.image" /> -->
                        <!-- <img
                            class="card-img-top embed-responsive-item"
                            src="require(${value.image})"
                            alt="Card image
                        cap"
                        /> -->
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ value.title }}</h5>
                        <p class="card-text">
                            {{ value.description.substring(0, 65) }}...
                        </p>
                        <!-- <router-link
                :to="{ name: 'EditProduct', params: { id: product.id } }"
            >
                <button class="btn btn-primary">Edit</button>
            </router-link> -->
                        <button class="btn btn-primary">Join Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        partyQuestData: {
            type: Array,
        },
    },
    mounted() {
        console.log('Data passed into the component', this.partyQuestData);
    },
};
</script>
<style scoped>
.card-img-top {
    object-fit: cover;
}
</style>
