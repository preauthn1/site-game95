<template>
  <div class="Roulette">
    <img src="@/assets/images/turntable/roulette-base.png" class="Roulette--base">
    <img src="@/assets/images/turntable/roulette-top.png" class="Roulette--top">
    <img src="@/assets/images/turntable/roulette-clubs.svg" class="Roulette--clubs">
    <img src="@/assets/images/turntable/roulette-cube.svg" class="Roulette--cube">
    <img src="@/assets/images/turntable/bi.png" class="Roulette--bi">
    <img src="@/assets/images/turntable/roulette-spades-large.svg" class="Roulette--spades-large">
    <img src="@/assets/images/turntable/roulette-spades-small.svg" class="Roulette--spades-small">
    <img src="@/assets/images/turntable/roulette-card-spade.svg" class="Roulette--card-spade">
    <img src="@/assets/images/turntable/roulette-card-clubs.svg" class="Roulette--card-clubs">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.Roulette{
  width: 307px;
  position: relative;
}
.Roulette:after {
    content: "";
    display: block;
    padding-top: 100%;
}
.Roulette:before {
    content: "";
    position: absolute;
    top: 46%;
    left: 46%;
    width: 50%;
    height: 40%;
    border-radius: 50%;
    background: #ff0210;
    filter: blur(100px);
    transform: matrix(-.92,.4,-.4,-.92,0,0);
    animation: blur 14s linear infinite;
}
.Roulette img{
  position: absolute;
}
.Roulette--base {
    z-index: 1;
    width: 80.1%;
    top: 10%;
    left: 10%;
}
.Roulette--top {
    width: 84.78%;
    animation: toClock 16s linear infinite;
    animation-play-state: running;
    z-index: 2;
    top: 7.8%;
    left: 7.8%;
}


.Roulette--clubs {
    width: 20.62%;
    left: 3%;
    z-index: 5;
    top: 87%;
}

.Roulette--cube {
    width: 21.44%;
    z-index: 5;
    animation: cube 16s infinite;
    animation-play-state: running;
    top: 82%;
    left: 55%;
}


.Roulette--spades-large {
    width: 20.79%;
    top: 30%;
    left: 96%;
    transform-origin: 130px -55px;
    z-index: 6;
    animation: spades-large-sm 20s infinite;
}

.Roulette--spades-small {
    width: 11.46%;
    top: 22%;
    z-index: 5;
    animation: spades-small 26s infinite;
    transform-origin: 150px 20px;
    left: -7%;
}
.Roulette--card-spade {
    width: 16.04%;
    z-index: 5;
    top: 20%;
    left: 81%;
}
.Roulette--card-clubs {
    width: 17.02%;
    top: 55%;
    left: -2%;
    z-index: 5;
    animation: cardClubs 10s linear infinite;
    animation-play-state: running;
    transform-origin: bottom right;
}
.Roulette--bi{
  width: 18.02%;
  top: 10%;
  left: 15%;
  z-index: 2;
  animation: Roulette-bi 10s linear infinite;
}
@keyframes Roulette-bi{
  0%{
    transform: translateX(0);
  }
  50%{
    transform: translate(60%,-60%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes toClock{
  100% {
    transform: rotate(1turn);
  }
}

@keyframes cube{
  0% {
    transform: translateX(0);
  }
  50% {
      transform: translateX(70%);
  }
  100% {
      transform: translateX(0);
  }
}

@keyframes spades-large-sm{
  0% {
    transform: translate(0) rotate(0) scale(1);
  }
  50% {
    transform: translate(-222%,105%) rotate(56deg) scale(.25);
  }
  100% {
      transform: translate(0) rotate(0) scale(1);
  }
}

@keyframes spades-small{
  0% {
    transform: rotate(0deg);
  }
  50% {
      transform: rotate(35deg);
  }
  100% {
      transform: rotate(0deg);
  }
}

@keyframes cardClubs{
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
      transform: rotate(45deg) scale(.8);
  }
  100% {
      transform: rotate(0deg) scale(1);
  }
}
@keyframes blur{
  0%{
    filter: blur(68px);
  }50%{
    filter: blur(30px);
  }100%{
    filter: blur(68px);
  }
}
</style>