<template>
    <div>
        <div class="container">
            <form id="pqDetails">
                <h1 class="detailsheader">PartyQuest Details</h1>
                <div class="main">
                    <div class="pqdetailslist">
                        <br />
                        <label class="fieldName"> <h3>Brand:</h3></label>
                        <br />
                        <label class="field"><h5>MP</h5></label>

                        <br /><br />
                        <label class="fieldName"><h3>Total Amount:</h3></label>
                        <br />
                        <label class="field"><h5>250</h5></label>

                        <br /><br />
                        <label class="fieldName"><h3>End Date:</h3></label>
                        <br />
                        <label class="field"><h5>26/02/2022</h5></label>

                        <br /><br />

                        <label class="fieldName"
                            ><h3>Collection Location:</h3></label
                        >
                        <br />
                        <label class="field"><h5>Pasir Ris</h5></label>
                    </div>
                    <div class="pqdetailslist2">
                        <br />
                        <label class="fieldName"><h3>Creator:</h3></label>
                        <br />
                        <label class="field"><h5>ryanng</h5></label>

                        <br /><br />

                        <label class="fieldName"><h3>Website:</h3></label>
                        <br />
                        <label class="field"><h5>google.com</h5></label>

                        <br /><br />
                        <label class="fieldName"><h3>Description:</h3></label>
                        <br />
                        <label class="field"><h5>5kg protein</h5></label>

                        <br /><br />

                        <label class="fieldName"><h3>Misc:</h3></label>
                        <br />
                        <label class="field"
                            ><h5>{{ id }}</h5></label
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Details',
    data() {
        return {
            id: this.$route.params.id,
        };
    },
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');
.detailsheader {
    /* font-family: 'Oswald', sans-serif; */
    font-family: 'PT Serif', serif;
}
.pqdetailslist {
    /* text-align: center;
    align-items: center; */
    margin: auto;
}

.pqdetailslist2 {
    /*text-align: center;
    align-items: center; */
    margin: auto;
    vertical-align: middle;
}

.main {
    display: flex;
    align-content: center;
}

.field {
    padding-inline-start: 8px;
    width: 100%;
    /* background: lightgrey; */
    border-radius: 8px 8px;
    padding-inline-end: auto;
    font-family: 'PT Serif', serif;
}

.fieldName {
    width: 100%;
    font-family: 'PT Serif', serif;
}
</style>
