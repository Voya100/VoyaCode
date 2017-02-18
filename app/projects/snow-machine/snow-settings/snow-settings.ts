// This class contains all settings for snow/rain and their minimum and maximum values.
// All settings are initialised to their default values.



// Settings:
// Symbol:  Text representation of the flake/rain drop. Can be multiple characters.
// Color:   Color name, hex value or some other color format supported by CSS.
// Img:     Optional setting that takes an URL of an image - will override symbol and color if used.
// Count:   How many flakes there are on screen at once.
// Speed:   Speed to y direction (downwards, px / frame).
// Wind:    Speed to -x direction (px / frame).
// Size:    Either font-size or image width in pixels. If img != "" and size == 0, image's default size will be used.
// FPS:     Maximum theoretical Frames per second. Reaal FPS is slightly lower. Can be changed without reset.
// Reset:   If true, all old flakes/rain drops are removed when new settings are applied. 
//          If false, old ones are kept on the screen, but they won't move

export class SnowSettings{
  symbol: string = "*";
  color: string = "white";
  img: string = "";
  count: number = 30;
  min_speed: number = 2;
  max_speed: number = 10;
  min_wind: number = 0;
  max_wind: number = 1;
  min_size: number = 20;
  max_size: number = 60;
  fps: number = 40;
  reset: boolean = true;

  // Edges of the screen
  readonly xMax: number = document.documentElement.clientWidth-50;
	readonly yMax: number = Math.max( document.body.scrollHeight, 
                                    document.body.offsetHeight, 
                                    document.documentElement.clientHeight, 
                                    document.documentElement.scrollHeight, 
                                    document.documentElement.offsetHeight );

  // Max/min values can depend on current settings.
  // Min value can't be higher than current max setting value and max value can't be smaller than min value.
  readonly max_values = {
    count: () => 1000,
    min_speed: () => this.max_speed,
    max_speed: () => 1000,
    min_wind: () => this.max_wind,
    max_wind: () => 1000,
    min_size: () => this.max_size,
    max_size: () => 1000
  }
  readonly min_values = {
    count: () => 1,
    min_speed: () => 0,
    max_speed: () => this.min_speed,
    min_wind: () => 0,
    max_wind: () => this.min_wind,
    min_size: () => 0,
    max_size: () => this.min_size
  }
}