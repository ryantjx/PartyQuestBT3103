<template>
    <div class="center-vertical">
        <div class="about-us-section ">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-6 mb-4 mb-lg-0">
                        <div class="img-head">
                            <img
                                id="friends-laughing"
                                src="../assets/collage1.jpg"
                                alt="friends-laughing"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <h2 class="text-head">
                            KNOW MORE ABOUT US
                        </h2>
                        <div class="break-small mb-2"></div>
                        <br />
                        <p class="text-para">
                            We are a group of highly motivated Year 2 Business
                            Analytics students at the National University of
                            Singapore!
                        </p>
                        <p>
                            We decided to create PartyQuest because we had
                            multiple instances where we chose not to buy an item
                            because the shipping was too expensive, or we were
                            unable to obtain the minimmum spending for
                            discounts.
                        </p>
                        <p>
                            Therefore, we would like to give people the power to
                            connect with people who want to make a group
                            purchase and save money!
                        </p>
                        <p>
                            PartyQuest is a work in progress, and we cannot wait
                            to show you our final product!
                        </p>
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
    --colorTwo: #6495ed;
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
    backdrop-filter: blur(4px);
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
    color: #6495ed;
    text-align: left;
}

.about-us-section .break-small {
    width: 80px;
    height: 3px;
    background-color: #6495ed;
}

.about-us-section .text-para {
    font-size: 16px;
    color: #444;
}

.about-us-section .box {
    background-color: #6495ed;
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
