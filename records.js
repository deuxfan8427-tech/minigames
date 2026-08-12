export function checkAndUpdateRecord(game, score) {
  var key = 'mg_pb_' + game;
  var prev = null;
  try {
    var raw = localStorage.getItem(key);
    if (raw !== null) prev = Number(raw);
  } catch (e) {}
  var isPersonalBest = prev !== null && score > prev;
  if (prev === null || score > prev) {
    try { localStorage.setItem(key, String(score)); } catch (e) {}
  }
  return { isPersonalBest: isPersonalBest, previousBest: prev };
}
