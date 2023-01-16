<template>
  <div>
    <div class="container">
      <div class="play-btn" id="startBtn">시작</div>
      <div class="play-btn" id="startBtn2" @click="playTest" >시작</div>
      <div
    @click="
      play(
        'C:/fas-team/toy/front-end/src/assets/music/drum-fx-01.mp3'
      )
    "
  >
    audioPlayer
  </div>
      <input type='file' id="findMusicBtn" webkitdirectory @change="setMusic"/>
      <!-- <script src="main.js" type="module"></script> -->
      <div class="play-btn">1</div>
      <div class="play-btn">2</div>
      <div class="play-btn">3</div>
      <div class="play-btn">4</div>
      <div class="play-btn">5</div>
      <div class="play-btn">6</div>
      <div class="play-btn">7</div>
      <div class="play-btn">8</div>
      <div class="play-btn">9</div>
      <div class="play-btn">10</div>
      <div class="play-btn">11</div>
      <div class="play-btn">12</div>
      <div class="play-btn">asd
        <audio id="audio-source" src="../assets/music/drum-fx-01.mp3">sadas</audio>
      </div>

    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

// const buttonToPlay = document.getElementById('startBtn')
const buttonToFind = document.getElementById('findMusicBtn')
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
// const oscillator = new OscillatorNode(audioContext)
// const gainNode = new GainNode(audioContext, { gain: 0.2 })
// oscillator.connect(gainNode).connect(audioContext.destination)
// oscillator.start()

// class DrumCell {
//   constructor (outputNode, audioBuffer) {
//     this._context = outputNode.context
//     this.buffer = audioBuffer
//     this._outputNode = outputNode
//   }
// }

export default {
  data () {
    return {
      isShow: false,
      viewType: 'type-card'
    }
  },
  computed: {
    ...mapState('bookGether', [
      'loading'
    ])
  },
  components: {
  },
  methods: {
    playSample (audioBuffer, audioContext) {
      // const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      // const oscillator = audioContext.createOscillator()
      // const gainNode = audioContext.createGain()
      // gainNode.gain.value = 0.2 // 볼륨 설정(0~1사이)
      // oscillator.connect(gainNode).connect(audioContext.destination)
      // oscillator.start()

      // const playSample = ( ) => {
      const bufferSource =
          new AudioBufferSourceNode(audioContext, { buffer: audioBuffer })
      const amp = new GainNode(audioContext)
      bufferSource.connect(amp).connect(audioContext.destination)
      bufferSource.start()
      // }
    },
    setMusic () {
      const selectedFiles = buttonToFind.files

      for (const file of selectedFiles) {
        const textContent = file.webkitRelativePath
        console.log(textContent)
      }
    },
    testMusic () {
      const audio = new Audio('../assets/music/drum-fx-01.mp3')
      audio.loop = true // 반복재생하지 않음
      audio.volume = 1.0 // 음량 설정
      audio.play()
    },
    async playTest () {
      // AudioContext 객체인데 음원과 관련된 모든 처리가 일어난다.
      // const audioContext = await new (window.AudioContext || window.webkitAudioContext)();
      console.log('audioContext', audioContext)
      // const res = await fetch('../../assets/music/drum-fx-01.mp3')
      const res = await fetch('front-end/src/assets/music/drum-fx-01.mp3')
      console.log('res', res)

      // arrayBuffer()를 이용해 오디오 파일 데이터를 고정 길이의 원시 이진 데이터 버퍼 객체로 나타낸다.
      const bufferData = await res.arrayBuffer()
      console.log('bufferData', bufferData)
      // 버퍼 객체를 비동기적으로 디코딩한다(raw한 오디오 데이터일뿐 아직 하나의 노드가 아니여서 사용할 수 없는 상태이다)
      const audioBuffer = await audioContext.decodeAudioData(bufferData)

      // sound source 생성
      const source = audioContext.createBufferSource() // 생성했던 데이터는 한번 재생이 끝나고 재접근 불가

      // 생성된 source에 어떤 사운드(audioBuffer)를 플레이할지 알려준다.
      source.buffer = audioBuffer

      // 스피커에 source를 연결한다...!
      source.connect(audioContext.destination)
      source.start()
    },
    play (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
    }).catch(e => {
      console.error(`Audio permissions denied: ${e}`)
    })
    // buttonToPlay.disabled = false
    // buttonToPlay.addEventListener('click', () => audioContext.resume())
  }
}
</script>

<style scoped>
.play-btn {
  width: 80px;
  height: 40px;
  border: 1px solid black;
}
</style>
