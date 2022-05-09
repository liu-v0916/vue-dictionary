<template>
  <div class="definition-wrap">
    <!-- 没有搜索词 -->
    <p class="tip" v-if="!word">Start by typing a word in search ...</p>
    <!-- 搜索没有结果 -->
    <p v-else-if="word && !result.length">
      Sorry, the definition of this word was not found.
    </p>
    <!-- 结果 -->

    <div
      class="definition"
      v-else
      v-for="(definition, index) in result"
      :key="index"
    >
      <!-- 音标读音 -->
      <div class="phonetics">
        <span class="phonetic">
          {{ definition.phonetics[0].text }}
        </span>
        <i class="iconfont icon-yangshengqi" @click="handlerClick(index)"></i>
        <audio :src="definition.phonetics[0].audio" ref="audio"></audio>
      </div>

      <!-- 含义 -->
      <div class="meanings">
        <div
          class="meaning"
          v-for="(meaning, index) in definition.meanings"
          :key="index"
        >
          <span class="partOfSpeech">{{ meaning.partOfSpeech }}</span>
          <span class="word-meaning">
            {{
              meaning.definitions
                .map((definition) => definition.definition)
                .join(" ")
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      word: "",
      result: [],
      phonetics: "",
    };
  },
  watch: {
    word(newVal) {
      // console.log(newVal);
      this.getData(newVal);
    },
  },
  methods: {
    // 发请求获取数据
    async getData(newVal) {
      this.result = [];
      if (!newVal) return;
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${newVal}`;
      const data = await axios.get(url).catch((err) => err);
      // 没有结果时让 result 为 []，result 中子项中的 phonetics 为 {},不然控制台会报错
      this.result = data.data || [];
      this.result.forEach(
        (item) => (item.phonetics[0] = item.phonetics[0] || {})
      );
    },

    // 读音
    handlerClick(index) {
      // 播放音频
      this.$refs.audio[index].play();
      console.log(this.$refs.audio[index]);
    },
  },
  created() {
    this.$bus.$on("word", (data) => {
      this.word = data;
    });
  },
  beforeDestroy() {
    this.$bus.$off("word");
  },
};
</script>

<style lang="scss" scoped>
// 滚动条样式
::-webkit-scrollbar {
  width: 5px;
  background: #282c34;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}

.definition-wrap {
  height: 65vh;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  padding: 15px;
  border: 10px solid #696969;
  border-radius: 10px;
  overflow-y: scroll;
  gap: 5px;

  .tip {
    font-size: 18px;
  }
  .definition {
    margin-bottom: 10px;
    .phonetics {
      margin-bottom: 10px;
      .phonetic {
        cursor: pointer;
        border-radius: 5px;

        margin-right: 10px;
        &:hover {
          opacity: 0.8;
        }
      }
      .iconfont {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    &:last-child {
      .meanings {
        border-bottom: none;
      }
    }
    .meanings {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #c5bcbc;

      div.meaning {
        .partOfSpeech {
          margin-right: 10px;
          display: inline-block;
          padding-block: 3px;
          padding-inline: 5px;
          border-radius: 5px;
          line-height: 25px;
          background-color: #3b3e45;
          opacity: 0.8;
          font-size: 14px;
        }
        .word-meaning {
          line-height: 25px;
        }
      }
    }
  }
}
</style>