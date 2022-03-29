<template>
    <div id="party-quest-list">
        <ul
            id="v-for partyquests"
            style="list-style-type: none"
            text-align:left
        >
            <!-- <li v-for="(value, index) in listdata" :key="index">
                {{ value }}
            </li> -->
            <li v-for="(value, index) in partyQuestData" :key="index">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ index + 1 }}. {{ value.title }}
                        </h5>
                        <p class="card-text-brand">
                            Brand Name: {{ value.brand }}
                        </p>
                        <p class="card-text-totalAmount">
                            Amount: {{ value.totalAmount }}
                        </p>
                        <p class="card-text-status">
                            Status {{ value.status }}
                        </p>
                        <a v-bind:href="value.itemLink" class="card-link"
                            >Item Link</a
                        >
                    </div>
                </div>
                <!-- {{ value.totalAmount }} -->
            </li>
        </ul>
    </div>
</template>

<script>
// console.log('passing data into partyquestlist');
export default {
    props: {
        partyQuestData: {
            type: Array,
        },
    },
    // ['partyQuestData'],
};
</script>

<style></style>
