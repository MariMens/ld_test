<template>
  <div id="app" class="p-5">
    <h1>Testovací formulář <span style="font-size: 0.9rem;">Pozn: {{ note }} </span></h1>
    <br><br>
    Pohlaví:
    Muž <input v-model="gender" type="radio" name="gender" value="Muž">
    Žena <input v-model="gender" type="radio" name="gender" value="Žena">
    <div class="card-header-tab card-header">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" :active-class="'active'" data-toggle="tab" to="/form-dospely">Dospely</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :active-class="'active'" data-toggle="tab" to="/form-dite">Dítě</router-link>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div class="tab-content">
        <router-view v-slot="{ Component }" v-model:note="note" :gender="gender">
          <keep-alive :max="7">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      gender: '',
      note: '',
    };
  }
};
</script>

<style>
</style>
