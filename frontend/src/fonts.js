export function getTextFont(text = "") {
  if (/[\u0600-\u06FF]/.test(text)) {
    return "elmesriRegular, sans-serif";
  }

  if (/[\u3040-\u30FF]/.test(text) || /[\u4E00-\u9FFF]/.test(text)) {
    return "zheng"; 
  }

  if (/[\uAC00-\uD7AF]/.test(text)) {
    return "Dongle"; 
  }

  return "playpen, sans-serif";
}