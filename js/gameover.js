var gameover = function(game){}


gameover.prototype = {
    create : function(){
        this.stage.backgroundColor = '#69F0AE';
        
        textoGameOver = this.game.add.text(550, 240, 'GAME OVER!',
                                    {fontSize: '60px',
                                    fill: '#000',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'center'
                                   }
                          );
        textoGameOver.anchor.set(0.5);
        
        textoGameOverVoltarAoJogo = this.game.add.text(550, 340, 'Prima ESPAÇO para tentar novamente',
                                    {fontSize: '40px',
                                    fill: '#000',
                                    boundsAlignH: 'top',
                                    boundsAlignV: 'top',
                                    align: 'center'
                                   }
                          );
        textoGameOverVoltarAoJogo.anchor.set(0.5);
        botaoRestart = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    },
    
    update : function(){
        if(botaoRestart.isDown){
            this.game.state.start('nivel1');
        }
    }
    
}