<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>
                    <div class="card-body">
                        <!-- Second Alert -->
                        <div
                            v-if="user"
                            class="alert alert-success"
                            role="alert"
                        >
                            You are Not logged in!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: 'user',
        }),
    },
    components: {},
};
</script>

<style lang="scss" scoped></style>
