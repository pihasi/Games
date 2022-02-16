import { Logger } from './log';

Logger.log('TypeScript works!')



var helloWorld = new HelloWorld("Good Morning!!");
document.getElementById('test').innerHTML = helloWorld.greet();



class HelloWorld
{
  constructor(public displayText: string) {}

  greet()
  {
    return this.displayText;
  }
}

