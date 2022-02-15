import { Logger } from './log';

Logger.log('TypeScript works!')


class HelloWorld
{
  constructor(public displayText: string) {}

  greet()
  {
    return this.displayText;
  }
}

var helloWorld = new HelloWorld("Good Morning!!");
document.getElementById('test').innerHTML = helloWorld.greet();




