import { initParam } from "./params/initParam.js"
import { jobParam } from "./params/jobParam.js"
import { traitParam } from "./params/traitParam.js"

const app = new Vue({
  el: "#app",
  data: {
    name: "もーよん",
    gender: "male",
    job: "hero",
    trait: "everyman",
    strength: initParam.strength, // 10
    agility: initParam.agility, // 10
    resilience: initParam.resilience, // 10
    wisdom: initParam.wisdom, // 10
    luck: initParam.luck, // 10
  },
  computed: {
    imgSrc: function() {
      return `assets/${this.gender}-${this.job}.png`
    },
    isMale: function() {
      return this.gender === "male"
    },
    isHero: function() {
      return this.job === "hero"
    },
    isEveryman: function() {
      return this.trait === "everyman"
    },

    // 日本語表記
    gender_ja: function() {
      switch(this.gender) {
        case "male": return "男性"
        case "female": return "女性"
      }
    },
    job_ja: function() {
      switch(this.job) {
        case "hero": return "勇者"
        case "warrior": return "戦士"
        case "mage": return "魔法使い"
      }
    },
    trait_ja: function() {
      switch(this.trait) {
        case "everyman": return "普通"
        case "batOutOfHell": return "電光石火"
        case "brave": return "勇敢"
        case "luckyDevil": return "ラッキーボーイ"
        case "tomboy": return "おてんば"
      }
    },
  },
  methods: {
    initializeAbility: function() {
      this.strength = initParam.strength; // 10
      this.agility = initParam.agility; // 10
      this.resilience = initParam.resilience; // 10
      this.wisdom = initParam.wisdom; // 10
      this.luck = initParam.luck; // 10
    },

    //職業または性格のセレクトボックスが更新されたとき呼ばれる
    updateAbility: function() {
      // 能力値を全て初期化する
      this.initializeAbility();
      // 職業による能力値のアップデートを行う
      for(let ability of Object.keys(jobParam[this.job])) {
        this[`${ability}`] += initParam[`${ability}`] * jobParam[this.job][`${ability}`];
      }
      // 性格による能力値のアップデートを行う
      if(!this.isEveryman) {
        for(let ability of Object.keys(traitParam[this.trait])) {
          this[`${ability}`] += initParam[`${ability}`] * traitParam[this.trait][`${ability}`];
        }
      }
    },
    traitSwitcher: function() {
      if(this.trait === "luckyDevil") this.trait = "tomboy";
      else if (this.trait === "tomboy") this.trait = "luckyDevil";
      else return;
    }
  }
})
app.updateAbility();
