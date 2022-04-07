<template>
    <div class="center-vertical bg-light">
        <div class="col-12 col-lg-4 mb-4 mb-lg-0">
            <h1>
                Contact Us
            </h1>
        </div>
        <div v-if="submitted">
            <h2>Thank you for your response!</h2>
            <h3>
                We'll contact you as shortly as possible through your email! =)
            </h3>
        </div>
        <div class="col-12 col-lg-1" v-else>
            <form>
                <div>
                    <label>Username</label>
                    <input v-model="username" />
                </div>
                <div>
                    <label>Email</label>
                    <input v-model="email" />
                </div>
                <div>
                    <label>Message</label>
                    <textarea v-model="message"></textarea>
                </div>

                <button type="submit" @click="submit()">submit</button>
                <button type="reset" @click="reset()">reset</button>
            </form>
        </div>
    </div>
</template>

<script>
import { addDoc, getFirestore, collection } from 'firebase/firestore';
import firebaseApp from '../firebase';

const db = getFirestore(firebaseApp);

export default {
    name: 'App',
    data() {
        return {
            submitted: false,
            username: '',
            email: '',
            message: '',
        };
    },
    methods: {
        reset() {
            this.username = '';
            this.email = '';
            this.message = '';
        },
        async submit() {
            if (
                this.username === '' ||
                this.email === '' ||
                this.message === ''
            ) {
                alert('Please fill up all of the fields');
                return;
            }
            this.submitted = true;
            await addDoc(collection(db, 'ContactUs'), {
                username: this.username,
                email: this.email,
                message: this.message,
            })
                .then(() => {
                    console.log('Message Sent!');
                })
                .catch(() => {
                    alert('Error');
                });
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;900&display=swap');

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

h1,
label,
button,
h2,
h3 {
    color: #16c79a;
}

h1,
label,
button,
textarea {
    font-family: 'Montserrat', sans-serif;
}

h1,
h2,
label,
button {
    font-weight: 900;
}

h3 {
    font-weight: 300;
}

textarea,
input {
    color: #19456b;
    font-weight: 300;
}

form {
    width: 100%;
    padding: calc(5% + 30px) 0px;
}

textarea {
    width: 300px;
    height: 200px;
}

button {
    border: 0px;
    letter-spacing: 0;
}
button:hover,
button:active {
    transform: scale(1.2);
    letter-spacing: 5px;
}

button:after,
button:before {
    backface-visibility: hidden;
    border: 1px solid #fff;
    bottom: 0px;
    content: '';
    display: block;
    margin: 0 auto;
    position: relative;
    transition: all 280ms ease-in-out;
    width: 0;
}

button:hover:after {
    backface-visibility: hidden;
    border-color: #19456b;
    transition: width 350ms ease-in-out;
    width: 70%;
}

button:hover:before {
    backface-visibility: hidden;
    border-color: #fff;
    transition: width 350ms ease-in-out;
    width: 70%;
}
button:hover:before {
    bottom: auto;
    top: 0;
    width: 70%;
}
</style>
