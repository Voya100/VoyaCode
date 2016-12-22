export class SnowSettings{
  symbol: string = " * ";
  colour: string = "white";
  count: number = 30;
  min_speed: number = 1.5;
  max_speed: number = 10;
  min_wind: number = 0.45;
  max_wind: number = 0.6;
  font_min: number = 20;
  font_max: number = 60;
  fps: number = 40;

  readonly xMax: number = document.documentElement.clientWidth-50;
	readonly yMax: number = Math.max( document.body.scrollHeight, 
                                    document.body.offsetHeight, 
                                    document.documentElement.clientHeight, 
                                    document.documentElement.scrollHeight, 
                                    document.documentElement.offsetHeight );
}