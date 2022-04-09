<template>
    <div class="contact-us-view">
        <div class="contact-us-container">
            <div class="contact-header">
                <h1>
                    Contact Us
                </h1>
                <h5>Ask us anything!</h5>
            </div>
            <div v-if="submitted">
                <h2>Thank you for your response!</h2>
                <h3>
                    We'll contact you as shortly as possible through your email!
                    =)
                </h3>
            </div>
            <div class="fill-in-details-form" v-else>
                <form class="details-form">
                    <div class="details-row">
                        <label>Name</label>
                        <br />
                        <input
                            v-model="username"
                            placeholder=" Enter name"
                            class="contact-form-field"
                        />
                    </div>
                    <br />
                    <div class="details-row">
                        <label>Email</label>
                        <br />
                        <input
                            v-model="email"
                            placeholder=" Enter email"
                            class="contact-form-field"
                        />
                    </div>
                    <br />
                    <div class="details-row">
                        <label>Message</label>
                        <br />
                        <textarea
                            v-model="message"
                            placeholder=" Hey PartyQuest, I would like to know more about..."
                            class="contact-form-field"
                        ></textarea>
                    </div>
                    <br />
                    <div class="bottom-btns">
                        <button type="submit" @click="submit()">Submit</button>
                        <button type="reset" @click="reset()">Reset</button>
                    </div>
                </form>
            </div>
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

.fill-in-details-form {
    align-items: center;
}

.details-form {
}

.details-row {
    font-size: 0.825rem;
    width: 100%;
}

.contact-header {
    margin-inline-start: 48px;
    margin-inline-end: 48px;
}

.contact-us-view {
    display: flex;
    justify-content: center;
}

.contact-form-field {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background: #ffffff;
    color: #2e323c;
    width: 350px;
}

.contact-us-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    display: flex;
    align-items: center;
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
textarea,
h4 {
    font-family: 'Montserrat', sans-serif;
}

h1,
h2,
label,
button {
    font-weight: 500;
}

h3 {
    font-weight: 200;
}

textarea,
input {
    color: #19456b;
    font-weight: 300;
    width: 300px;
}

/* form {
    width: 100%;
    padding: calc(5% + 30px) 0px;
} */

textarea {
    width: 350px;
    height: 200px;
}

button {
    border: 0px;
    letter-spacing: 0;
}
/* button:hover,
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
} */

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

.bottom-btns {
    display: flex;
    justify-content: flex-end;
}
</style>
