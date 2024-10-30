<template>
  <div id="app" class="p-5">
    <h1>Testovací formulář <span style="font-size: 0.9rem;">Pozn: (<i>tady bude zobrazena poznámka z formulářů</i>).</span></h1>
    <div style="font-size: larger">
      <a href="/form-dospely">Dospělý</a> | <a href="/form-dite">Dítě</a>
    </div>
    <br><br>
    Pohlaví:
    Muž <input v-model="gender" type="radio" name="gender" value="Muž">
    Žena <input v-model="gender" type="radio" name="gender" value="Žena">
    <hr>
    <router-view v-slot="{ Component }" :gender="gender">
      <keep-alive :max="7">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      gender: '',
    };
  }
};
</script>

<style>
</style>
