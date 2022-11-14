<template lang="">
    <div>
<v-form ref="form" lazy-validation>
  <v-row>
    <v-col cols="12">
        <v-text-field 
        v-model="user_id" 
            label="아이디*" 
            :rules="user_id_rule" 
            :disabled="state == 'ins' ? false : true"
            required
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user_nm" 
            label="이름*" 
            :rules="user_nm_rule" 
            required
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user_pw" 
            label="비밀번호*" 
            type="password" 
            :rules="user_pw_rule"
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user_pw_chk" 
            label="비밀번호 확인*" 
            type="password" 
            :rules="user_pw_rule2"
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user_email" 
            label="이메일"  
            required
            :rules="user_email_rule"
            >
        </v-text-field>
    </v-col>
  </v-row>
    <div class="button">
        <input
        type="submit"
        value="가입하기" />
    </div>
</v-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ids: ["aa111", "bb111"],
            dialog: false,
            state: "ins",
            authList: [
                { name: "관리자", value: "A" },
                { name: "일반 사용자", value: "M" },
            ],
            user_id: "",
            user_id_rule: [
                (v) => !!v || "아이디는 필수 입력사항입니다.",
                (v) =>
                    /^[a-zA-Z0-9]*$/.test(v) ||
                    "아이디는 영문+숫자만 입력 가능합니다.",
                (v) =>
                    !(v && v.length >= 15) ||
                    "아이디는 15자 이상 입력할 수 없습니다.",
                (v) => this.checkId(v) || "중복",
            ],
            user_nm: "",
            user_nm_rule: [
                (v) => !!v || "이름은 필수 입력사항입니다.",
                (v) =>
                    !(v && v.length >= 30) ||
                    "이름은 30자 이상 입력할 수 없습니다.",
                (v) =>
                    !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
                    "이름에는 특수문자를 사용할 수 없습니다.",
            ],
            user_pw: "",
            user_pw_chk: "",
            user_pw_rule: [
                (v) =>
                    this.state === "ins"
                        ? !!v || "패스워드는 필수 입력사항입니다."
                        : true,
                (v) =>
                    !(v && v.length >= 30) ||
                    "패스워드는 30자 이상 입력할 수 없습니다.",
            ],
            user_pw_rule2: [
                (v) =>
                    this.state === "ins"
                        ? !!v || "패스워드는 필수 입력사항입니다."
                        : true,
                (v) =>
                    !(v && v.length >= 30) ||
                    "패스워드는 30자 이상 입력할 수 없습니다.",
                (v) => v === this.user_pw || "패스워드가 일치하지 않습니다.",
            ],
            user_email: "",
            user_email_rule: [
                (v) => {
                    const replaceV = v.replace(/(\s*)/g, "");
                    const pattern =
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
                    return (
                        pattern.test(replaceV) || "이메일 형식으로 입력해주세요"
                    );
                },
            ],
        };
    },
    methods: {
        async save() {
            const validate = this.$refs.form.validate();
            if (validate) {
                if (confirm("ㅁㄴㅇㄴㅁㅇ")) {
                    const params = {
                        user_id: this.user_id,
                        user_nm: this.user_nm,
                        user_pw: this.user_pw,
                        user_pw_chk: this.user_pw_chk,
                        user_email: this.user_email,
                    };
                    if (this.state == "upd") {
                        params._id = this.user_info._id;
                    }
                }
            }
        },
        checkId(v) {
            for (var i = 0; i < this.ids.length; i++) {
                if (this.ids[i] === v) {
                    return false;
                }
            }
            return true;
        },
    },
};
</script>
<style lang="scss" scoped>
div {
    text-align: center;
}
</style>