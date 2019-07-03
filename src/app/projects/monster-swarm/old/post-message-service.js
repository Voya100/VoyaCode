/* eslint no-unused-vars: "off" */
class PostMessageService{
  constructor(){
    // Hiscores implemented by group g-10 supports custom hiscore categories as a bonus feature
    // This setting is used to check that the web service supports custom categories
    // so that it also works with services that don't provide this feature
    // This value will be set to true when game state is loaded, if supported.
    this.acceptsCustomHiscores = false;
  }

  sendMessage(message){
    // TODO: Implement this for Voya Code implementation
  }

  sendSettings(options){
    const message = {
      messageType: 'SETTING',
      options
    };
    this.sendMessage(message);
  }

  sendScore(score, category){
    // Send scores that don't belong to the default "Score" category only
    // if custom hiscore categories are supported by service
    if(category !== 'Score' && !this.acceptsCustomHiscores){
      return;
    }
    const message = {
      messageType: 'SCORE',
      category,
      score
    };
    this.sendMessage(message);
  }

  save(data){
    const message = {
      messageType: 'SAVE',
      gameState: data
    };
    this.sendMessage(message);
  }

  loadState(){
    const message = {
      messageType: 'LOAD_REQUEST'
    };
    this.sendMessage(message);
  }
}
