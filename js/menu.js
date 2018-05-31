
var menu = function(game){}
    
    
menu.prototype = {

    create : function(){

        this.stage.backgroundColor = '#69F0AE';
        var btnPlay = this.game.add.button(550, 300, "play", 
                                            this.iniciaJogo, this
                                          );
        btnPlay.anchor.setTo(0.5);
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel1");
        
    }

}