import {
  surpriseMePrompts
} from "../constants";
import FileSaver from 'file-saver'

//create a random prompt from the list of prompts
export function getRandomPrompt(prompt:string):string {
  const max= surpriseMePrompts.length;
  const min = 0;
  const random:any = Math.floor(Math.random() * (max - min) + min);
  const randomPrompt:string = surpriseMePrompts[random]
  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  return randomPrompt;
}
export const  downloadImg = (url:string)=>{
  FileSaver.saveAs(url,'image.jpg')
}

export const filtered = (data:Array<any>,field:string,term:string)=>{
  return data.filter(el=>el[field].includes(term))
}