<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const { users } = storeToRefs(store)

function remove(id: string) {
  store.removeUser(id)
}

</script>

<template>
  <div class="users-table-wrapper">
    <table v-if="users.length" class="users-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Роль</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role ?? '—' }}</td>
          <td>
            <button type="button" class="btn btn-danger" @click="remove(user.id)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-state">Нет пользователей</p>
  </div>
</template>

<style scoped>
.users-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.users-table th,
.users-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.users-table th {
  font-weight: 500;
  color: var(--text-h);
  background: var(--code-bg);
}

.users-table tbody tr:hover {
  background: var(--accent-bg);
}

.btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}

.btn-danger {
  color: #b91c1c;
  background: rgba(185, 28, 28, 0.1);
}

.btn-danger:hover {
  background: rgba(185, 28, 28, 0.2);
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: var(--text);
}
</style>
