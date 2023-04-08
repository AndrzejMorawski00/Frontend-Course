<template>
    <ul class="tasks">
        <ToDo @switch-done="$emit('switch-done', task.id)" @remove-task="$emit('remove-task', task.id)" v-for="task in taskList" :task="task" />
    </ul>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import IToDo from "../types/IToDo"
//Import Components
import ToDo from "./ToDo.vue"

//Export Component
export default defineComponent({
    name: "ToDoList",
    components: {
        ToDo,
    },
    props: {
        taskList: {
            required: true,
            type: Array as PropType<IToDo[]>,
        },
    },
    emits: ["switch-done", "remove-task"],
})
</script>

