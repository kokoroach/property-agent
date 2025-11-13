<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                v-model="formData.firstName"
                required
            />
        </div>

        <div>
            <label for="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                v-model="formData.lastName"
                required
            />
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required />
        </div>

        <div>
            <label for="mobileNumber">Mobile Number:</label>
            <input
                type="text"
                id="mobileNumber"
                v-model="formData.mobileNumber"
                required
            />
        </div>

        <button type="submit">Submit</button>

        <p v-if="message" :class="{ error: isError }">{{ message }}</p>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Agent from "./interface/agent.ts";

const formData = ref<Agent>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
});

const message = ref("");
const isError = ref(false);

const _resetForm = (form) => {
    for (const key in form.value) {
        form.value[key] = "";
    }
};

const handleSubmit = async () => {
    message.value = "";
    isError.value = false;

    const agentsAPI = "http://localhost:3000/api/v1/agents";
    try {
        const response = await fetch(agentsAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.value),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        message.value = `Agent created successfully with ID: ${data.id}`;
        console.log(data);

        _resetForm(formData);
    } catch (err) {
        console.error(err);
        isError.value = true;
        message.value = "Failed to submit form";
    }
};
</script>

<style scoped>
.error {
    color: red;
}
</style>
