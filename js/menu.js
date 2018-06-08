
var menu = function(game){}
 

WebFontConfig = {

    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    google: {
      families: ['Press Start 2P']
    }

};    

menu.prototype = {

    create : function(){

        window.pontos = 0;
        window.vidas = 3;
        this.stage.backgroundColor = '#69F0AE';
        logo = this.game.add.sprite(530, 200, "home_logo");
        logo.anchor.setTo(0.5);
        var btnPlay = this.game.add.button(550, 550, "play", 
                                            this.iniciaJogo, this
                                          );
        btnPlay.anchor.setTo(0.5);
        var textoCreditos = this.game.add.text(900, 570, 'Pedro Rodrigues Nº18472', 
                                   {fontSize: '12px',
                                    fill: '#00695b',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'left'
                                   }
                               );
        textoCreditos.font = 'Press Start 2P';

        textoCreditos.anchor.setTo(0.5);
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("nivel1");
        
        
    }

}