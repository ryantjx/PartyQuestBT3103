<template>
    <div class="center-vertical bg-dark">
        <div class="about-us-section bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-6 mb-4 mb-lg-0">
                        <div class="img-head">
                            <img
                                id="friends-laughing"
                                src="../assets/aboutus-friends.jpg"
                                alt="friends-laughing"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <h2 class="text-head">
                            KNOW MORE ABOUT US
                        </h2>
                        <div class="break-small mb-2"></div>
                        <p class="text-para">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                        <div id="app" class="row">
                            <div id="app" class="col-12 col-md-4 mb-2 mb-md-0">
                                <div class="box">
                                    <font-awesome-icon
                                        icon="fa fa-users mb-3"
                                    />
                                    <h4 class="mb=0">TOTAL CLIENTS</h4>
                                    <p class="mb-0">999</p>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-2 mb-md-0">
                                <div class="box">
                                    <font-awesome-icon
                                        icon="fa-solid fa-truck-fast mb-3"
                                    />
                                    <h4 class="mb=0">TOTAL CLIENTS</h4>
                                    <p class="mb-0">999</p>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-2 mb-md-0">
                                <div class="box">
                                    <font-awesome-icon
                                        icon="fa-solid fa-handshake mb-3"
                                    />
                                    <h4 class="mb=0">TOTAL CLIENTS</h4>
                                    <p class="mb-0">999</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-12">
                            <h5>FEATURING YOUR FAVORITE BRANDS</h5>
                            <p>
                                Spotify - Netflix - Disney+,
                            </p>
                            <p>
                                LoveBonito - MyProtein
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;900&display=swap');

h1,
h2,
h3,
h4,
h5,
h6,
a,
p {
    font-family: 'Montserrat', sans-serif;
}

h1,
h2,
h3,
h4 {
    font-weight: 900;
}

h5,
h6,
a,
p {
    font-weight: 300;
}

:root {
    --colorOne: #19456b;
    --colorTwo: #16c79a;
}

.center-vertical {
    display: flex;
    width: 100%;
    min-height: 100vh;
    align-items: center;
}

.about-us-section {
    width: 100%;
    padding: calc(5% + 30px) 0px;
}

.about-us-section .img-head {
    position: relative;
    overflow: hidden;
}

.about-us-section .img-head img {
    width: 100%;
    transition: transform 0.3s;
}

.about-us-section .img-head:hover img {
    transform: scale(1.2);
}

#friends-laughing {
    width: 100%;
    height: 100%;
}

.about-us-section .text-head {
    font-size: 28px;
    color: #16c79a;
}

.about-us-section .break-small {
    width: 80px;
    height: 3px;
    background-color: #16c79a;
}

.about-us-section .text-para {
    font-size: 16px;
    color: #444;
}

.about-us-section .box {
    background-color: #16c79a;
    color: #fff;
    text-align: center;
    padding: 20px 0px;
    position: relative;
    overflow: hidden;
}

.about-us-section .box font-awesome-icon {
    font-size: 42px;
}

.about-us-section .box h4 {
    font-size: 14px;
}

.about-us-section .box p {
    font-size: 22px;
}

.about-us-section .box::after,
.about-us-section .box::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #fff5;
    border-radius: 50%;
    transition: transform 0.3s;
}

.about-us-section .box::after {
    left: -50px;
    top: -50px;
}

.about-us-section .box::before {
    right: -50px;
    bottom: -50px;
}

.about-us-section .box:hover::after,
.about-us-section .box:hover::before {
    transform: scale(1.2);
}

h5 {
    margin-top: 100px;
}
</style>
