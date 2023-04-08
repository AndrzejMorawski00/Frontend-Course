<template>
    <div class="container">
        <Header @remove-all="removeAll" @create-task="createNewTask" :taskLeft="countTasks()" />
        <ToDoList @switch-done="switchTask" @remove-task="removeTask" :taskList="taskList" />  
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import IToDo from "./types/IToDo"

//Import Components
import ToDoList from "./components/ToDoList.vue"
import Header from "./components/Header.vue"
//Export Component
export default defineComponent({
    name: "App",
    components: {
        ToDoList,
        Header,
    },
    setup() {
        const taskList = ref<IToDo[]>([])
        return { taskList }
    },

    methods: {
        countTasks(): number {
            return this.taskList.length - this.taskList.filter((task) => task.is_done === true).length
        },
        removeAll(): void {
            this.taskList = []
        },
        createNewTask(newTask: IToDo): void {
            this.taskList = [...this.taskList, newTask]
        },
        switchTask(id: number): void {
            this.taskList = this.taskList.map((task) => (task.id === id ? { ...task, is_done: !task.is_done } : task))
        },
        removeTask(id: number): void {
            this.taskList = this.taskList.filter((task) => task.id !== id)
        },
    },
})
</script>
