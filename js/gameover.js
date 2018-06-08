var gameover = function(game){}

WebFontConfig = {

    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    google: {
      families: ['Press Start 2P']
    }

};

gameover.prototype = {
    create : function(){
        this.stage.backgroundColor = '#263238';
        /*
        textoGameOver = this.game.add.text(550, 240, 'GAME OVER!',
                                    {fontSize: '60px',
                                    fill: '#000',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'center'
                                   }
                          );
        textoGameOver.anchor.set(0.5);
        */
        textoGameOver = this.game.add.sprite(550, 300, 'gameover');
        
        textoGameOver.anchor.set(0.5);

        textoPontos = this.game.add.text(550, 450, 'Pontos: ' + window.pontos,
                                    {fontSize: '40px',
                                    fill: '#ef5350',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'center'
                                   }
                          );
        textoPontos.anchor.set(0.5);
        textoPontos.font = 'Press Start 2P';

        botaoRestart = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    },
    
    update : function(){
        if(botaoRestart.isDown){
            this.game.state.start('menu');
        }
    }
    
}