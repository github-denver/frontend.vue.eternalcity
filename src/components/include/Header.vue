<template>
  <div id="header" class="header">
    <h1 class="title_logo">
      <a v-bind:href="initial.url" class="link_logo">이터월드</a>
    </h1>

    <div id="gnb" class="gnb">
      <a href="javascript:;" class="button_gnb">
        <span class="ico_global ico_menu">이터월드 주 메뉴 열기</span>
      </a>

      <div class="inner_global">
        <div class="area_gnb">
          <div class="group_gnb">
            <ul class="list_gnb">
              <li>
                <a href="javascript:;" class="link_gnb">무기 정보</a>

                <ul class="list_lnb">
                  <li>
                    <a
                      href="/eterworld/weapon/ranged/list/1?grade=1"
                      class="link_lnb"
                      >원거리 무기</a
                    >
                  </li>
                  <li>
                    <a
                      href="/eterworld/weapon/melee/list/1?grade=1"
                      class="link_lnb"
                      >근거리 무기</a
                    >
                  </li>
                </ul>
              </li>
              <!-- <li>
                <a href="javascript:;" class="link_gnb">방어구 정보</a>

                <ul class="list_lnb">
                  <li><a href="/eterworld/armour/human/list/1?grade=1" class="link_lnb">인간</a></li>
                  <li><a href="/eterworld/armour/parasite/list/1?grade=1" class="link_lnb">변이체</a></li>
                </ul>
              </li> -->
            </ul>
          </div>

          <a href="javascript:;" class="button_close"
            ><span class="ico_global ico_close">이터월드 주 메뉴 닫기</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hdr',
  props: ['user'],
  data () {
    return {
      initial: {
        user: {},
        url: 'http://localhost:3000'
      }
    }
  },
  watch: {
    user () {
      Object.keys(this.user).forEach((currentvalue, index, array) => {
        this.initial.user[currentvalue] = this.user[currentvalue]
      })
    }
  }
}
</script>

<style></style>
