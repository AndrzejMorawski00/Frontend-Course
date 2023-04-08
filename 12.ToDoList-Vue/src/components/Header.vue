<template>
    <div class="header">
        <h1 class="header__h1">ToDo List</h1>
        <div class="input">
            <input v-model="name" type="text" class="input__input" />
            <button @click="createTask" class="header__button input__button">Add</button>
        </div>
        <div class="remove">
            <button @click="removeAll" class="header__button remove__remove">Remove All</button>
        </div>
        <p class="header__paragraph">Tasks Left: {{ taskLeft }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

//Export Component
export default defineComponent({
    name: "Header",
    props: {
        taskLeft: Number,
    },
    setup() {
        const name = ""
        return { name }
    },
    methods: {
        createTask() {
            if (!this.name) {
                return
            }
            const newTask = {
                id: Math.floor(Math.random() * 1_000_000),
                name: this.name,
                is_done: false,
            }

            this.$emit("create-task", newTask)
            this.name = ""
        },
        removeAll() {
            this.$emit("remove-all")
        },
    },
    emits: ["create-task", "remove-all"],
})
</script>
