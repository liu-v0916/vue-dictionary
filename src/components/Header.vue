<template>
  <div class="header-wrap">
    <h2 class="title">{{ word ? word : "Vue Dictionary" }}</h2>
    <div class="input-wrap">
      <input
        type="text"
        placeholder="Search a Word"
        v-model="word"
        @input="valChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      word: "",
      timer: null,
    };
  },
  methods: {
    valChange(e) {
      // 防抖
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        this.$bus.$emit("word", e.target.value);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-wrap {
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  h2 {
    font-size: 7vh;
    font-weight: 100;
    @media (max-width: 1000px) {
      font-size: 11vh;
    }
  }

  .input-wrap {
    input {
      width: 50vw;
      border: none;
      border-bottom: 1px solid rgb(197, 188, 188);
      padding: 5px;
      background-color: #282c34;
      color: white;
      font-size: 18px;
      &:focus {
        outline: none;
        border-bottom: 1px solid white;
      }
      &::placeholder {
        color: rgba(white, 0.6);
      }
    }
  }
}
</style>