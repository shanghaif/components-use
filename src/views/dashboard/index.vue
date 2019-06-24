<template>
  <div class="dashboard-container" style="text-align:center;margin:0 auto;height:auto">
    <!-- <component :is="currentRole"/> -->
    <!-- <iframe src="http://prod.iotn2n.com:3000/d/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2" width="100%" height="100%" frameborder="0" align="center"/> -->
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=11" width="296" height="270" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=12" width="296" height="270" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=13" width="296" height="270" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=9" width="899" height="268" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=6" width="899" height="268" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=7" width="899" height="268" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=17" width="899" height="268" frameborder="0"></iframe>
    <iframe src="http://prod.iotn2n.com:3000/d-solo/nRsfcC7Wk/shu-wa-wu-lian-wang-jian-kong-xi-tong?orgId=2&from=now-5m&to=now&refresh=5s&theme=dark&panelId=15" width="899" height="268" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  // components: { adminDashboard},
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
<style>
/* iframe{
height:1000px;
} */
</style>

