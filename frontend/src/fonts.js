export function getTextFont(text = "") {
  if (/[\u0600-\u06FF]/.test(text)) {
    return "elmesriRegular, sans-serif"; // Arabic
  }

  if (/[\u3040-\u30FF]/.test(text) || /[\u4E00-\u9FFF]/.test(text)) {
    return "zheng"; // Japanese + Chinese
  }

  if (/[\uAC00-\uD7AF]/.test(text)) {
    return "Dongle"; // Korean
  }

  return "playpen, sans-serif";
}