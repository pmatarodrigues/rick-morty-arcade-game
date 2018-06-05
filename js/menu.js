
var menu = function(game){}
    
    
menu.prototype = {

    create : function(){

        this.stage.backgroundColor = '#69F0AE';
        logo = this.game.add.sprite(530, 200, "home_logo");
        logo.anchor.setTo(0.5);
        var btnPlay = this.game.add.button(550, 450, "play", 
                                            this.iniciaJogo, this
                                          );
        btnPlay.anchor.setTo(0.5);
        var textoCreditos = this.game.add.text(950, 570, 'Pedro Rodrigues Nº18472', 
                                   {fontSize: '15px',
                                    fill: '#00695b',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'left'
                                   }
                               );
        
        textoCreditos.anchor.setTo(0.5);
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel1");
        
        
    }

}