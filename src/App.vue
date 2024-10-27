<template>
  <div id="app" class="p-5">
    <h1>Testovací formulář <span style="font-size: 0.9rem;">Pozn: (<i>tady bude zobrazena poznámka z formulářů</i>).</span></h1>
    <div style="font-size: larger">
      <a href="">Dospělý</a> | <a href="">Dítě</a>
    </div>
    <br><br>
    Pohlaví:
    Muž <input type="radio" name="gender" value="male">
    Žena <input type="radio" name="gender" value="female">
    <hr>
    <router-view v-slot="{ Component }">
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
    };
  }
};
</script>

<style>
</style>
