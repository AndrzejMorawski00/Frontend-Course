<template>
    <li :class="task.is_done ? 'task--completed task' : 'task'">
        <p class="task__name">{{ task.name }}</p>
        <ToDoButton @btn-click="getButtonValue" :text="task.is_done ? 'Revert' : 'Done'" />
        <ToDoButton @btn-click="getButtonValue" :text="'Remove'" />
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import IToDo from "../types/IToDo"

//Import Components
import ToDoButton from "./ToDoButton.vue"

//Export Component
export default defineComponent({
    name: "ToDo",
    props: {
        task: {
            type: Object as PropType<IToDo>,
            required: true,
        },
    },

    components: {
        ToDoButton,
    },
    methods: {
        getButtonValue(message: string) {
            if (message === "Remove") {
                this.$emit("removeTask", this.task.id)
            } else {
                this.$emit("switchDone", this.task.id)
            }
        },
    },
})
</script>
