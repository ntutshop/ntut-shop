<template>
  <el-dialog
    :visible="dialogVisible"
    width="35%"
    title="Login for development"
    @close="closeDialog">
    <el-form>
      <el-form-item label="Facebook user_id">
        <el-input
          v-model="userId"
          autocomplete="off"/>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button
        type="primary"
        @click="login">
        Confirm
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      userId: ''
    }
  },
  computed: {
    dialogVisible()  {
      return this.$store.state.dialogLoginVisible
    }
  },
  methods: {
    async login() {
      try {
        await this.$axios.post('/dev/login', { user_id: this.userId })
        this.$store.dispatch('updateUserState')
      } catch (e) {
        const code = parseInt(e.response && e.response.status)
        if (code === 403 && e.response.data.reason === 'unregistered') {
          this.$store.dispatch('updateUserState')
          this.$router.push('/signup')
        } else {
          throw e
        }
      } finally {
        this.closeDialog()
      }
    },
    closeDialog() {
      this.$store.commit('hideLoginDialog')
    }
  },
}
</script>
