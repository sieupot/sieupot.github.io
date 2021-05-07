<div id="content">
  <div id="dialogDiv"></div>
  <div class="result">
    <img src="../img/start.svg" alt="result image" onclick="startActivity();" style="height: 100%;" class="pointerCursor"/>
  </div>
  <div id="contentPanel">
    <div id="object1" class="object"></div>
    <div id="object2" class="object"></div>

    <div id="scorePanel">
      <div id="scoreGood" class="score">
        <img src="../img/smileFace.png" alt="good answers"/>
        <div>0</div>
      </div>
      <div id="scoreBad" class="score">
        <img src="../img/sadFace.png" alt="bad answers"/>
        <div>0</div>
      </div>
    </div>
  </div>
</div>

<script src="../js/footerInjector.js"></script>

<script type="text/javascript">
  $(function() {
    go();
  });
</script>
