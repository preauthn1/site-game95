import store from "@/store"
export default ()=>{
  if(navigator.userAgent.match(/Android/i)) return store.state.env === "app" ? "ANDROID" : "ANDROID_WEB";
  if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) return store.state.env === "app" ? "IPHONE" : "IPHONE_WEB";
  if(navigator.userAgent.match(/Macintosh/i)) return "MAC";
  if(navigator.userAgent.match(/Windows/i)) return "WINDOWS";
  return "OTHER"
}