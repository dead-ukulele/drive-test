<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UsersTable from '@/components/UsersTable.vue'
import UserModal from '@/components/UserModal.vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const modalOpen = ref(false)

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>

<template>
  <div class="users-view">
    <header class="view-header">
      <h1>Пользователи</h1>
      <button type="button" class="btn btn-primary" @click="modalOpen = true">
        Добавить пользователя
      </button>
    </header>
    <UsersTable />
    <UserModal v-model="modalOpen" />
  </div>
</template>

<style scoped>
.users-view {
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
}

.view-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.view-header h1 {
  margin: 0;
}

.btn {
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: filter 0.2s;
}


.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  filter: brightness(1.1);
}
</style>
