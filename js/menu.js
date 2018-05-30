
var menu = function(game){}
    
    
menu.prototype = {

    create : function(){

        var btnPlay = this.game.add.button(500, 300, "play", 
                                            this.iniciaJogo, this
                                          );
        btnPlay.anchor.setTo(1, 1);
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel1");
        
    }

}