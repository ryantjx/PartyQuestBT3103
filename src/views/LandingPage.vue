<template>
    <div class="container">
        <NavBar />
        <section class="pt-7">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 text-md-start text-center py-6">
                        <h1 class="mb-4 fs-9 fw-bold">
                            PartyQuest
                        </h1>
                        <p class="mb-6 lead text-secondary">
                            Connect with strangers online to make
                            <br class="d-none d-xl-block" />secure purchases in
                            one place! <br class="d-none d-xl-block" />
                            Create your own PartyQuest Today!
                        </p>
                        <!-- <div class="text-center text-md-start">
                            <a
                                class="btn btn-warning me-3 btn-lg"
                                href="#!"
                                role="button"
                                >Get started</a
                            ><a
                                class="btn btn-link text-warning fw-medium"
                                href="#!"
                                role="button"
                                data-bs-toggle="modal"
                                data-bs-target="#popupVideo"
                                ><span class="fas fa-play me-2"></span>Watch the
                                video
                            </a>
                        </div> -->
                    </div>
                    <div class="col-md-6 text-end">
                        <img
                            class="pt-7 pt-md-0 img-fluid"
                            src="../assets/PartyQuest_Logo.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavBar from '../components/Navbar.vue';
export default {
    name: 'MyPQPage',
    components: {
        NavBar,
    },
};
</script>
