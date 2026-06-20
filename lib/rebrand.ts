export function rebrandText(text: string): string {
  return text
    .replace(/TACKLES Pro/gi, "HomeSewa")
    .replace(/TACKLES/gi, "HomeSewa")
    .replace(/tackles\.pro/gi, "HomeSewa.app")
    .replace(/cleaningsewa\.com/gi, "HomeSewa.app")
    .replace(/cleaningswea\.com/gi, "HomeSewa.app")
    .replace(/support@cleaningsewa\.com/gi, "support@HomeSewa.app")
    .replace(/support@cleaningswea\.com/gi, "support@HomeSewa.app")
    .replace(/San Francisco/gi, "Kathmandu, Nepal")
    .replace(/handyman/gi, "cleaning")
    .replace(/Handyman/gi, "Cleaning")
    .replace(/GardenSewa/gi, "HomeSewa")
    .replace(/Cleaning Sewa/gi, "HomeSewa");
}
