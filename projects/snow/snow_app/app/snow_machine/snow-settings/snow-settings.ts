export class SnowSettings{
  symbol: string = "*";
  img: string = "";
  color: string = "white";
  count: number = 30;
  min_speed: number = 2;
  max_speed: number = 10;
  min_wind: number = 0;
  max_wind: number = 1;
  min_size: number = 20;
  max_size: number = 60;
  fps: number = 40;
  reset: boolean = true;

  readonly xMax: number = document.documentElement.clientWidth-50;
	readonly yMax: number = Math.max( document.body.scrollHeight, 
                                    document.body.offsetHeight, 
                                    document.documentElement.clientHeight, 
                                    document.documentElement.scrollHeight, 
                                    document.documentElement.offsetHeight );

  readonly max_values = {
    count: () => 1000,
    min_speed: () => this.max_speed,
    max_speed: () => 1000,
    min_wind: () => this.max_wind,
    max_wind: () => 1000,
    min_size: () => this.max_size,
    max_size: () => 1000,
    fps: () => 100
  }
  readonly min_values = {
    count: () => 1,
    min_speed: () => 0,
    max_speed: () => this.min_speed,
    min_wind: () => 0,
    max_wind: () => this.min_wind,
    min_size: () => 0,
    max_size: () => this.min_size,
    fps: () => 1
  }
}