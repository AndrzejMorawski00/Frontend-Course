<template>
    <button class="task__button task__remove" @click="onClick()">{{ text }}</button>
</template>

<script lang="ts">

import { defineComponent } from "vue"
//Export Component
export default defineComponent({
    name: "ToDoButton",
    props: {
        text: String,
        color: String,
    },
    methods: {
        onClick() {
            this.$emit("btn-click", this.text)
        },
    },
    emits: ["btn-click"],
})
</script>
