<template>
  <div>
    <v-container fluid>
      <v-layout
        row
        wrap
        justify-center>
        <v-flex
          xs12
          sm6>
          <v-card>
            <v-container fluid>
              <v-layout
                row
                wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="user.username"
                    :rules="[rules.required]"
                    label="用户名"/>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="user.password"
                    :rules="[rules.required]"
                    label="密码"
                    type="password"/>
                </v-flex>
                <v-flex xs12>
                  <v-btn
                    color="success"
                    @click="onSubmit"
                  >登录</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        required: (value) => !!value || 'Required.'
      }
    };
  },
  methods: {
    ...mapActions(['login', 'addLoginLog']),
    onSubmit() {
      if (this.rules.required) {
        this.login(this.user)
          .then(() => {
            let redirect = this.$route.query.redirect;
            this.$router.push(redirect);
          })
          .catch(() => {
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
