<template>
    <div class="container">
        <section class="pt-7">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 text-end">
                        <img
                            class="pt-7 pt-md-0 img-fluid"
                            src="../assets/PartyQuest_Logo.png"
                            alt=""
                        />
                    </div>
                    <div class="col-md-6 text-md-start text-center py-6">
                        <p class="mb-6 lead text-secondary">
                            Connect with strangers online to make
                            <br class="d-none d-xl-block" />secure purchases in
                            one place. <br class="d-none d-xl-block" />
                            Create your own PartyQuest today!
                        </p>
                        <div class="col-12 col-lg-12">
                            <p>
                                Spotify - Netflix - Disney+,
                            </p>
                            <p>
                                LoveBonito - MyProtein
                            </p>
                            <div class="row align-items-center">
                                <div id="app" class="row">
                                    <div class="col-12 col-md-4 mb-2 mb-md-0">
                                        <div class="box">
                                            <font-awesome-icon
                                                icon="fa fa-users mb-3"
                                            />
                                            <h4 class="mb=0">
                                                Start a PartyQuest with
                                                strangers!
                                            </h4>
                                            <!-- <p class="mb-0">600+</p> -->
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 mb-2 mb-md-0">
                                        <div class="box">
                                            <font-awesome-icon
                                                icon="fa-solid fa-truck-fast mb-3"
                                            />
                                            <h4 class="mb=0">
                                                Order and Receive your Item!
                                            </h4>
                                            <!-- <p class="mb-0">1000+</p> -->
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 mb-2 mb-md-0">
                                        <div class="box">
                                            <font-awesome-icon
                                                icon="fa-solid fa-handshake mb-3"
                                            />
                                            <h4 class="mb=0">
                                                Complete your PartyQuest
                                            </h4>
                                            <!-- <p class="mb-0">200+</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'MyPQPage',
    components: {},
};
</script>

<style scoped>
.container {
    backdrop-filter: blur(4px);
}
.box {
    background-color: #6495ed;
    color: #fff;
    text-align: center;
    padding: 20px 0px;
    position: relative;
    overflow: hidden;
}

.box font-awesome-icon {
    font-size: 42px;
}

.box h4 {
    font-size: 14px;
    font-weight: 900;
}

.box p {
    font-size: 22px;
}

.box::after,
.box::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #fff5;
    border-radius: 50%;
    transition: transform 0.3s;
}

.box::after {
    left: -50px;
    top: -50px;
}

.box::before {
    right: -50px;
    bottom: -50px;
}

.box:hover::after,
.box:hover::before {
    transform: scale(1.2);
}

h5 {
    margin-top: 100px;
}
</style>
