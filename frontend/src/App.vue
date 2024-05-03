<template>
  <div class="app">
    <div v-if="account.id">
      안녕하세요. {{ account.name }}<br>
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span style="display: inline-block; width: 100px;">아이디</span>
        <input type="text" id="loginId" v-model="form.loginId" />
      </label>
      <br>
      <label for="loginPw">
        <span style="display: inline-block; width: 100px;">비밀번호</span>
        <input type="password" id="loginPw" v-model="form.loginPw" />
      </label>
      <br><br>
      <button @click="submit">로그인</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const account = ref({
  id: null,
  name: ""
});

const form =  ref({
  loginId: "",
  loginPw: ""
});

const submit = () => {
  const args = {
    loginId: form.value.loginId,
    loginPw: form.value.loginPw
  };
  axios.post("/api/account", args).then((res) => {
    alert("로그인 성공");
    account.value = res.data;
  })
    .catch(() => {
      alert("로그인 실패");
    })
}

const logout = () => {
  axios.delete("/api/account").then(() => {
    alert("로그아웃");
    account.value.id = null;
    account.value.name = "";
    form.value.loginId = "";
    form.value.loginPw = "";
  });
}

axios.get("/api/account").then((res) => {
  account.value = res.data;
});

</script>

<style scoped>

</style>
