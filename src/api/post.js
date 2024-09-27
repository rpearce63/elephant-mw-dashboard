import axios from "axios";

export const postAddr = async (address) => {
  console.log("post")
  try{
    await axios.post("https://sandy-spectacled-poppy.glitch.me/message", 
    `message=${address}`
  , {
      headers: {
        "admin_key" : process.env.ADMIN_KEY
      }
    })
  } catch (err) {
    console.log(err)
  }
  
  
}