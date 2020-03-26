<template>
  <div class="thumbnail_weapon">
    <img v-bind:src="src" v-bind:alt="name" class="image_weapon" />
    <span class="hgroup">
      <h3 class="title_weapon">{{ name }}</h3>
    </span>
  </div>
</template>

<script>
export default {
  name: 'weapon-thumbnail',
  props: ['thumbnail', 'alt', 'name', 'category', 'equipment', 'gender'],
  data () {
    return {
      initial: {
        url: 'http://localhost:3000',
        path: '',
        thumbnail: ''
      },
      src: ''
    }
  },
  created () {
    if (this.category === 'armour') {
      this.initial.path = `/eternalcity/images/${this.category}/${this.gender}/${this.equipment}/`
    } else {
      this.initial.path = `/eternalcity/images/${this.category}/${this.equipment}/`
    }
  },
  watch: {
    thumbnail () {
      this.src = this.initial.url + this.initial.path + this.thumbnail
    }
  }
}
</script>
