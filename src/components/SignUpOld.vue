<template>
    <div class="container">
            <form id="myform">
                <h2>Sign Up for Free!</h2>

                <div class="formli">
                    <label for ="username"> Username: (*)</label>
                    <input type="text" id="username" required="" placeholder="Enter your Username"> <br><br>

                    <label for ="password"> Password: (*)</label>
                    <input type="text" id="password" required="" placeholder="Enter your Password"> <br><br>

                    <label for ="email"> Email: (*)</label>
                    <input type="text" id="email" required="" placeholder="Enter your Email"> <br><br>

                    <label for="fname">First Name:</label>
                    <input type="text" id="fname" placeholder="Enter your First Name"> <br><br>

                    <label for="lname">Last Name:</label>
                    <input type="text" id="lname" placeholder="Enter your Last Name"> <br><br>

                    <label for="phonenumber">Phone Number:</label>
                    <input type="number" id="phonenumber" placeholder="Enter your Number"> <br><br>

                    <label for ="bankaccount"> Bank Account Number:</label>
                    <input type="text" id="bankaccount" placeholder="Enter your Bank Account Number"> <br><br>

                    <label for ="address"> Address:</label>
                    <input type="text" id="address" placeholder="Enter your Address"> <br><br>

                    <label for ="picture"> Profile Picture:</label>
                    <input type="file" id="picture" accept="image/*"> <br><br>

                    <div class = "save">
                        <button id="savebutton" type="button" v-on:click="savetofs()"> Confirm</button>
                    </div>
                </div>        
            </form>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async savetofs() {
            var a = document.getElementById("fname").value
            var b = document.getElementById("lname").value
            var c = document.getElementById("phonenumber").value
            var d = document.getElementById("bankaccount").value
            var e = document.getElementById("username").value
            var f = document.getElementById("password").value
            var g = document.getElementById("email").value
            var h = document.getElementById("address").value
            var i = document.getElementById("picture").value

            try{
                const docRef = await setDoc(doc(db, "Users",e),{
                    First_Name: a, Last_Name: b, Phone_Number: c, Bank_Account: d, Username: e, Password: f, Email: g, Address:h})
                console.log(docRef)
                document.getElementById('myform').reset();
                this.$emit("added")
                alert(" Saving New User : " + e)
                }
            catch(error){
                console.error("Error adding document: ", error);
                alert("Please fill in valid details")
            }
            }
    }
}
</script>

<style scoped>
h2 {
    background-color: rgb(129, 184, 99);
}
.formli {
    display: inline-block;
    text-align: right;
}

form {
    text-align: center;
    align-items: center;
    margin: auto;
}

input:hover {
  box-shadow: 3px 3px purple;
  border-radius: 2px;
}

.save {
    text-align: center;
}
</style>