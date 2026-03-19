<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UserRole } from '@/types'
import { useUsersStore } from '@/stores/users'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const store = useUsersStore()

const name = ref('')
const phone = ref('')
const role = ref<UserRole | ''>('')

const errors = ref<{ name?: string; phone?: string }>({})

const ROLES: UserRole[] = ['Администратор', 'Менеджер', 'Разработчик']

const PHONE_REGEX = /^[\d\s+\-()]{10,}$/

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && PHONE_REGEX.test(value)
}

function validate(): boolean {
  errors.value = {}
  if (!name.value.trim()) {
    errors.value.name = 'Имя обязательно'
  }
  if (!phone.value.trim()) {
    errors.value.phone = 'Телефон обязателен'
  } else if (!validatePhone(phone.value)) {
    errors.value.phone = 'Неверный формат телефона (минимум 10 цифр)'
  }
  return Object.keys(errors.value).length === 0
}

function submit() {
  if (!validate()) return
  store.addUser({
    name: name.value.trim(),
    phone: phone.value.trim(),
    role: role.value || undefined,
  })
  close()
}

function close() {
  name.value = ''
  phone.value = ''
  role.value = ''
  errors.value = {}
  emit('update:modelValue', false)
}

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-backdrop')) close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (!open) {
      name.value = ''
      phone.value = ''
      role.value = ''
      errors.value = {}
    } 
  }
)
</script>

<template>
  <Teleport to="body">
    <div
      v-show="modelValue"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @click="onBackdropClick"
    >
      <div class="modal-box">
        <div class="modal-header">
          <h2 id="modal-title">Добавить пользователя</h2>
          <button type="button" class="modal-close" aria-label="Закрыть" @click="close">
            ×
          </button>
        </div>
        <form class="modal-form" @submit.prevent="submit">
          <div class="field">
            <label for="user-name">Имя</label>
            <input
              id="user-name"
              v-model="name"
              type="text"
              autocomplete="name"
              :class="{ invalid: errors.name }"
            />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="user-phone">Телефон</label>
            <input
              id="user-phone"
              v-model="phone"
              type="tel"
              autocomplete="tel"
              placeholder="+7 (999) 123-45-67"
              :class="{ invalid: errors.phone }"
            />
            <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
          </div>
          <div class="field">
            <label for="user-role">Роль</label>
            <select id="user-role" v-model="role">
              <option value="">— не выбрано —</option>
              <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="close">
              Отмена
            </button>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow);
  max-width: 400px;
  width: 100%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: var(--text);
  padding: 0 4px;
}

.modal-close:hover {
  color: var(--text-h);
}

.modal-form {
  padding: 20px;
}

.field {
  margin-bottom: 16px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--text-h);
}

.field input,
.field select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 16px;
  background: var(--bg);
  color: var(--text-h);
  box-sizing: border-box;
}

.field input.invalid,
.field select.invalid {
  border-color: #b91c1c;
}

.field input:focus,
.field select:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.error {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #b91c1c;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}

.btn-secondary {
  background: var(--code-bg);
  color: var(--text-h);
  border-color: var(--border);
}

.btn-secondary:hover {
  background: var(--border);
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  filter: brightness(1.1);
}
</style>
