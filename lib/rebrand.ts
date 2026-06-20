export function rebrandText(text: string): string {
  return text
    .replace(/TACKLES Pro/gi, "RocketSingh")
    .replace(/TACKLES/gi, "RocketSingh")
    .replace(/tackles\.pro/gi, "rocketsingh.app")
    .replace(/cleaningsewa\.com/gi, "rocketsingh.app")
    .replace(/cleaningswea\.com/gi, "rocketsingh.app")
    .replace(/support@cleaningsewa\.com/gi, "support@rocketsingh.app")
    .replace(/support@cleaningswea\.com/gi, "support@rocketsingh.app")
    .replace(/San Francisco/gi, "Chennai, India")
    .replace(/handyman/gi, "cleaning")
    .replace(/Handyman/gi, "Cleaning")
    .replace(/GardenSewa/gi, "RocketSingh")
    .replace(/Cleaning Sewa/gi, "RocketSingh");
}
