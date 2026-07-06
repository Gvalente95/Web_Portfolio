export function formatAudioFileName(labelRaw: string) {
  return labelRaw.replaceAll(".wav", "").replaceAll(".mp3", "").replaceAll(".aif", "");
}
