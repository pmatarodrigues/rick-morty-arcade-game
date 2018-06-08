var vitoria = function(game){}

WebFontConfig = {

    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    google: {
      families: ['Press Start 2P']
    }
}; 

vitoria.prototype = {
    create : function(){
        this.stage.backgroundColor = '#263238';
        /*
        textoGameOver = this.game.add.text(550, 240, 'VITORIA',
                                    {fontSize: '60px',
                                    fill: '#000',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'center'
                                   }
                          );
        textoGameOver.anchor.set(0.5);
        
        textoGameOverVoltarAoJogo = this.game.add.text(550, 340, 'Prima ESPAÇO para voltar ao menu',
                                    {fontSize: '40px',
                                    fill: '#000',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'center'
                                   }
                          );
        textoGameOverVoltarAoJogo.anchor.set(0.5);
        */
        
        textoVitoria = this.game.add.sprite(550, 300, 'vitoria');
        
        textoVitoria.anchor.set(0.5);
        
        textoPontos = this.game.add.text(550, 450, 'Pontos: ' + window.pontos,
                                    {fontSize: '40px',
                                    fill: '#30d85c',
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